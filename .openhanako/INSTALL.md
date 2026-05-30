# 在 OpenHanako 中使用 qiushi-systems-engineering

## 当前状态

✅ **已完全集成** —— 28 个 qiushi skill 已部署在 `~/.hanako/skills/` 目录下，`arming-thought` 在每次顶层对话启动时自动加载。

## 安装（新实例）

### 方式一：从 GitHub 克隆

```bash
git clone https://github.com/Asukaleo-aa/qiushi-systems-engineering /tmp/qiushi
cp -r /tmp/qiushi/arming-thought ~/.hanako/skills/
cp -r /tmp/qiushi/contradiction-analysis ~/.hanako/skills/
# ... 其余 25 个 skill 同上 ...
# 或使用批量安装脚本
bash /tmp/qiushi/.openhanako/install.sh
rm -rf /tmp/qiushi
```

### 方式二：从本地仓库安装

```bash
cd /path/to/qiushi-systems-engineering
bash .openhanako/install.sh
```

### 安装后验证

在新对话中检查 `arming-thought` 是否自动加载——对话开始时应有认知环路由的宣告。

## 体系架构

```
OpenHanako 运行时
├── ~/.hanako/
│   ├── skills/                    ← qiushi 技能池（28 个 + 系统技能）
│   │   ├── arming-thought/SKILL.md
│   │   ├── contradiction-analysis/SKILL.md
│   │   └── ...
│   └── agents/hanako/
│       └── learned-skills.bak.*   ← 历史备份
│
├── qiushi-systems-engineering/    ← 源仓库（方法论本体）
│   ├── *.md                       ← 方法论文档
│   ├── formalization →            ← 指向 qiushi-formalization
│   └── .openhanako/               ← OpenHanako 专用适配
│
└── qiushi-formalization/          ← 形式化工程
    ├── fsm-prototype/             ← FSM 引擎
    ├── mapping-framework/         ← 哲学⇄控制论映射
    └── calibration/               ← 参数标定
```

## 与通用 skill 体系的关系

qiushi 方法论技能是 OpenHanako 通用技能池的子集。通用技能池包含：
- **qiushi 方法论层**（28 个）：实事求是 + 系统工程 → 七环认知闭环
- **文档生成层**（minimax-docx, minimax-pdf, minimax-xlsx, pptx-generator）：办公文档输出
- **系统层**（skill-creator, user-guide）：元能力和帮助系统

两层协同：方法论层提供"怎么想"，文档层提供"怎么输出"。

## 形式化层的接入

qiushi-formalization 是离线分析工具（Python），不直接作为运行时 skill 加载。它的产出（FSM 状态机、耦合矩阵分析、参数标定）用于：

1. **评估方法论的质量**：通过 6 场景测试验证认知环的状态转移逻辑
2. **标定门控参数**：双通道门控的阈值通过 scenario6 标定
3. **指导方法论迭代**：耦合矩阵谱分析检测矛盾转化，指导 skill 的调整

当前 FSM 原型 v0.1 已通过全部 6 个场景测试。

## 使用

日常对话中无需手动干涉——`arming-thought` 自动建立实事求是总原则，系统根据触发条件自动路由到对应 skill。

显式调用：
```
/skill contradiction-analysis
/skill first-principles-analysis
/skill constrained-optimization
```
