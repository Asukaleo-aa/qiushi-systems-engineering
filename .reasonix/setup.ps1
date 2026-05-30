[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$reasonixSkills = Join-Path $projectRoot ".reasonix\skills"

# Skill directories to copy
$skillDirs = Get-ChildItem -LiteralPath $projectRoot -Directory |
    Where-Object {
        $_.Name -notin @(
            '.claude-plugin', '.codex', '.cursor-plugin', '.git',
            '.opencode', '.reasonix', 'commands', 'docs', 'hooks',
            'ppt', 'tests'
        )
    }

Write-Host "`n=== qiushi-systems-engineering Reasonix Setup ===`n" -ForegroundColor Cyan

# Create .reasonix/skills if needed
if (-not (Test-Path -LiteralPath $reasonixSkills)) {
    New-Item -ItemType Directory -Path $reasonixSkills -Force | Out-Null
    Write-Host "Created $reasonixSkills" -ForegroundColor Green
}

$installed = 0
$skipped = 0

foreach ($dir in $skillDirs) {
    $srcFile = Join-Path $dir.FullName "SKILL.md"
    if (-not (Test-Path -LiteralPath $srcFile)) {
        Write-Host "  [SKIP] $($dir.Name) — no SKILL.md" -ForegroundColor Yellow
        $skipped++
        continue
    }

    $dstDir = Join-Path $reasonixSkills $dir.Name
    $dstFile = Join-Path $dstDir "SKILL.md"

    # Create destination dir, copy SKILL.md
    if (-not (Test-Path -LiteralPath $dstDir)) {
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
    }

    Copy-Item -LiteralPath $srcFile -Destination $dstFile -Force
    Write-Host "  [OK] $($dir.Name)" -ForegroundColor Green
    $installed++
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Installed: $installed skill(s)" -ForegroundColor Green
if ($skipped -gt 0) {
    Write-Host "  Skipped: $skipped" -ForegroundColor Yellow
}
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nRestart Reasonix (/new) to load the skills.`n" -ForegroundColor White
