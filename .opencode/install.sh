#!/usr/bin/env bash
# qiushi-systems-engineering → OpenCode 安装脚本
# 创建 .opencode/ 下的技能软链接、插件、工具和代理配置

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

echo "=== qiushi-systems-engineering → OpenCode 安装 ==="

# 确保 opencode 已安装
if ! command -v opencode &>/dev/null; then
    echo "⚠️ OpenCode 未安装，请先执行: curl -fsSL https://opencode.ai/install | bash"
fi

# 创建目录结构
mkdir -p "$REPO_ROOT/.opencode"/{skills,plugins,tools,agents,commands}

# Layer 1: 技能软链接（28 个 skill → .opencode/skills/）
echo ""
echo "Layer 1: 安装技能层..."
SKILLS=(
    arming-thought investigation-first state-estimation mass-line
    contradiction-analysis first-principles-analysis historical-evolution-analysis
    systems-thinking-framework system-boundary-structuring
    quantitative-modeling-workflow meta-synthesis-engine
    constrained-optimization hierarchical-decomposition-coordination
    duality-complementarity-analysis perturbation-progressive-method
    multi-representation-equivalence-transform
    engineering-orchestration concentrate-forces spark-prairie-fire
    protracted-strategy overall-planning practice-cognition
    simulation-validation-cycle feedback-and-revision-loop
    criticism-self-criticism adaptive-robust-strategy workflows
    formalization-tools
)

installed=0
for skill in "${SKILLS[@]}"; do
    target="$REPO_ROOT/.opencode/skills/$skill"
    source="../../$skill"
    if [ -L "$target" ]; then
        rm "$target"
    fi
    ln -s "$source" "$target"
    installed=$((installed + 1))
done
echo "  ✅ $installed 个技能已链接"

# Layer 2: 插件（session.created + session.compacting）
echo ""
echo "Layer 2: 插件文件已就绪"
if [ -f "$REPO_ROOT/.opencode/plugins/qiushi.js" ]; then
    echo "  ✅ qiushi.js"
else
    echo "  ⚠️ qiushi.js 未找到（需单独开发）"
fi

# Layer 3: 工具
echo ""
echo "Layer 3: 工具文件已就绪"
for tool in qiushi-fsm-check qiushi-coupling-analyze qiushi-calibrate; do
    if [ -f "$REPO_ROOT/.opencode/tools/${tool}.ts" ]; then
        echo "  ✅ ${tool}.ts"
    else
        echo "  ⚠️ ${tool}.ts 未找到（需单独开发）"
    fi
done

# Layer 4: 代理配置
echo ""
echo "Layer 4: 代理配置已就绪"
if [ -f "$REPO_ROOT/.opencode/agents/qiushi.md" ]; then
    echo "  ✅ qiushi.md"
else
    echo "  ⚠️ qiushi.md 未找到（需单独开发）"
fi

echo ""
echo "=== 安装完成 ==="
echo ""
echo "使用 OpenCode: cd $REPO_ROOT && opencode"
echo "切换到 qiushi 代理: /agent qiushi"
echo "技能列表: OpenCode 启动后自动扫描 .opencode/skills/"
