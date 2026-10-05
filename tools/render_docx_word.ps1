param(
    [Parameter(Mandatory = $true)][string]$DocxPath,
    [Parameter(Mandatory = $true)][string]$OutputDir,
    [Parameter(Mandatory = $true)][string]$PdfToPpm
)

$ErrorActionPreference = 'Stop'
$docx = (Resolve-Path -LiteralPath $DocxPath).Path
$out = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputDir))
[System.IO.Directory]::CreateDirectory($out) | Out-Null
$pdf = Join-Path $out (([System.IO.Path]::GetFileNameWithoutExtension($docx)) + '.pdf')

$word = $null
$doc = $null
try {
    Write-Output "WORD_START $docx"
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    Write-Output "WORD_OPEN"
    $doc = $word.Documents.Open($docx, $false, $true)
    Write-Output "WORD_EXPORT $pdf"
    $doc.SaveAs2($pdf, 17)
    Write-Output "WORD_EXPORT_DONE"
}
finally {
    Write-Output "WORD_CLEANUP"
    if ($doc -ne $null) { $doc.Close($false) | Out-Null }
    if ($word -ne $null) { $word.Quit() | Out-Null }
    if ($doc -ne $null) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null }
    if ($word -ne $null) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}

& $PdfToPpm -png -r 144 $pdf (Join-Path $out 'page')
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Get-ChildItem -LiteralPath $out -Filter 'page-*.png' | Select-Object -ExpandProperty FullName
