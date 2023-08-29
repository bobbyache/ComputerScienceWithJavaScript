
<# -------------------------------------------------------------------------------
Run this script after you have run process-question-list
It will create the lookup file you'll need to quickly process the details.
------------------------------------------------------------------------------- #>

$jsonFile = ".\data\question-urls-list.json"
$scriptFolder = $PSScriptRoot
# $filePath = Join-Path $scriptFolder "question-lookup-dictionary.txt"

# Read the generated output from the JSON file
$json = Get-Content $jsonFile -Raw | ConvertFrom-Json

foreach ($question in $json.questions) {
    & ".\process-to-file.ps1" -QuestionId $question.uid
}
