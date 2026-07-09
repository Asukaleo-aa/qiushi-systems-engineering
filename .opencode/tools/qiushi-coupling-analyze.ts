import { tool } from "@opencode-ai/plugin";

/**
 * 幂迭代法 — 计算矩阵的主导特征值和特征向量。
 *
 * 对小型矩阵（n ≤ 20）有效，满足耦合矩阵谱分析需求。
 * 主要矛盾 ≈ 主导特征值对应的子系统对。
 */
function dominantEigenvalue(
  matrix: number[][]
): { eigenvalue: number; eigenvector: number[] } {
  const n = matrix.length;
  if (n === 0) return { eigenvalue: 0, eigenvector: [] };

  // 随机初始向量
  let v = Array.from({ length: n }, () => Math.random() * 2 - 1);

  for (let iter = 0; iter < 200; iter++) {
    const w = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        w[i] += matrix[i][j] * v[j];
      }
    }

    const norm = Math.sqrt(w.reduce((s, x) => s + x * x, 0));
    if (norm < 1e-12) break;
    v = w.map((x) => x / norm);
  }

  // Rayleigh 商
  const Av = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      Av[i] += matrix[i][j] * v[j];
    }
  }
  const eigenvalue = v.reduce((s, xi, i) => s + xi * Av[i], 0);

  return { eigenvalue, eigenvector: v };
}

/**
 * 从子系统名称推断耦合矩阵的启发式构造。
 *
 * 规则：
 * - 相邻子系统耦合 0.6
 * - 非相邻子系统耦合 0.2
 * - 对角为 0
 */
function defaultCouplingMatrix(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 0;
      return Math.abs(i - j) === 1 ? 0.6 : 0.2;
    })
  );
}

export default tool({
  description:
    "从子系统描述构造耦合矩阵，计算谱结构并分析主要矛盾。返回主导特征值、" +
    "矛盾子系统对、矛盾性质（对抗性/非对抗性）及协调策略。",

  args: {
    subsystems: tool.schema
      .array(tool.schema.string())
      .describe("子系统名称列表，至少 2 个"),
    couplings: tool.schema
      .union([
        tool.schema.array(tool.schema.array(tool.schema.number())),
        tool.schema.string(),
      ])
      .describe("N×N 耦合矩阵，或 'auto' 从子系统数量自动推断"),
  },

  async execute(args) {
    const { subsystems, couplings } = args;
    const n = subsystems.length;

    if (n < 2) {
      return JSON.stringify({ error: "子系统至少需要两个" });
    }

    // ── 耦合矩阵解析 ──────────────────────────────────
    let matrix: number[][];
    if (couplings === "auto") {
      matrix = defaultCouplingMatrix(n);
    } else if (
      Array.isArray(couplings) &&
      couplings.length === n &&
      couplings.every((r) => Array.isArray(r) && r.length === n)
    ) {
      matrix = couplings;
    } else {
      return JSON.stringify({
        error: `耦合矩阵必须是 ${n}×${n} 的数组，或使用 "auto"`,
      });
    }

    // ── 谱分析 ────────────────────────────────────────
    const { eigenvalue, eigenvector } = dominantEigenvalue(matrix);

    // 主导特征向量绝对值最大的两个分量 → 主要矛盾子系统对
    const absEvec = eigenvector.map(Math.abs);
    const sortedIdx = Array.from({ length: n }, (_, i) => i).sort(
      (a, b) => absEvec[b] - absEvec[a]
    );
    const dominantPair: [number, number] = [sortedIdx[0], sortedIdx[1]];

    // ── 矛盾性质判定 ──────────────────────────────────
    const λ = eigenvalue;
    const isAntagonistic = λ > 1.0;
    const nature = isAntagonistic ? "对抗性" : "非对抗性";

    const strength: string =
      λ > 1.5 ? "强耦合" : λ > 0.5 ? "中等耦合" : "弱耦合";

    const s0 = subsystems[dominantPair[0]];
    const s1 = subsystems[dominantPair[1]];

    const strategy = isAntagonistic
      ? [
          `子系统 "${s0}" 与 "${s1}" 间耦合过强（λ=${λ.toFixed(3)}），`,
          `属于对抗性矛盾，需要结构性调整：`,
          `重新分配资源边界或引入缓冲层解耦`,
        ].join("")
      : [
          `子系统 "${s0}" 与 "${s1}" 间耦合可控（λ=${λ.toFixed(3)}），`,
          `属于非对抗性矛盾，通过渐进式反馈协调优化即可解决`,
        ].join("");

    return JSON.stringify(
      {
        dominantEigenvalue: parseFloat(λ.toFixed(4)),
        dominantEigenvector: eigenvector.map((v) => parseFloat(v.toFixed(4))),
        dominantPair: {
          indices: dominantPair,
          subsystems: [s0, s1],
        },
        contradictionNature: nature,
        couplingStrength: strength,
        strategy,

        // 返回矩阵以便调试验证
        matrixUsed: matrix.map((row) =>
          row.map((v) => parseFloat(v.toFixed(4)))
        ),
      },
      null,
      2
    );
  },
});
