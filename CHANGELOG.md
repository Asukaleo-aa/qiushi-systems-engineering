# Changelog

All notable changes to qiushi-systems-engineering will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.2.2] — 2026-06-06

### Fixed
- plugin.json manifest schema 修正：`author` 字段从字符串改为 `{name, email}` 对象
- 移除不适用于当前 Claude Code 版本的 `hooks`/`commands`/`skills`/`permissions` 顶层字段
- `.cursor-plugin/plugin.json` 同步修正
- Capricornus 上 git config email 从 `@users.noreply.github.com` 改为已验证邮箱

### Added
- `.claude-plugin/marketplace.json`（Claude Code 市场清单）

---

## [3.2.1] — 2026-05-31

### Added
- 多平台完整部署：6 大平台适配层（Claude Code / Cursor / OpenCode / Codex / OpenHanako / Reasonix）
- `.claude-plugin/plugin.json` 完整声明 28 commands + SessionStart hook
- `.cursor-plugin/plugin.json` 完整声明 28 commands + SessionStart hook
- `.openhanako/` 专用安装脚本（`install.sh`）+ 集成文档
- `formalization.md` 形式化层引用文档，含 Scenario 6 标定结果
- 平台能力对比矩阵（`INSTALL.md`）

### Changed
- 增强 `.codex/INSTALL.md`、`.opencode/INSTALL.md`（28 skill 速查表 + 深度路由说明）
- 重写 `INSTALL.md` 为统一多平台安装指南
- 修正 `package.json` 仓库 URL
- 清除已合并的 `problem-domain-investigation` 遗留引用

### Linked
- qiushi-formalization Scenario 6 标定完成：三组 σ_amp 最优参数 + 交叉验证 + 热力图

---

## [3.2.0] — 2025-01

### Added
- 平台集成层：`.claude-plugin/plugin.json`、`.cursor-plugin/plugin.json`、hooks 系统（SessionStart 自动注入）
- 28 个 slash command 入口（`commands/` 目录）
- 安装验证脚本 `tests/validate.ps1`（frontmatter、交叉引用、hook、命令完整性检查）
- 安装入口文档：`INSTALL.md`、`.codex/INSTALL.md`、`.opencode/INSTALL.md`
- `package.json`（含 `npm run validate` 脚本）
- `arming-thought` 轻量路由（默认模式：关键词快速匹配，~55 行）替代全量深度路由
- 5 个 math-heavy skill 的 `⚠️ 操作边界` 标注（constrained-optimization / state-estimation / perturbation-progressive-method / multi-representation-equivalence-transform / duality-complementarity-analysis）

### Changed
- 目录结构扁平化：移除冗余的 `qiushi-systems-engineering/qiushi-systems-engineering/` 嵌套层
- `overview.html` 移至 `docs/` 目录
- **合并** `problem-domain-investigation` 入 `investigation-first`，提供哲学模式（默认）+ 工程扩展模式（结构化知识地图）
- 更新全部 10+ 处交叉引用，将 `problem-domain-investigation` 替换为 `investigation-first`（工程扩展模式）

### Fixed
- README 中 27 个 skill 的七环分布明确标注（感知 3 + 理解 3 + 建模 4 + 求解 5 + 执行 5 + 校验 3 + 修正 2 + 元能力 2）

---

## [3.1.0] — 2025

### Added
- 系统层次意识（物理/工程/产品/社会-技术四层）
- 网关判据、系统思维框架、第一性分析、边界结构、约束优化、综合集成、反馈修正的层次锚定与校验

---

## [3.0.0] — 2025

### Changed
- **重构为认知环架构**：以 agent 认知闭环（感知→理解→建模→求解→执行→校验→修正）替代来源分层
- 毛泽东哲学方法论与钱学森系统工程方法论按认知环节协同组织

---

## [2.1.0] — 2025

### Added
- 最优决策（constrained-optimization）
- 状态估计（state-estimation）
- 自适应策略（adaptive-robust-strategy）
- 总计 27 个技能

---

## [2.0.0] — 2025

### Added
- 钱学森系统工程方法论层（《工程控制论》《论系统工程》）
- 与毛泽东哲学方法形成双源协同
- 技能数从 11 扩展至 24

---

## [1.0.0] — 2025

### Added
- 初始版本：11 个 qiushi 技能，基于 [HughYau/qiushi-skill](https://github.com/HughYau/qiushi-skill)
- 毛泽东哲学方法论提炼为可操作的 AI Agent 技能体系
