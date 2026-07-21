import { tool } from "@kilocode/plugin";

/**
 * 认知环 FSM — 阈值常量
 *
 * γ₁ = 5%  (微调下界, 稳态与微调的分界)
 * γ₂ = 20% (大幅修正触发阈值, 结构级修正)
 *
 * 来源: qiushi-formalization/fsm-prototype/fsm_core.py
 *       feedback-and-revision-loop 偏差程度分级
 */
const GAMMA_1 = 5.0;
const GAMMA_2 = 20.0;
const GAMMA_STEADY = GAMMA_1 / 3.0; // ≈ 1.67%

/**
 * 探索率-状态一致性区间
 *
 * S₀ 大幅修正: [0.3, 1.0] — 探索为主
 * S₁ 在线微调: [0.3, 0.7] — 混合
 * S₂ 稳态:     [0.0, 0.3] — 利用为主
 */
const EXPLORE_RANGES: Record<string, [number, number]> = {
  S0: [0.3, 1.0],
  S1: [0.3, 0.7],
  S2: [0.0, 0.3],
};

export default tool({
  description:
    "检查认知环的 FSM 状态（三态：S₀ 大幅修正 / S₁ 在线微调 / S₂ 稳态），" +
    "执行双通道门控假稳态检测。基于 PractiveCognitionFSM._step_from_s0/_s1/_s2 方法。",

  args: {
    residual: tool.schema
      .number()
      .describe("当前残差百分比 (0-100)，对应观测向量 r2/r3 最大偏差"),
    coordinateAnchored: tool.schema
      .boolean()
      .describe("坐标系是否已锚定（c1>0 ∧ c3=True）"),
    contradictionIdentified: tool.schema
      .boolean()
      .describe("主要矛盾是否已识别（c2>0）"),
    explorationRate: tool.schema
      .number()
      .optional()
      .describe("探索率 k ∈ [0,1]，用于一致性校验"),
  },

  async execute(args) {
    const { residual, coordinateAnchored, contradictionIdentified, explorationRate } =
      args;

    // ── FSM 状态判定 ──────────────────────────────────
    let state: string;
    let stateLabel: string;
    let rationale: string;

    if (!coordinateAnchored) {
      state = "S0";
      stateLabel = "大幅修正态";
      rationale = "坐标系未锚定，元认知通道不通过，无法退出 S₀";
    } else if (residual > GAMMA_2) {
      state = "S0";
      stateLabel = "大幅修正态";
      rationale = `残差 ${residual.toFixed(1)}% > γ₂=${GAMMA_2}%，触发结构级大幅修正`;
    } else if (!contradictionIdentified) {
      state = "S0";
      stateLabel = "大幅修正态";
      rationale =
        "主要矛盾未识别，双通道门控元认知通道不通过，仍处于 S₀";
    } else if (residual <= GAMMA_1) {
      state = "S2";
      stateLabel = "稳态";
      rationale = `残差 ${residual.toFixed(1)}% ≤ γ₁=${GAMMA_1}%，坐标系锚定且矛盾已识别，进入稳态运行`;
    } else {
      // γ₁ < residual ≤ γ₂, anchored, contradiction identified
      state = "S1";
      stateLabel = "在线微调态";
      rationale = `残差 ${residual.toFixed(1)}% 在 (${GAMMA_1}%, ${GAMMA_2}%] 区间，在线参数微调中`;
    }

    // ── 双通道门控 ────────────────────────────────────
    const obsPass = residual <= GAMMA_2;
    const obsDetail = obsPass
      ? `残差 ${residual.toFixed(1)}% ≤ γ₂=${GAMMA_2}%，观测器通道通过`
      : `残差 ${residual.toFixed(1)}% > γ₂=${GAMMA_2}%，观测器通道不通过`;

    const metaPass = coordinateAnchored && contradictionIdentified;
    const metaDetail = (() => {
      if (metaPass) return "坐标系已锚定且主要矛盾已识别，元认知通道通过";
      if (!coordinateAnchored) return "坐标系未锚定，元认知通道不通过";
      return "主要矛盾未识别，元认知通道不通过";
    })();

    const dualGatePass = obsPass && metaPass;

    // ── 假稳态风险检测 ────────────────────────────────
    let falseSteadyRisk: string | null = null;
    if (obsPass && !metaPass) {
      falseSteadyRisk = [
        `假稳态风险：残差已收敛 (${residual.toFixed(1)}%) 但元认知通道未就绪`,
        !coordinateAnchored
          ? `坐标系未锚定 — 调用 systems-thinking-framework 第零步重选层次`
          : `主要矛盾未识别 — 调用 contradictions-analysis 识别主要矛盾`,
      ].join("；");
    }

    // ── 探索率一致性校验 ──────────────────────────────
    let rateConsistency: string | null = null;
    if (explorationRate !== undefined) {
      const [lo, hi] = EXPLORE_RANGES[state];
      if (explorationRate < lo || explorationRate > hi) {
        rateConsistency = [
          `速率-状态失配: k=${explorationRate.toFixed(2)}`,
          `不在 ${stateLabel} 预期区间 [${lo.toFixed(1)}, ${hi.toFixed(1)}]`,
        ].join(" ");
      }
    }

    return JSON.stringify(
      {
        fsmState: state,
        fsmStateLabel: stateLabel,
        rationale,

        dualChannelGate: {
          passed: dualGatePass,
          observationChannel: { passed: obsPass, detail: obsDetail },
          metaChannel: { passed: metaPass, detail: metaDetail },
        },

        falseSteadyRisk,
        rateConsistency,
      },
      null,
      2
    );
  },
});
