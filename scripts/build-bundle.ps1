# Assemble les modules ES (web/js/*.js) en UN script classique : web/js/app.bundle.js
# L'application fonctionne ainsi aussi en double-cliquant sur web/index.html (file://), ou les modules ES sont bloques par le navigateur.
# A relancer apres toute modification de web/js/*.js :  .\scripts\build-bundle.ps1
$js = Join-Path $PSScriptRoot "..\web\js"
$order = "knowledge", "metrics", "posefig", "tactics", "coach", "assistant", "pose", "extras", "app"
$out = New-Object System.Text.StringBuilder
[void]$out.AppendLine("// FICHIER GENERE par scripts/build-bundle.ps1 - ne pas modifier a la main.")
foreach ($name in $order) {
  $src = [IO.File]::ReadAllText((Join-Path $js "$name.js"), [Text.Encoding]::UTF8)
  $exports = New-Object System.Collections.Generic.List[string]
  $lines = $src -split "`r?`n"
  $body = New-Object System.Collections.Generic.List[string]
  foreach ($line in $lines) {
    if ($line -match '^import \* as (\w+) from "\./(\w+)\.js";\s*$') { $body.Add("const $($Matches[1]) = __M_$($Matches[2]);"); continue }
    if ($line -match '^import (\{.+\}) from "\./(\w+)\.js";\s*$') { $body.Add("const $($Matches[1]) = __M_$($Matches[2]);"); continue }
    if ($line -match '^export (?:async )?(?:const|let|function|class) ([A-Za-z0-9_$]+)') { $exports.Add($Matches[1]); $line = $line -replace '^export ', '' }
    $body.Add($line)
  }
  [void]$out.AppendLine("const __M_$name = (() => {")
  [void]$out.AppendLine('"use strict";')
  [void]$out.AppendLine(($body -join "`n"))
  if ($exports.Count -gt 0) { [void]$out.AppendLine("return { " + ($exports -join ", ") + " };") }
  [void]$out.AppendLine("})();")
}
$target = Join-Path $js "app.bundle.js"
[IO.File]::WriteAllText($target, $out.ToString(), (New-Object System.Text.UTF8Encoding($false)))
$ko = [math]::Round((Get-Item $target).Length / 1KB)
Write-Host "OK : $target ($ko Ko)"
