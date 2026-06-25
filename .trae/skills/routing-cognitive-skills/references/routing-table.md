# 路由表

## 关键词 → Skill 快速匹配

| 任务信号（关键词） | 应调 skill | 默认优先级 |
|-------------------|-----------|----------|
| 矛盾/冲突/trade-off/瓶颈/主次不清 | `contradiction-analysis` | 高 |
| 迭代/验证/实验/试错/反馈循环 | `practice-cognition` | 中 |
| 调查/摸清/不了解/信息不足 | `investigation-first` | 高 |
| 多方意见/反馈汇总/对齐/用户声音 | `mass-line` | 中 |
| 审视/复盘/改进/做得对吗 | `criticism-self-criticism` | 中 |
| 长期/阶段/持久/马拉松 | `protracted-strategy` | 中 |
| 聚焦/优先级/多任务冲突/集中 | `concentrate-forces` | 高 |
| 从零开始/资源有限/最小可行 | `spark-prairie-fire` | 高 |
| 多目标/平衡/各方/兼顾 | `overall-planning` | 中 |
| 本质/根基/第一性/重新理解 | `first-principles-analysis` | 高 |
| 系统/边界/整体/涌现/相互作用 | `systems-thinking-framework` | 高 |
| 最优/最大化/最小化/约束/取舍 | `constrained-optimization` | 中 |
| 噪声/残缺/推断/估计/隐藏状态 | `state-estimation` | 中 |
| 建模/量化/数学模型 | `quantitative-modeling-workflow` | 中 |
| 编排/工程计划/WBS/关键路径 | `engineering-orchestration` | 中 |
| 不确定/自适应/边做边调/漂移 | `adaptive-robust-strategy` | 中 |

> 如果以上关键词均不匹配或任务明显跨越 3+ 认知环节，跳到深度路由。

## 轻量路由（默认模式）

| 如果任务... | 则... |
|-----------|------|
| 简单问答、单步操作、事实查询 | → **深度 0**，直接回答，不展开任何认知环 |
| 信息不足但方向明确 | → 只调 `investigation-first`，调查完就走 |
| 复杂 / 系统 / 多个因素互相制约 | → 跳到深度路由 |
| 需要决策但选项已清晰 | → 调 `constrained-optimization` 或 `overall-planning` |
| 需要从零启动新项目 | → 调 `workflows`（新项目启动流） |
| 方案已完成需复盘改进 | → 调 `criticism-self-criticism` + `practice-cognition` |
| 长期任务需分阶段规划 | → 调 `protracted-strategy` |

## 优先原则

1. 一次只选 **1 个**主 skill；确有必要再串联第二个
2. 不为了「形式完整」而机械调用 skill
3. 用户明确指示 > 宿主平台规则 > 本体系

## 多 Skill 匹配时的默认路径

当 2-3 个 skill 同时匹配时，按以下规则选择默认路径：

| 匹配组合 | 默认选择 | 理由 |
|---------|---------|------|
| `investigation-first` + `contradiction-analysis` | 先 `investigation-first` | 先调查事实，再分析矛盾 |
| `contradiction-analysis` + `constrained-optimization` | 先 `contradiction-analysis` | 先明确主要矛盾，再优化 |
| `systems-thinking-framework` + `quantitative-modeling-workflow` | 先 `systems-thinking-framework` | 先建系统观，再量化 |
| `concentrate-forces` + `overall-planning` | 先 `overall-planning` | 先做全局平衡，再集中突破 |
| `spark-prairie-fire` + `protracted-strategy` | 先 `spark-prairie-fire` | 先建立根据地，再规划持久战 |

## 标准化工作流

当任务明确需要跨环节串联多个 skill 时，调用 `workflows`（工作流组合），预设三条标准流水线：

- **新项目启动流**：感知 → 理解 → 建模 → 求解 → 执行
- **复杂问题攻坚流**：感知 → 理解 → 求解 → 校验 → 修正（循环）
- **方案迭代优化流**：执行 → 校验 → 修正 → 建模 → 求解（循环）
