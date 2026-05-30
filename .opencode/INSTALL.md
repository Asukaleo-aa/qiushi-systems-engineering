# 在 OpenCode 中使用 qiushi-systems-engineering

## 安装

```bash
git clone https://github.com/Asukaleo-aa/qiushi-systems-engineering
cd qiushi-systems-engineering
```

然后在 OpenCode 中注册 skill 源目录为当前仓库路径。OpenCode 会自动索引所有 `SKILL.md` 的 frontmatter。

## 使用

### 自动加载（SessionStart）

`arming-thought` skill 的 description 中包含触发条件——每次新顶层对话开始时自动加载，建立「实事求是」总原则和认知环路由器。

**子 agent 跳过**：被派遣执行单一具体任务的子 agent 自动跳过 `arming-thought`——避免在每个子任务上展开完整认知环。

### 显式调用

支持通过 OpenCode 的 skill 路由机制按需匹配，也可通过命令显式调用：

```
/arming-thought          → 认知环路由器
/contradiction-analysis  → 矛盾分析
/first-principles-analysis → 第一性原理分析
/constrained-optimization  → 约束优化
```

完整命令列表见 `commands/` 目录（28 个）。

### 认知环深度路由

```
任务复杂度         → 路由行为
────────────────────────────────────
简单问答、单步操作  → 深度 0，不武装，直接行动
信息不足但决策简单  → 深度 1，仅走感知环
需分析本质不需建模  → 深度 2，感知→理解→执行
有技术深度需建模    → 深度 3，全七环展开
高度不确定多轮迭代  → 深度 4，全环 × 多轮
```

### 28 Skill 速查

| 调用名 | 认知环节 | 一句话 |
|--------|---------|--------|
| `arming-thought` | 元能力 | 实事求是总原则 + 认知环路由器 |
| `investigation-first` | 感知 | 先调查再发言（哲学+工程双模式） |
| `state-estimation` | 感知 | 从噪声数据推断隐藏状态 |
| `mass-line` | 感知 | 收集→集中→返回→检验 |
| `contradiction-analysis` | 理解 | 识别矛盾→判定主次→主攻方向 |
| `first-principles-analysis` | 理解 | 剥离假设到不可再分 |
| `historical-evolution-analysis` | 理解 | 追溯因果链理解现状 |
| `systems-thinking-framework` | 建模 | 六步建立系统世界观 |
| `system-boundary-structuring` | 建模 | 层次分解+接口契约 |
| `quantitative-modeling-workflow` | 建模 | 定性→定量建模 |
| `meta-synthesis-engine` | 建模 | 综合集成统一判断 |
| `constrained-optimization` | 求解 | 约束下最优决策 |
| `hierarchical-decomposition-coordination` | 求解 | 分解自治+协调层 |
| `duality-complementarity-analysis` | 求解 | 对偶求解 |
| `perturbation-progressive-method` | 求解 | 渐进逼近 |
| `multi-representation-equivalence-transform` | 求解 | 表示等价切换 |
| `engineering-orchestration` | 执行 | WBS+关键路径+质量门 |
| `concentrate-forces` | 执行 | 集中优势兵力 |
| `spark-prairie-fire` | 执行 | 最小可行切入点 |
| `protracted-strategy` | 执行 | 防御→相持→反攻 |
| `overall-planning` | 执行 | 多目标动态平衡 |
| `practice-cognition` | 校验 | 实践→认识→再实践 |
| `simulation-validation-cycle` | 校验 | 多场景仿真验证 |
| `feedback-and-revision-loop` | 校验 | 偏差量化→根因→修正 |
| `criticism-self-criticism` | 修正 | 结构化工作审视 |
| `adaptive-robust-strategy` | 修正 | 自寻优+自适应 |
| `workflows` | 元能力 | 三条标准化跨环工作流 |

## 操作边界标注

以下 5 个涉及数学演算的 skill 包含 `⚠️ 操作边界` 标注，区分定性推理和写代码求解：

- `constrained-optimization`
- `state-estimation`
- `perturbation-progressive-method`
- `multi-representation-equivalence-transform`
- `duality-complementarity-analysis`

## 验证

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```
