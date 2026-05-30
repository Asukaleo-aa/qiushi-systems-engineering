# 安装 qiushi-systems-engineering

> 实事求是 + 钱学森系统工程 → 7 环认知闭环 Skill 体系
>
> 支持平台：Claude Code · Cursor · OpenCode · Codex · OpenHanako · Reasonix

## 快速安装

```bash
git clone https://github.com/Asukaleo-aa/qiushi-systems-engineering
cd qiushi-systems-engineering
```

然后按以下平台选择安装方式。

---

## Claude Code

```bash
cd qiushi-systems-engineering
claude plugin add .
```

安装后每次新会话启动，`arming-thought` 通过 SessionStart hook 自动注入，建立「实事求是」总原则和认知环路由。

28 个 slash command 可通过 `/arming-thought`、`/contradiction-analysis` 等显式调用。

详细配置见 [.claude-plugin/plugin.json](.claude-plugin/plugin.json)。

---

## Cursor

1. 克隆仓库到本地
2. 将项目目录加入 Cursor 的插件路径
3. `arming-thought` 在每次会话启动时通过 SessionStart hook 自动注入

详细配置见 [.cursor-plugin/plugin.json](.cursor-plugin/plugin.json)。

---

## OpenCode

1. 克隆仓库到本地
2. 在 OpenCode 设置中，将仓库路径注册为 skill 源目录
3. OpenCode 自动索引所有 `SKILL.md` 的 frontmatter

详见 [.opencode/INSTALL.md](.opencode/INSTALL.md)。

---

## Codex

在 Codex 对话中执行：

```text
请帮我在 Codex 中注册 qiushi-systems-engineering 的全部 28 个 skill：
使用 install_skill 工具，将仓库根目录下每个子目录中的 SKILL.md 注册为项目级 skill。
```

详见 [.codex/INSTALL.md](.codex/INSTALL.md)。

---

## OpenHanako

```bash
cd qiushi-systems-engineering
bash .openhanako/install.sh
```

重启 OpenHanako 或开始新对话后，`arming-thought` 在每次顶层对话启动时自动加载。

详见 [.openhanako/INSTALL.md](.openhanako/INSTALL.md)。

---

## Reasonix

### 自动安装

```powershell
cd qiushi-systems-engineering
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .reasonix/setup.ps1
```

### 手动安装

将 `skills/` 目录下的每个子目录复制到 `.reasonix/skills/`，或在 Reasonix 对话中：

```text
请帮我安装 qiushi-systems-engineering 的所有 28 个 skill：
使用 install_skill 工具将每个 skill 注册到当前项目。
```

详见 [REASONIX.md](REASONIX.md)。

---

## 手动 / 其他平台

本项目的核心是 28 个 `SKILL.md` 文件和 `commands/` 目录下的命令入口。任何支持 system prompt 注入或 skill 加载的 AI 工具都可以使用：

1. 将 `arming-thought/SKILL.md` 作为 system prompt 注入
2. 将各 skill 的 `SKILL.md` 作为按需加载的参考文档
3. 如果支持 Markdown commands，加载 `commands/` 目录

---

## 28 Skill 速查

| 认知环节 | Skill | 一句话 |
|---------|-------|--------|
| 元能力 | `arming-thought` | 实事求是总原则 + 认知环路由器 |
| 感知 | `investigation-first` | 先调查再发言 |
| 感知 | `state-estimation` | 从噪声推断隐藏状态 |
| 感知 | `mass-line` | 收集→集中→返回→检验 |
| 理解 | `contradiction-analysis` | 识别矛盾→判定主次→主攻方向 |
| 理解 | `first-principles-analysis` | 剥离假设到不可再分 |
| 理解 | `historical-evolution-analysis` | 追溯因果链理解现状 |
| 建模 | `systems-thinking-framework` | 六步建立系统世界观 |
| 建模 | `system-boundary-structuring` | 层次分解+接口契约 |
| 建模 | `quantitative-modeling-workflow` | 定性→定量建模 |
| 建模 | `meta-synthesis-engine` | 综合集成统一判断 |
| 求解 | `constrained-optimization` | 约束下最优决策 |
| 求解 | `hierarchical-decomposition-coordination` | 分解自治+协调层 |
| 求解 | `duality-complementarity-analysis` | 对偶求解 |
| 求解 | `perturbation-progressive-method` | 渐进逼近 |
| 求解 | `multi-representation-equivalence-transform` | 表示等价切换 |
| 执行 | `engineering-orchestration` | WBS+关键路径+质量门 |
| 执行 | `concentrate-forces` | 集中优势兵力 |
| 执行 | `spark-prairie-fire` | 最小可行切入点 |
| 执行 | `protracted-strategy` | 防御→相持→反攻 |
| 执行 | `overall-planning` | 多目标动态平衡 |
| 校验 | `practice-cognition` | 实践→认识→再实践 |
| 校验 | `simulation-validation-cycle` | 多场景仿真验证 |
| 校验 | `feedback-and-revision-loop` | 偏差量化→根因→修正 |
| 修正 | `criticism-self-criticism` | 结构化工作审视 |
| 修正 | `adaptive-robust-strategy` | 自寻优+自适应 |
| 元能力 | `workflows` | 三条标准化跨环工作流 |

---

## 平台能力对比

| 功能 | Claude Code | Cursor | OpenCode | Codex | OpenHanako | Reasonix |
|------|:--:|:--:|:--:|:--:|:--:|:--:|
| SessionStart 自动注入 | ✅ | ✅ | ✅ | — | ✅ | — |
| 28 个 slash commands | ✅ | ✅ | ✅ | — | ✅ | — |
| 技能自动触发匹配 | ✅ | — | ✅ | ✅ | ✅ | ✅ |
| 认知环深度路由 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 双通道门控（假稳态检测） | ✅* | ✅* | ✅* | ✅* | ✅* | ✅* |
| 形式化 FSM 工具 | 📎 | 📎 | 📎 | 📎 | 📎 | 📎 |

> ✅* — 通过 skill 方法论约束实现，非平台原生功能
> 📎 — 通过 `qiushi-formalization` 独立仓库提供

---

## 安装验证

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

或手动检查：

```bash
ls */SKILL.md | wc -l    # 应输出 28
ls commands/*.md | wc -l  # 应输出 28
```

---

## 形式化层

本仓库的方法论结构已被形式化为控制论数学等价物。详见 [formalization.md](formalization.md) 和独立仓库 [qiushi-formalization](https://github.com/Asukaleo-aa/qiushi-formalization)。
