---
name: simulation-validation-cycle
description: |
  仿真验证循环：多场景仿真+边缘条件测试+偏差量化修正——在实践中检验模型。
---

读取并遵循 `simulation-validation-cycle/SKILL.md`。

当前模型：
$ARGUMENTS

输出要求：
1. 明确当前处于实践认识循环的哪个阶段。
2. 定义仿真场景矩阵（正常/边界/异常/压力）。
3. 逐场景运行仿真并记录结果。
4. 量化偏差——模型输出 vs 预期。
5. 根据偏差修正模型或修正预期。
