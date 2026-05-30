# 在 Codex 中使用 qiushi-systems-engineering

## 安装

### 自动安装

```bash
git clone https://github.com/Asukaleo-aa/qiushi-systems-engineering
cd qiushi-systems-engineering
```

在 Codex 对话中执行：

```text
请帮我在 Codex 中注册 qiushi-systems-engineering 的全部 28 个 skill：
使用 install_skill 工具，将仓库根目录下每个子目录（arming-thought/、contradiction-analysis/ 等）中的 SKILL.md 注册为项目级 skill。
```

### 手动安装

1. 将本仓库克隆到本地
2. 在 Codex 设置中，将本仓库路径添加为 skill 源目录
3. Codex 会自动索引所有 `SKILL.md` 文件

## 使用

| 方式 | 说明 |
|------|------|
| **自动触发** | `arming-thought` 的 description 中包含触发条件——当 Codex 判断适用时自动加载 |
| **显式调用** | `/skill contradiction-analysis`、`/skill first-principles-analysis` 等 |
| **认知环路由** | `arming-thought` 提供深度判据（0-4 级）——简单任务只走感知+执行，复杂任务全环展开 |

## 28 Skill 速查

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

## 验证

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```
