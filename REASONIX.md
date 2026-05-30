# 在 Reasonix 中使用 qiushi-systems-engineering

> 实事求是 + 钱学森系统工程 → Reasonix 七环认知闭环

## 快速安装

### 方式一：自动安装（推荐）

```powershell
# 在项目根目录下运行
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .reasonix/setup.ps1
```

该脚本会将全部 27 个 skill 注册到 Reasonix 的项目 skill 目录（`.reasonix/skills/`）。

安装后重启 Reasonix（`/new`），技能会出现在 skill 索引中。

### 方式二：手动安装

将 `skills/` 目录下的每个子目录复制到 `.reasonix/skills/`：

```powershell
# Windows PowerShell
$src = ".\arming-thought"
$dst = ".\.reasonix\skills\arming-thought"
Copy-Item -Recurse -Force $src $dst
# ... 重复 26 次
```

或让 Reasonix 帮你安装——粘贴以下内容到对话中：

```text
请帮我安装 qiushi-systems-engineering 的所有 27 个 skill：

1. 读取每个 skill 目录下的 SKILL.md（arming-thought/、contradiction-analysis/、… 共 27 个）
2. 用 install_skill 工具将每个 skill 注册到当前项目（scope: project）
3. 安装完成后告诉我结果
```

---

## 使用方式

### 自动加载

Reasonix 会在启动时扫描 `.reasonix/skills/` 目录并索引所有 skill。`arming-thought`（武装思想）skill 的描述中包含触发条件——当 Reasonix 判断适用时会自动加载。

### 显式调用

```
/skill contradiction-analysis
/skill first-principles-analysis
/skill constrained-optimization
```

或使用 `commands/` 下的命令入口（如果 Reasonix 支持 Markdown slash commands）。

### 认知环路由

`arming-thought` skill 提供两级路由：

| 任务复杂度 | 路由行为 |
|-----------|---------|
| 简单问答、单步操作 | 轻量路由：关键词匹配，最多 1 个 skill |
| 复杂/系统/建模/优化 | 深度路由：全七环认知闭环展开 |

---

## 文件结构

```
qiushi-systems-engineering/
├── .reasonix/
│   ├── skills/          # ← Reasonix 从这里加载 skill
│   ├── setup.ps1        #    自动安装脚本
│   └── INSTALL.md
├── arming-thought/SKILL.md
├── contradiction-analysis/SKILL.md
├── ... (23 more skill dirs) ...
├── REASONIX.md          # ← 这个文件
├── commands/            #    手动命令入口
├── hooks/               #    Claude Code 用（Reasonix 不需要）
└── tests/validate.ps1
```

---

## 27 个 Skill 速查（Reasonix 调用名）

| Reasonix 调用名 | 一句话 | 认知环节 |
|-----------------|--------|---------|
| `arming-thought` | 实事求是总原则 + 认知环路由器 | 元能力 |
| `investigation-first` | 先调查再发言（哲学+工程双模式） | 感知 |
| `state-estimation` | 从噪声数据推断隐藏状态 | 感知 |
| `mass-line` | 收集→集中→返回→检验 | 感知 |
| `contradiction-analysis` | 识别矛盾→判定主次→主攻方向 | 理解 |
| `first-principles-analysis` | 剥离假设到不可再分 | 理解 |
| `historical-evolution-analysis` | 追溯因果链理解现状 | 理解 |
| `systems-thinking-framework` | 六步建立系统世界观 | 建模 |
| `system-boundary-structuring` | 层次分解+接口契约 | 建模 |
| `quantitative-modeling-workflow` | 定性→定量建模 | 建模 |
| `meta-synthesis-engine` | 综合集成统一判断 | 建模 |
| `constrained-optimization` | 约束下最优决策 | 求解 |
| `hierarchical-decomposition-coordination` | 分解自治+协调层 | 求解 |
| `duality-complementarity-analysis` | 对偶求解 | 求解 |
| `perturbation-progressive-method` | 渐进逼近 | 求解 |
| `multi-representation-equivalence-transform` | 表示等价切换 | 求解 |
| `engineering-orchestration` | WBS+关键路径+质量门 | 执行 |
| `concentrate-forces` | 集中优势兵力 | 执行 |
| `spark-prairie-fire` | 最小可行切入点 | 执行 |
| `protracted-strategy` | 防御→相持→反攻 | 执行 |
| `overall-planning` | 多目标动态平衡 | 执行 |
| `practice-cognition` | 实践→认识→再实践 | 校验 |
| `simulation-validation-cycle` | 多场景仿真验证 | 校验 |
| `feedback-and-revision-loop` | 偏差量化→根因→修正 | 校验 |
| `criticism-self-criticism` | 结构化工作审视 | 修正 |
| `adaptive-robust-strategy` | 自寻优+自适应 | 修正 |
| `workflows` | 三条标准化跨环工作流 | 元能力 |

---

## 注意事项

1. **子 agent 跳过**：`arming-thought` 的 description 中注明了"被派遣执行单一具体任务的子 agent 跳过此 skill"——Reasonix subagent 技能会自动遵守
2. **操作边界**：5 个涉及数学演算的 skill（constrained-optimization / state-estimation / perturbation-progressive-method / multi-representation-equivalence-transform / duality-complementarity-analysis）包含 `⚠️ 操作边界` 标注，区分定性推理和写代码求解
3. **平台无关**：skill 内容与 Reasonix 解耦，同一套 skill 也支持 Claude Code、Cursor、Codex、OpenCode
