# Télécharge le moteur MediaPipe + les modèles dans web/vendor/mediapipe pour un fonctionnement 100 % hors-ligne
# (utile avant de construire l'APK Android). Usage : .\scripts\fetch-offline-assets.ps1
$ver = "0.10.14"
$out = Join-Path $PSScriptRoot "..\web\vendor\mediapipe"
New-Item -ItemType Directory -Force "$out\wasm" | Out-Null
$cdn = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@$ver"
$files = @{
  "$cdn/vision_bundle.mjs" = "$out\vision_bundle.mjs"
  "$cdn/wasm/vision_wasm_internal.js" = "$out\wasm\vision_wasm_internal.js"
  "$cdn/wasm/vision_wasm_internal.wasm" = "$out\wasm\vision_wasm_internal.wasm"
  "$cdn/wasm/vision_wasm_nosimd_internal.js" = "$out\wasm\vision_wasm_nosimd_internal.js"
  "$cdn/wasm/vision_wasm_nosimd_internal.wasm" = "$out\wasm\vision_wasm_nosimd_internal.wasm"
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/1/pose_landmarker_full.task" = "$out\pose_landmarker_full.task"
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task" = "$out\pose_landmarker_heavy.task"
}
foreach ($u in $files.Keys) {
  Write-Host "-> $u"
  Invoke-WebRequest -Uri $u -OutFile $files[$u] -UseBasicParsing
}
Write-Host "OK : fichiers dans $out"
