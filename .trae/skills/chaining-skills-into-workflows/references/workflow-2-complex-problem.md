# Workflow 2：复杂问题攻坚流

**认知路径：** 感知 → 理解 → 建模 → 求解 → 校验 → 修正（循环）

**适用场景：** 问题有技术深度，涉及多组件、多约束，需要建立系统模型并求解。

**触发信号：** 复杂系统、多组件、多约束、需要建模仿真、debug 困难问题

## 工作流

```
investigation-first  →  first-principles  →  systems-thinking  →  quantitative-modeling
  (感知)                  (理解)              (建模：世界观)        (建模：定量)
       │                                            │
problem-domain ──→                          system-boundary ──→
  (感知：领域知识)                            (建模：结构)
                                                   │
                                          constrained-optimization
                                          hierarchical-decomposition
                                          duality-complementarity
                                          perturbation-progressive    ←── (求解层)
                                          multi-representation-equiv
                                                   │
                                          simulation-validation     ←── (校验)
                                          feedback-and-revision
                                                   │
                                          adaptive-robust-strategy   ←── (修正)
                                                   │
                                          criticism-self-criticism   ←── (修正：复盘)
```

## 步骤详解

### Step 1：感知——双轨调查

- 哲学轨：`investigating-before-deciding`（一手事实）
- 工程轨：`investigating-before-deciding`（工程扩展模式：系统性知识地图）
- 如数据有噪声：`estimating-hidden-states`（从噪声中提取信号）
- 输出：完整的现状画像 + 知识地图 + 信息可靠性评估

### Step 2：理解——本质与矛盾

- `analyzing-from-first-principles`：剥离假设到基本元素
- `analyzing-contradictions`：在本质基础上定位主要矛盾
- 输出：本质定义 + 主要矛盾 + 假设依赖链

### Step 3：建模——系统描述

- `applying-systems-thinking`：目的→边界→组分→层次→涌现→反馈
- `structuring-system-boundaries`：精细划分子系统，定义接口契约
- `building-quantitative-models`：定性假设转为可计算模型
- `synthesizing-multi-source-judgments`（多源结果汇聚时）：定性+定量综合集成
- 输出：系统模型 + 接口契约 + 可计算的定量关系

### Step 4：求解——逐层攻破

按需选用求解工具箱：

- `optimizing-under-constraints`：约束下找最优
- `decomposing-and-coordinating-hierarchically`：多子系统协调
- `analyzing-duality-and-complementarity`：正向遇阻换对偶
- `solving-by-perturbation-progression`：不能直接解就渐进逼近
- `transforming-representations-for-equivalence`：工具不合适就换表述
- 输出：可行解 + 瓶颈约束 + 解的适用范围

### Step 5：校验——验证与偏差

- `validating-through-simulation`：多场景仿真测试
- `detecting-and-correcting-deviations`：阶段偏差检测与根因追溯
- 输出：偏差量化 + 根因层次（执行/求解/建模/理解/感知）

### Step 6：修正——根据偏差回环

偏差的层次决定回到哪个认知环节：

- 执行偏差 → 回到「执行」环，调整 engineering-orchestration
- 求解偏差 → 回到「求解」环，换约束或换方法
- 建模偏差 → 回到「建模」环，修正系统描述
- 理解偏差 → 回到「理解」环，重做 first-principles
- 感知偏差 → 回到「感知」环，重做 investigation
- 环境持续变化 → `adapting-robustly-to-uncertainty`（内置自适应机制）
- 质量审视 → `reviewing-work-quality`（结构化复盘）

## 终止条件

- 偏差缩小到可接受范围
- 或经过一轮闭环后判断当前信息不足以进一步改进（标注不确定性，回感知环）
