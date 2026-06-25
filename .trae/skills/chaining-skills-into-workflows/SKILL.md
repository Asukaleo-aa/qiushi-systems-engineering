---
name: chaining-skills-into-workflows
description: |
  触发：当面临的任务明显需要跨认知环节串联多个 skill 时调用；常见信号包括从零启动新项目、攻坚复杂疑难问题、对已有方案进行迭代优化。本技能提供三条标准化工作流，定义 skill 的调用顺序、步骤间的数据传递格式和终止条件。上游衔接 routing-cognitive-skills 的认知环路由判断，下游调用各具体 skill 执行。
---

# 工作流组合

## 描述

在正确的认知环节以正确的顺序组合使用思想武器。本技能提供三条标准化工作流，每条工作流沿认知环的若干环节行进，定义 skill 调用顺序、数据传递格式和终止条件。

## 使用场景

### 何时使用

- 从零开始面对新任务，目标已知但路径未知
- 问题有技术深度，涉及多组件、多约束，需要建模求解
- 已有运行方案但需要持续改进或诊断失谐
- 任务跨越感知、理解、建模、求解、执行、校验、修正中的 3 个以上环节

### 何时不使用

- 简单任务，只需 1-2 个 skill 即可完成
- 用户已明确指定要调用的 skill 序列
- 子 agent 执行单一具体任务

## 输入输出

### Input

| 字段 | 类型 | 说明 |
|------|------|------|
| task_description | string | 当前任务的完整描述 |
| current_phase | "从零启动" \| "攻坚求解" \| "迭代优化" \| "auto" | 任务所处阶段，auto 时由技能自动判断 |
| available_context | list\<string\> | 已有的信息、数据、模型等上下文（可选） |

### Output

| 字段 | 类型 | 说明 |
|------|------|------|
| selected_workflow | string | 选定的工作流名称及认知路径 |
| skill_sequence | list\<{step: int, skill: string, phase: string, input_from: string}\> | skill 调用序列及数据传递关系 |
| termination_condition | string | 当前工作流的终止条件 |
| next_action | string | 建议的下一步操作 |

## 指令

1. **判断任务阶段**：根据 task_description 和 current_phase，判断应使用哪条工作流。参照下方工作流选择指南。
2. **选择工作流**：匹配最合适的工作流，输出 skill_sequence。详细步骤参见 `references/` 目录下对应的工作流文档。
3. **执行 skill 序列**：按 skill_sequence 顺序依次调用各 skill，每步将上一步的输出作为下一步的输入传递。
4. **检测偏差与回环**：每步执行后检查输出是否符合预期。偏差的层次决定回到哪个认知环节——执行偏差回执行环、求解偏差回求解环、建模偏差回建模环、理解偏差回理解环、感知偏差回感知环。
5. **检查终止条件**：每轮结束后评估是否满足终止条件。满足则输出最终结论；不满足则继续下一轮。

### 工作流选择指南

| 任务情况 | 工作流 | 认知路径 | 详细步骤 |
|---------|--------|---------|---------|
| 从零开始，不知道怎么做 | Workflow 1：新项目启动 | 感知 → 理解 → 执行 | `references/workflow-1-new-project.md` |
| 问题有技术深度，需要建模求解 | Workflow 2：复杂问题攻坚 | 全部七个环节 | `references/workflow-2-complex-problem.md` |
| 已有方案，需要持续改进 | Workflow 3：方案迭代优化 | 执行 → 校验 → 修正（循环） | `references/workflow-3-iteration.md` |

> 三条工作流不互斥——长期项目可在启动阶段用 Workflow 1，中期攻坚用 Workflow 2，后期迭代用 Workflow 3。

## 失败策略

| 失败场景 | 处理方式 |
|---------|---------|
| 无法判断应选哪条工作流 | 退回 investigating-before-deciding 补充事实；若任务确实跨阶段，按最紧迫的阶段选择，后续可切换 |
| 工作流执行中某 skill 输出不满足下游输入要求 | 在当前步骤插入 investigating-before-deciding 或 detecting-and-correcting-deviations 补全信息，再继续 |
| 偏差回环后仍无法收敛（连续 3 轮无改善） | 暂停工作流，调用 reviewing-work-quality 进行结构化复盘，判断是否需要切换工作流或重新定义问题 |
| 工作流中途任务性质发生变化 | 重新执行步骤 1 判断阶段，切换到对应工作流，保留已获得的中间产物 |

## 示例

**场景 1**：团队接到新业务线，需从零搭建推荐系统，资源有限。

1. 判断阶段：从零启动 → 选择 Workflow 1
2. 执行序列：investigating-before-deciding → analyzing-from-first-principles → analyzing-contradictions → sparking-prairie-fire
3. 产出：最小可行推荐系统方案 + 发展路线图

**场景 2**：已有推荐系统上线，点击率连续 3 周下降，需诊断并修复。

1. 判断阶段：迭代优化 → 选择 Workflow 3
2. 执行序列：concentrating-forces → engineering-orchestration → validating-through-practice → detecting-and-correcting-deviations
3. 偏差定位后回环：contradiction-analysis → adapting-robustly-to-uncertainty → optimizing-under-constraints
4. 产出：修复方案 + 自校正规则
