# Reasonix 安装指南

## 自动安装

在项目根目录运行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .reasonix/setup.ps1
```

---

## 手动注册

如果你希望逐个注册 skill（而非全部），让 Reasonix 代你执行：

```text
请用 install_skill 工具把 <skill-name> 注册到当前项目。skill 文件在 <skill-name>/SKILL.md。
```

---

## 验证安装

安装后运行验证脚本：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

检查 Reasonix 的 skill 索引：

```text
/skill   # 查看可用 skill 列表，应该能看到 27 个 qiushi 前缀的 skill
```
