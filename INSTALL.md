# 安装 qiushi-systems-engineering

> 实事求是 + 钱学森系统工程 → 7 环认知闭环 Skill 体系

## 系统要求

- **Windows**：PowerShell 5.1+，默认使用 PowerShell hook，无需另外安装 Bash
- **macOS / Linux**：需要可用的 `bash` 或 `sh`
- **验证脚本**：仓库内置 `tests/validate.ps1`，可用于安装后自检

---

## 安装方式

### Claude Code

```bash
git clone https://github.com/your-org/qiushi-systems-engineering
cd qiushi-systems-engineering
claude plugin add .
```

安装后每次新会话启动时，`arming-thought` 会自动注入，建立「实事求是」总原则和认知环路由。

### Cursor

1. 克隆仓库到本地
2. 将项目目录加入 Cursor 的插件路径
3. 确认 `.cursor-plugin/plugin.json` 已被识别
4. 运行验证脚本确认安装：
   ```powershell
   powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
   ```

### Codex

参考 [.codex/INSTALL.md](.codex/INSTALL.md)。

### OpenCode

参考 [.opencode/INSTALL.md](.opencode/INSTALL.md)。

### 手动 / 其他平台

本项目的核心是 `skills/` 目录下的 SKILL.md 文件和 `commands/` 目录下的命令入口。任何支持 system prompt 注入的 AI 工具都可以使用：

1. 将 `arming-thought/SKILL.md` 作为 system prompt 的一部分注入
2. 将各具体 skill 的 `SKILL.md` 作为按需加载的参考文档
3. 如果支持 Markdown commands，可一并加载 `commands/` 目录

---

## 安装验证

### Windows

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

### macOS / Linux

```bash
# 检查所有 skill 目录和 frontmatter
ls */SKILL.md | wc -l   # 应输出 28

# 检查 command 文件
ls commands/*.md | wc -l  # 应输出 28
```

---

## 让 AI 助手代你安装

如果你在让 Claude Code、Cursor Agent 或其他终端型 AI 助手代你安装，可以直接粘贴下面这段：

```text
请帮我安装 qiushi-systems-engineering：

1. 如果当前目录还没有这个仓库，执行：
   git clone https://github.com/your-org/qiushi-systems-engineering

2. 进入仓库目录：
   cd qiushi-systems-engineering

3. 如果当前环境安装了 Claude Code，执行：
   claude plugin add .

4. 如果当前环境是 Cursor，请把这个项目目录注册到 Cursor 的插件路径。

5. 安装完成后请运行验证脚本：
   powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1

6. 告诉我验证结果。
```
