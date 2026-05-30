# 在 Codex 中使用 qiushi-systems-engineering

## 安装

1. 将本仓库克隆到本地
2. 在 Codex 的设置中，将本仓库的路径添加为 skill 源目录
3. Codex 会自动扫描 `skills/` 目录下的所有 `SKILL.md` 文件

## 使用

- `arming-thought` skill 会自动在 Codex 启动时加载，建立「实事求是」总原则
- 其他 27 个 skill 通过 Codex 的 skill 调用机制按需加载
- 也可通过 `commands/` 目录下的命令入口手动调用

## 验证

运行内置验证脚本确认所有 skill 文件的 frontmatter 完整：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```
