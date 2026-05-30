---
name: perturbation-progressive-method
description: |
  摄动渐进法：先解标称问题→一阶摄动修正→逐步加回复杂因素，适合从简单到复杂递进求解。
---

读取并遵循 `perturbation-progressive-method/SKILL.md`。

当前问题：
$ARGUMENTS

输出要求：
1. 定义标称问题（最简化的版本）。
2. 求解标称解作为基准。
3. 识别被省略的"摄动项"（复杂因素）。
4. 逐步加回——每加一项，计算修正量。
5. 判断修正何时收敛——何时可以停止。
