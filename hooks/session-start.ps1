[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pluginRoot = Split-Path -Parent $scriptDir
$skillPath = Join-Path $pluginRoot "arming-thought\SKILL.md"

if (-not (Test-Path -LiteralPath $skillPath)) {
    throw "Missing skill file: $skillPath"
}

$armingThoughtContent = Get-Content -LiteralPath $skillPath -Raw -Encoding UTF8
$sessionContext = @"
<QIUSHI_SE>
已加载 qiushi-systems-engineering:arming-thought。请先遵守用户指令、项目约束和宿主平台规则，再在明确适用时把这份方法论作为补充的认知环路由与校验框架。

$armingThoughtContent

</QIUSHI_SE>
"@

if ($env:CURSOR_PLUGIN_ROOT) {
    $payload = @{
        additional_context = $sessionContext
    }
} elseif ($env:CLAUDE_PLUGIN_ROOT) {
    $payload = @{
        hookSpecificOutput = @{
            hookEventName = "SessionStart"
            additionalContext = $sessionContext
        }
    }
} else {
    $payload = @{
        additional_context = $sessionContext
    }
}

$payload | ConvertTo-Json -Depth 4
