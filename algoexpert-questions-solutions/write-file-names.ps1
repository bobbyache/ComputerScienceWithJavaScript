
<# -------------------------------------------------------------------------------

------------------------------------------------------------------------------- #>

$jsonFile = ".\data\question-urls-list.json"
$scriptFolder = $PSScriptRoot

$output = Join-Path $scriptFolder "file-names.ps1"

# Read the generated output from the JSON file
$json = Get-Content $jsonFile -Raw | ConvertFrom-Json

$lines = ""

foreach ($question in $json.questions) {
    $fileTitle = "{0} - Level {1} - {2}.mkv" -f $question.category, $question.difficulty, $question.name
    $lines += $fileTitle + "`n"
    # Write-Host $fileTitle
}

$lines | Out-File -FilePath "./data/file-titles.md"

Write-Host "Done processing!"