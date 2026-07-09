/**
 * Qiushi Plugin for OpenCode (Layer 2)
 *
 * Injects qiushi-systems-engineering methodology (实事求是) into OpenCode sessions.
 * Three hooks:
 *   1. session.created  — inject core principles from arming-thought/SKILL.md
 *   2. experimental.session.compacting — preserve cognitive ring state across compaction
 *   3. tool.execute.before — remind validation loop before complex write/edit operations
 *
 * Relies only on Node.js 20+ built-in modules; no external deps.
 *
 * @see https://opencode.ai/docs/plugins/
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// ---------------------------------------------------------------------------
// Module-level state for the qiushi cognitive ring
// Persisted across hook invocations within the same Node process.
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SKILL_PATH = resolve(__dirname, "../../arming-thought/SKILL.md");

/** @type {{ fsmState: string, systemLevel: string, principalContradiction: string|null, cognitiveRingStage: string, initialized: boolean }} */
const qiushiState = {
  fsmState: "S\u2080",
  systemLevel: "physical",
  principalContradiction: null,
  cognitiveRingStage: "\u611F\u77E5",
  initialized: false,
};

// Cache for the arming-thought content (fresh copy per plugin load)
let armingContentCache = null;

/**
 * Read the first ~80 lines of SKILL.md, caching the result.
 * Returns empty string on error (plugin degrades gracefully).
 */
function readArmingContent() {
  if (armingContentCache !== null) return armingContentCache;
  try {
    const full = readFileSync(SKILL_PATH, "utf-8");
    const lines = full.split("\n");
    armingContentCache = lines.slice(0, 80).join("\n");
  } catch {
    armingContentCache = "";
  }
  return armingContentCache;
}

// ---------------------------------------------------------------------------
// Context-builder helpers  (produce the <QIUSHI_SE> XML block)
// ---------------------------------------------------------------------------

function buildSessionContext(arming) {
  return `<QIUSHI_SE>
实事求是总原则已自动注入。

${arming}

认知环状态跟踪（跨会话持久化）：
- FSM 状态：${qiushiState.fsmState}（S₀ 感知/调查 · S₁ 建模/分析 · S₂ 执行/校验）
- 系统层次：${qiushiState.systemLevel}（physical → engineering → product → socio-technical）
- 主要矛盾：${qiushiState.principalContradiction || "尚未标记"}
- 认知环节：${qiushiState.cognitiveRingStage}（感知 → 理解 → 建模 → 求解 → 执行 → 校验 → 修正）
</QIUSHI_SE>`;
}

function buildCompactionState() {
  return `## Qiushi Cognitive Ring State (Persistent)

Preserve this state across compaction to maintain cognitive continuity.

| Field | Value |
|-------|-------|
| FSM State | ${qiushiState.fsmState} |
| System Level | ${qiushiState.systemLevel} |
| Principal Contradiction | ${qiushiState.principalContradiction || "not identified"} |
| Cognitive Ring Stage | ${qiushiState.cognitiveRingStage} |
| Initialization Status | ${qiushiState.initialized ? "initialized" : "pending"} |

### State Transition Rules
- **FSM transitions**: S₀ (Perceive/Investigate) → S₁ (Model/Analyze) → S₂ (Execute/Verify) → S₀ (feedback loop)
- **System hierarchy** (increasing complexity): physical → engineering → product → socio-technical
- **Cognitive ring progression**: 感知 → 理解 → 建模 → 求解 → 执行 → 校验 → 修正
- **Contradiction**: set by contradiction-analysis skill; drives FSM transitions

When resuming after compaction, restore these values into the agent's working memory
so subsequent cognitive-ring operations continue from the correct state.`;
}

// ---------------------------------------------------------------------------
// Heuristic: is this write/edit a "complex task output"?
// ---------------------------------------------------------------------------

/**
 * @param {string} filePath
 * @param {string} content
 * @returns {boolean}
 */
function isComplexOutput(filePath, content) {
  if (!content || content.length < 1) return false;

  // Long content heuristic
  if (content.length > 800) return true;

  // Suspicious file paths (system / architecture / strategy files)
  const criticalPatterns =
    /system|architecture|design|strategy|methodology|workflow|framework|plugin|hook|schema|pipeline/i;
  if (criticalPatterns.test(filePath)) return true;

  // Content signals — first 400 chars mention design/architecture/system
  const contentSignals =
    /(?:complex|system|architecture|design|methodology|interface|protocol|coordinate|decompose|emerge|self-adj|adaptive|feedback|loop|iteration|cycle)/i;
  if (contentSignals.test(content.slice(0, 400))) return true;

  return false;
}

// ===========================================================================
// Plugin export
// ===========================================================================

/**
 * @param {{ project: unknown, client: import("@opencode-ai/plugin").Client, $: import("bun").Shell, directory: string, worktree: string }} ctx
 * @returns {Promise<Record<string, Function>>}
 */
export const QiushiPlugin = async ({ client }) => {
  // ---- warm up (read & cache SKILL.md at init time) ----
  const arming = readArmingContent();
  if (!arming) {
    await client.app.log({
      body: {
        service: "qiushi",
        level: "error",
        message: `Cannot read SKILL.md at ${SKILL_PATH} — plugin running without arming-thought content`,
      },
    });
  }

  // ---- inform operator about load ----
  await client.app.log({
    body: {
      service: "qiushi",
      level: "info",
      message: `Qiushi plugin loaded (Layer 2) | state: ${qiushiState.fsmState}/${qiushiState.systemLevel}/${qiushiState.cognitiveRingStage}`,
    },
  });

  // ======================================================================
  return {
    // --------------------------------------------------------------------
    // 1. session.created — inject methodology on new session
    // --------------------------------------------------------------------
    "session.created": async (_input, output) => {
      qiushiState.initialized = true;

      await client.app.log({
        body: {
          service: "qiushi",
          level: "info",
          message:
            "\u2699\uFE0F Qiushi methodology injected into session created",
          extra: {
            fsmState: qiushiState.fsmState,
            systemLevel: qiushiState.systemLevel,
            cognitiveRingStage: qiushiState.cognitiveRingStage,
          },
        },
      });

      // Attempt to inject qiushi context into the session message.
      // OpenCode's session.created output shape is best-effort here;
      // we try multiple plausible keys to maximise compatibility.
      const ctxBlock = buildSessionContext(arming);
      if (output && typeof output === "object") {
        try {
          if (Array.isArray(output.context)) {
            output.context.push({ role: "system", content: ctxBlock });
          } else if (Array.isArray(output.messages)) {
            output.messages.unshift({ role: "system", content: ctxBlock });
          } else if (output.prompt !== undefined) {
            // Some providers pass a prompt string — prepend context
            output.prompt = `${ctxBlock}\n\n${output.prompt}`;
          }
        } catch {
          // non-fatal: injection is best-effort
        }
      }
    },

    // --------------------------------------------------------------------
    // 2. experimental.session.compacting — preserve cognitive ring state
    // --------------------------------------------------------------------
    "experimental.session.compacting": async (_input, output) => {
      const stateBlock = buildCompactionState();
      if (output && Array.isArray(output.context)) {
        output.context.push(stateBlock);
        await client.app.log({
          body: {
            service: "qiushi",
            level: "info",
            message: "Qiushi cognitive ring state preserved during compaction",
            extra: { ...qiushiState },
          },
        });
      }
    },

    // --------------------------------------------------------------------
    // 3. tool.execute.before — remind validation loop before complex writes
    // --------------------------------------------------------------------
    "tool.execute.before": async (input, output) => {
      const writeTools = ["write", "edit"];
      if (!writeTools.includes(input.tool)) return;
      if (!output || !output.args || !output.args.content) return;

      const filePath = output.args.filePath || output.args.path || "(unknown)";
      const content = output.args.content;

      if (!isComplexOutput(filePath, content)) return;

      await client.app.log({
        body: {
          service: "qiushi",
          level: "warn",
          message: `\uD83D\uDD04 Validation loop recommended for ${input.tool} → ${filePath}`,
          extra: {
            tool: input.tool,
            filePath,
            sizeBytes: content.length,
            recommendation:
              "Complex output detected. Consider running through criticism-self-criticism or simulation-validation-cycle before finalizing. See qiushi feedback-and-revision-loop skill for structured validation.",
          },
        },
      });
    },
  };
};
