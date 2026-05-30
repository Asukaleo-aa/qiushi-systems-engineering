[CmdletBinding()]
param(
    [switch] $SmokeInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pluginRoot = Split-Path -Parent $scriptDir

$pass = 0
$fail = 0
$warn = 0

function Pass($msg) { Write-Host "  [PASS] $msg" -ForegroundColor Green; $script:pass++ }
function Fail($msg) { Write-Host "  [FAIL] $msg" -ForegroundColor Red; $script:fail++ }
function Warn($msg) { Write-Host "  [WARN] $msg" -ForegroundColor Yellow; $script:warn++ }

Write-Host "`n=== qiushi-systems-engineering validation ===`n" -ForegroundColor Cyan

# ── 1. JSON config files ──
Write-Host "1. JSON config files" -ForegroundColor White

$jsonFiles = @(
    ".claude-plugin/plugin.json",
    ".cursor-plugin/plugin.json",
    "hooks/hooks.json"
)

foreach ($jf in $jsonFiles) {
    $path = Join-Path $pluginRoot $jf
    if (-not (Test-Path -LiteralPath $path)) {
        Fail "Missing: $jf"
        continue
    }
    try {
        $content = Get-Content -LiteralPath $path -Raw -Encoding UTF8
        $null = $content | ConvertFrom-Json
        Pass "$jf is valid JSON"
    } catch {
        Fail "$jf is invalid JSON: $_"
    }
}

# ── 2. Hook files ──
Write-Host "`n2. Hook files" -ForegroundColor White

$hookFiles = @(
    "hooks/hooks.json",
    "hooks/session-start",
    "hooks/session-start.ps1",
    "hooks/run-hook.cmd"
)

foreach ($hf in $hookFiles) {
    $path = Join-Path $pluginRoot $hf
    if (-not (Test-Path -LiteralPath $path)) {
        Fail "Missing: $hf"
        continue
    }
    $size = (Get-Item -LiteralPath $path).Length
    if ($size -eq 0) {
        Fail "$hf is empty"
    } else {
        Pass "$hf exists ($size bytes)"
    }
}

# ── 3. Skill directories ──
Write-Host "`n3. Skill directories" -ForegroundColor White

$excludeDirs = @('docs','ppt','commands','hooks','tests','.claude-plugin','.codex','.cursor-plugin','.opencode','.git','.reasonix')
$skillDirs = Get-ChildItem -LiteralPath $pluginRoot -Directory |
    Where-Object { $_.Name -notin $excludeDirs }

$skillCount = 0
$skillsWithFrontmatter = @()
$skillFrontmatterIssues = @()

foreach ($dir in $skillDirs) {
    $skillFile = Join-Path $dir.FullName "SKILL.md"
    if (-not (Test-Path -LiteralPath $skillFile)) {
        Fail "$($dir.Name): missing SKILL.md"
        continue
    }
    $skillCount++
    $content = Get-Content -LiteralPath $skillFile -Raw -Encoding UTF8

    # Check frontmatter — content must start with '---'
    if ($content -match "^\-\-\-") {
        $hasName = $content -match '(?s)^---\s*\n\s*name\s*:'
        $hasDesc = $content -match '(?s)^---\s*\n[\s\S]*?\n\s*description\s*:'
        if ($hasName -and $hasDesc) {
            Pass "$($dir.Name): frontmatter OK"
            $skillsWithFrontmatter += $dir.Name
        } else {
            $issues = @()
            if (-not $hasName) { $issues += "missing 'name'" }
            if (-not $hasDesc) { $issues += "missing 'description'" }
            Warn "$($dir.Name): frontmatter issues: $($issues -join ', ')"
            $skillsWithFrontmatter += $dir.Name
        }
    } else {
        Fail "$($dir.Name): no frontmatter"
    }
}

Write-Host "`n   Skill directories found: $skillCount"

# ── 4. Command files ──
Write-Host "`n4. Command files" -ForegroundColor White

$cmdDir = Join-Path $pluginRoot "commands"
if (-not (Test-Path -LiteralPath $cmdDir)) {
    Fail "commands/ directory missing"
} else {
    $cmdFiles = Get-ChildItem -LiteralPath $cmdDir -Filter "*.md"
    $cmdCount = @($cmdFiles).Count

    # Every command should have a matching skill directory
    foreach ($cf in $cmdFiles) {
        $cmdName = $cf.BaseName
        $matchingSkill = Join-Path (Join-Path $pluginRoot $cmdName) "SKILL.md"
        if (Test-Path -LiteralPath $matchingSkill) {
            Pass "command/$cmdName.md → $cmdName/SKILL.md"
        } else {
            Warn "command/$cmdName.md has no matching skill directory"
        }

        # Check command frontmatter
        $cmdContent = Get-Content -LiteralPath $cf.FullName -Raw -Encoding UTF8
        if (($cmdContent -match "^\-\-\-") -and ($cmdContent -match '(?s)^---\s*\n\s*name\s*:')) {
            Pass "command/$cmdName.md: frontmatter OK"
        } else {
            Warn "command/$cmdName.md: frontmatter issues"
        }
    }

    # Missing commands for skill directories
    $skillNames = $skillDirs | ForEach-Object { $_.Name }
    $cmdNames = $cmdFiles | ForEach-Object { $_.BaseName }
    $missingCmds = $skillNames | Where-Object { $_ -notin $cmdNames }
    foreach ($mc in $missingCmds) {
        Warn "No command file for skill: $mc"
    }

    Write-Host "`n   Command files: $cmdCount, Skills: $skillCount"
}

# ── 5. Cross-reference check ──
Write-Host "`n5. Cross-reference sanity" -ForegroundColor White

$knownSkills = $skillDirs | ForEach-Object { $_.Name }
$refOK = $true

foreach ($dir in $skillDirs) {
    $skillFile = Join-Path $dir.FullName "SKILL.md"
    $content = Get-Content -LiteralPath $skillFile -Raw -Encoding UTF8

    $allRefs = [regex]::Matches($content, '`([a-z]+(?:-[a-z]+)*)`') |
        ForEach-Object { $_.Groups[1].Value } |
        Where-Object { $_ -in $knownSkills -and $_ -ne $dir.Name } |
        Select-Object -Unique

    foreach ($ref in $allRefs) {
        $refPath = Join-Path (Join-Path $pluginRoot $ref) "SKILL.md"
        if (-not (Test-Path -LiteralPath $refPath)) {
            Warn "$($dir.Name) references '$ref' which is not a known skill"
            $refOK = $false
        }
    }
}
if ($refOK) {
    Pass "Cross-reference check: all skill-ref tokens verified against known skill names"
}

# ── 6. File structure checklist ──
Write-Host "`n6. Required files" -ForegroundColor White

$requiredFiles = @(
    "README.md",
    "LICENSE",
    ".gitignore",
    "arming-thought/SKILL.md",
    "workflows/SKILL.md",
    "docs/overview.html"
)

foreach ($rf in $requiredFiles) {
    $path = Join-Path $pluginRoot $rf
    if (Test-Path -LiteralPath $path) {
        Pass $rf
    } else {
        Fail "Missing: $rf"
    }
}

# ── Summary ──
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RESULTS:  PASS=$pass  FAIL=$fail  WARN=$warn" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($SmokeInstall) {
    Write-Host "`n[SMOKE INSTALL] Quick install validation." -ForegroundColor Yellow
    if ($fail -eq 0) {
        Write-Host "Smoke test PASSED." -ForegroundColor Green
    } else {
        Write-Host "Smoke test FAILED. Review failures above." -ForegroundColor Red
    }
}

if ($fail -gt 0) {
    exit 1
} else {
    Write-Host "`nAll checks PASSED.`n" -ForegroundColor Green
    exit 0
}
