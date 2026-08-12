param(
  [Parameter(Mandatory = $true)]
  [string]$Installer
)

$installerPath = (Resolve-Path -LiteralPath $Installer).Path
$logPath = Join-Path $env:TEMP 'm72b-file-formatter-installer.log'
Write-Host "Starting installer with logging enabled."
Write-Host "Log file: $logPath"
Start-Process -FilePath $installerPath -ArgumentList "/LOG=$logPath" -Wait
Write-Host "Installer finished. Review the log above at: $logPath"
