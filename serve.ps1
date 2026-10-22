# Petit serveur statique local (Windows PowerShell, sans dépendance) : .\serve.ps1 [-Port 8080]
param([int]$Port = 8080, [string]$Root = (Join-Path $PSScriptRoot "web"))
$mime = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript; charset=utf-8"; ".mjs"="text/javascript; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".json"="application/json"; ".webmanifest"="application/manifest+json"; ".svg"="image/svg+xml"; ".png"="image/png"; ".ico"="image/x-icon" }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "Tennis Coach IA -> http://localhost:$Port/  (Ctrl+C pour arrêter)"
while ($l.IsListening) {
  $c = $l.GetContext()
  try {
    $p = [Uri]::UnescapeDataString($c.Request.Url.AbsolutePath.TrimStart("/"))
    if ($p -eq "") { $p = "index.html" }
    $f = [IO.Path]::GetFullPath((Join-Path $Root $p))
    if ($f.StartsWith($Root) -and (Test-Path $f -PathType Leaf)) {
      $b = [IO.File]::ReadAllBytes($f)
      $c.Response.ContentType = $mime[[IO.Path]::GetExtension($f).ToLower()]
      $c.Response.OutputStream.Write($b, 0, $b.Length)
    } else { $c.Response.StatusCode = 404 }
  } catch { $c.Response.StatusCode = 500 }
  $c.Response.Close()
}
