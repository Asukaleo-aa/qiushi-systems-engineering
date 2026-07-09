import { tool } from "@opencode-ai/plugin";

/**
 * 门控参数标定表 — 来自 Scenario 6 标定结果。
 *
 * noiseLevel → (σ_amp, N*, σ_dir*, cost)
 *
 * low:   σ_amp=0.2 → N*=55,   σ_dir*=0.75, cost=0.000
 * mixed: σ_amp=0.3 → N*=160,  σ_dir*=0.65, cost=0.000
 * high:  σ_amp=0.4 → N*=200,  σ_dir*=0.60, cost=0.003
 */
const TABLE = {
  low: {
    sigma_amp: 0.2,
    N_star: 55,
    sigma_dir_star: 0.75,
    cost: 0.0,
  },
  mixed: {
    sigma_amp: 0.3,
    N_star: 160,
    sigma_dir_star: 0.65,
    cost: 0.0,
  },
  high: {
    sigma_amp: 0.4,
    N_star: 200,
    sigma_dir_star: 0.6,
    cost: 0.003,
  },
} as const;

const DESCRIPTIONS: Record<string, string> = {
  low: "σ_amp=0.2：低噪声环境，门控参数宽松，只需少量采样（N*=55）即可收敛",
  mixed:
    "σ_amp=0.3：混合噪声环境，需要中等采样量（N*=160），方向门限适中（σ_dir*=0.65）",
  high:
    "σ_amp=0.4：高噪声环境，需要最大采样量（N*=200），方向门限收紧（σ_dir*=0.60），存在少量代价（cost=0.003）",
};

export default tool({
  description:
    "根据噪声环境查询推荐的双通道门控参数（N*, σ_dir*, cost）。" +
    "数据来自 Scenario 6 标定结果。",

  args: {
    noiseLevel: tool.schema
      .enum(["low", "mixed", "high"])
      .describe("噪声等级：low | mixed | high"),
  },

  async execute(args) {
    const { noiseLevel } = args;
    const entry = TABLE[noiseLevel];

    return JSON.stringify(
      {
        noiseLevel,
        sigma_amp: entry.sigma_amp,
        recommended: {
          N_star: entry.N_star,
          sigma_dir_star: entry.sigma_dir_star,
          cost: entry.cost,
        },
        description: DESCRIPTIONS[noiseLevel],
      },
      null,
      2
    );
  },
});
