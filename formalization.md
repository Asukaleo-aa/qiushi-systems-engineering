# 形式化层

> qiushi-formalization 对本仓库的引用和说明

## 概述

[qiushi-formalization](https://github.com/Asukaleo-aa/qiushi-formalization) 是求是系统工程方法论的形式化工程——将 28 个 skill 的方法论结构翻译为控制论的数学等价物，并实现为可计算、可仿真、可标定的认知操作系统原型。

## 形式化文件

不属于本仓库。独立维护于 `qiushi-formalization/` 目录，与本仓库的 `qiushi-systems-engineering/` 同级。

## 五层形式化产出

| 层 | 目录 | 产出 | 状态 |
|----|------|------|------|
| 输出结构对照 | `output-structures/` | 28 skill 输出字段全集 + A/B 组分类 | ✅ 完成 |
| FSM 原型引擎 | `fsm-prototype/` | 三态有限状态机 + 11 维观测向量 + 双通道门控 + 耦合矩阵谱分析 + 6 场景测试 | ✅ v0.1 |
| 哲学⇄控制论映射 | `mapping-framework/` | 实践论⇄卡尔曼滤波、矛盾分析⇄分散协调、群众路线⇄分布式滤波、第一性原理⇄系统分类 | ✅ 第一轮 |
| 翻译层 | `translation-layer/` | 哲学侧 skill 观测域定义（contradiction-analysis/practice-cognition/first-principles/mass-line） | ✅ v0.1 |
| 参数标定 | `calibration/` | Scenario 6：双参数标定（σ_amp × σ_dir）+ 三级诊断框架 + 分桶稳定性验证 | ✅ 骨架 |

## 如何使用形式化产出

形式化层是**离线分析工具**，不直接作为 agent 运行时 skill 加载。它的用途：

1. **评估方法论质量**：通过 6 场景测试验证认知环的状态转移逻辑是否正确
2. **标定门控参数**：双通道门控的阈值（γ₁=5%, γ₂=20%）通过 parameter calibration 确定
3. **检测矛盾转化**：耦合矩阵谱分析检测主要矛盾是否发生结构级变化
4. **指导方法论迭代**：当 FSM 检测到假稳态或矛盾转化时，反馈给方法论本身

## 运行测试

```bash
cd qiushi-formalization/fsm-prototype
python3 main.py              # 全部 6 场景
python3 main.py --scenario convergence  # 单场景

cd qiushi-formalization/calibration
python3 scenario6.py         # 参数标定自检
```
