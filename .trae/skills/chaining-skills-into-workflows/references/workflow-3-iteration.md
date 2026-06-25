# Workflow 3：方案迭代优化流

**认知路径：** 执行 → 校验 → 修正 → 理解 → 建模 → 求解 → 执行（循环）

**适用场景：** 已有在运行的方案，但需要持续改进。或方案在实践中出现失谐，需要诊断和修正。

**触发信号：** 优化现有方案、性能下降需要诊断、持续改进、迭代升级

## 工作流

```
concentrate-forces  →  engineering-orchestration  →  practice-cognition
  (执行：聚焦主攻)       (执行：编排任务)             (校验：实践检验)
                                                          │
                                              feedback-and-revision-loop ←── (校验：偏差检测)
                                                          │
                                              contradiction-analysis     ←── (理解：重新找矛盾)
                                                          │
                                              adaptive-robust-strategy   ←── (修正：自适应)
                                                          │
                                              criticism-self-criticism   ←── (修正：复盘)
                                                          │
                                              constrained-optimization   ←── (求解：新约束下最优)
                                                          │
                                              ──→ 回到执行环
```

## 步骤详解

### Step 1：执行——聚焦与编排

- `concentrating-forces`：在当前条件下确定主攻方向，宣告"当前战役目标"
- `engineering-orchestration`：将改进方案编排为有依赖的任务序列
- 如需要多目标平衡：`overall-planning`（在执行前做全局权衡）

### Step 2：校验——实践检验

- `validating-through-practice`：将改进方案投入实践，观察结果
- `detecting-and-correcting-deviations`：检测偏差，量化差异，追溯根因
- 输出：偏差报告 + 根因定位 + 严重程度评级

### Step 3：理解——重新定位

- 如果偏差指向理解层问题：`analyzing-contradictions`（重新识别主要矛盾是否已转移）
- 如果偏差指向建模层问题：回到建模环节重建模型
- 输出：修正后的矛盾图谱

### Step 4：修正——策略调整

- `adapting-robustly-to-uncertainty`：内置自适应机制，使方案能在变化中保持最优
- `reviewing-work-quality`：结构化审视整个迭代过程的判断质量
- 输出：调整后的方案 + 自校正规则

### Step 5：求解——新方案

- `optimizing-under-constraints`：在更新后的约束和模型下重新求最优
- 输出：迭代后的最优方案

### Step 6：回到执行环，进入下一轮迭代

## 终止条件

- 连续两轮迭代的改进量低于阈值
- 或达到预设的迭代次数上限
- 或方案已满足所有硬性指标
