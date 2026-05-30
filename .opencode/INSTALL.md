# 在 OpenCode 中使用 qiushi-systems-engineering

## 安装

1. 将本仓库克隆到本地
2. 在 OpenCode 的配置中，将本仓库的 `skills/` 目录注册为 skill 源
3. OpenCode 会自动索引所有 `SKILL.md` 文件的 frontmatter

## 使用

- `arming-thought` skill 会在每次新对话开始时自动加载
- 其他 skill 通过 OpenCode 的 skill 路由机制按需匹配
- 支持通过 `commands/` 下的命令入口显式调用

## 验证

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```
