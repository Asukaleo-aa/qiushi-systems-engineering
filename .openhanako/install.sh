#!/usr/bin/env bash
# qiushi-systems-engineering → OpenHanako 安装脚本
# 将 28 个方法论 skill 部署到 ~/.hanako/skills/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
HANAKO_SKILLS="${HOME}/.hanako/skills"

echo "=== qiushi-systems-engineering → OpenHanako 安装 ==="

if [ ! -d "$REPO_ROOT/arming-thought" ]; then
    echo "错误: 未在 qiushi-systems-engineering 仓库根目录下运行"
    echo "当前目录: $SCRIPT_DIR"
    exit 1
fi

if [ ! -d "$HANAKO_SKILLS" ]; then
    echo "创建 OpenHanako skills 目录: $HANAKO_SKILLS"
    mkdir -p "$HANAKO_SKILLS"
fi

# 27 个方法论 skill 清单（v3.2.0 — problem-domain-investigation 已合并入 investigation-first）
SKILLS=(
    "arming-thought"
    "investigation-first"
    "state-estimation"
    "mass-line"
    "contradiction-analysis"
    "first-principles-analysis"
    "historical-evolution-analysis"
    "systems-thinking-framework"
    "system-boundary-structuring"
    "quantitative-modeling-workflow"
    "meta-synthesis-engine"
    "constrained-optimization"
    "hierarchical-decomposition-coordination"
    "duality-complementarity-analysis"
    "perturbation-progressive-method"
    "multi-representation-equivalence-transform"
    "engineering-orchestration"
    "concentrate-forces"
    "spark-prairie-fire"
    "protracted-strategy"
    "overall-planning"
    "practice-cognition"
    "simulation-validation-cycle"
    "feedback-and-revision-loop"
    "criticism-self-criticism"
    "adaptive-robust-strategy"
    "workflows"
)

installed=0
skipped=0

for skill in "${SKILLS[@]}"; do
    src="$REPO_ROOT/$skill"
    dst="$HANAKO_SKILLS/$skill"

    if [ ! -d "$src" ]; then
        echo "  ⚠ 跳过: $skill (源目录不存在)"
        skipped=$((skipped + 1))
        continue
    fi

    # 备份已有 skill
    if [ -d "$dst" ]; then
        backup="$dst.bak.$(date +%Y%m%d-%H%M%S)"
        echo "  📦 备份: $skill → $(basename "$backup")"
        mv "$dst" "$backup"
    fi

    # 复制
    cp -r "$src" "$dst"
    echo "  ✅ 安装: $skill"
    installed=$((installed + 1))
done

echo ""
echo "=== 安装完成 ==="
echo "已安装: $installed / ${#SKILLS[@]}"
if [ $skipped -gt 0 ]; then
    echo "已跳过: $skipped"
fi
echo ""
echo "重启 OpenHanako 或开始新对话后，arming-thought 将自动加载。"
echo "验证：观察新对话开始时的认知环路由宣告。"

# 如果 qiushi-formalization 在同一父目录，提示
FORMALIZATION="${REPO_ROOT}/../qiushi-formalization"
if [ -d "$FORMALIZATION" ]; then
    echo ""
    echo "ℹ️  检测到 qiushi-formalization 在邻近目录。"
    echo "  形式化工具（FSM 引擎、参数标定）是离线分析工具，不安装到运行时。"
    echo "  运行测试: cd $FORMALIZATION/fsm-prototype && python3 main.py"
fi
