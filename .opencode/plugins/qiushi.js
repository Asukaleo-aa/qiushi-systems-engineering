/**
 * Qiushi Plugin for OpenCode / KiloCode
 *
 * 两个钩子：
 *   1. session.compacting — 压缩时保留认知环状态
 *   2. tool.execute.before — 写文件前提醒走校验环
 *
 * 认知环状态跨压缩持久化，使 qiushi 代理在长时间会话中保持方法论连续性。
 */

// 跨钩子的模块级状态
const qiushiState = {
  fsmState: "S₀",
  systemLevel: "未锚定",
  principalContradiction: null,
  cognitiveRingStage: "感知",
  initialized: false,
};

/** @param {{ client: any, project: any, directory: string, worktree: string }} ctx */
export const QiushiPlugin = async ({ client }) => {

  // 启动时记录
  if (client?.app?.log) {
    await client.app.log({
      body: { service: "qiushi", level: "info", message: "Qiushi 插件已加载 — 认知环状态追踪已激活" }
    });
  }

  return {

    // ── 钩子 1：压缩时保留认知状态 ──────────────────────
    "experimental.session.compacting": async (_input, output) => {
      const stateBlock = [
        "## Qiushi 认知环状态（压缩保留）",
        "",
        "以下状态必须在压缩后恢复，以保证方法论连续性：",
        "",
        `| 字段 | 值 |`,
        `|------|-----|`,
        `| FSM 状态 | ${qiushiState.fsmState}（S₀=大幅修正, S₁=在线微调, S₂=稳态） |`,
        `| 系统层次 | ${qiushiState.systemLevel} |`,
        `| 主要矛盾 | ${qiushiState.principalContradiction || "未标记"} |`,
        `| 认知环节 | ${qiushiState.cognitiveRingStage}（感知→理解→建模→求解→执行→校验→修正） |`,
        "",
        "压缩恢复后，从以上状态继续。如果 FSM 状态为 S₀，优先调用 systems-thinking-framework 重锚定坐标系。"
      ].join("\n");

      if (output && Array.isArray(output.context)) {
        output.context.push(stateBlock);
      }
    },

    // ── 钩子 2：写文件前提醒校验 ──────────────────────────
    "tool.execute.before": async (input, output) => {
      if (!["write", "edit"].includes(input.tool)) return;
      const content = output?.args?.content;
      const filePath = output?.args?.filePath || output?.args?.path || "";
      if (!content || content.length < 500) return;

      // 检测需要提醒的复杂输出
      const complexPatterns = /system|architecture|design|strategy|methodology|plugin|schema|pipeline|framework/i;
      if (complexPatterns.test(filePath) || complexPatterns.test(String(content).slice(0, 300))) {
        if (client?.app?.log) {
          await client.app.log({
            body: {
              service: "qiushi", level: "warn",
              message: `校验环提醒：正在写入复杂产出 ${filePath}（${content.length} 字节）——建议完成后调用 feedback-and-revision-loop 或 criticism-self-criticism`,
            }
          });
        }
      }
    },
  };
};
