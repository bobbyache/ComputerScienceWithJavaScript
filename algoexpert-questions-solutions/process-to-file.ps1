
<# -------------------------------------------------------------------------------
Run this script after you have run process-question-list
It will create the lookup file you'll need to quickly process the details.
------------------------------------------------------------------------------- #>

param (
    [string]$QuestionId
)

$scriptFolder = $PSScriptRoot

# $jsonFile = ".\data\question-urls-list.json"
# # $filePath = Join-Path $scriptFolder "question-lookup-dictionary.txt"

# # Read the generated output from the JSON file
# $json = Get-Content $jsonFile -Raw | ConvertFrom-Json

# $question = $json.questions[0];

$definitionPath = Join-Path $scriptFolder ("./Solutions/algorithm-" + $QuestionId + "-problem-definition.json")
$solutionsPath = Join-Path $scriptFolder ("./Solutions/algorithm-" + $QuestionId + "-solutions.json")
        
$definitionJson = Get-Content $definitionPath -Raw | ConvertFrom-Json
$solutionsJson = Get-Content $solutionsPath -Raw | ConvertFrom-Json

$languages = $definitionJson.languagesSupported

# if (Test-Path ./test.md) {
#     # Delete the file
#     Remove-Item ./test.md
# }

$line = "# " + $solutionsJson.name +"`n"
$line += $solutionsJson.prompt + "`n`n"

$hintCounter = 0
foreach ($hint in $solutionsJson.hints) {
    $hintCounter++
    $line += "Hint $hintCounter`n$hint`n`n"
}
$line += "---`n"



$line += "## Solutions`n"


foreach ($language in $languages) {

    $line += "### Sandbox Code ($language)`n"
    $line += "``````$language`n"
    $sandboxCode = $solutionsJson.resources.$language.sandboxCode
    $line += $sandboxCode + "`n"
    $line += "```````n"
    
    $solutionCounter = 0

    foreach ($solution in $solutionsJson.resources.$language.solutions) {
        $solutionCounter++
        $line += "### Solution $solutionCounter ($language)`n"

        $line += "``````$language`n"
        $line += "$solution`n"
        $line += "```````n"
    }


    $unitTestCounter = 0

    foreach ($unitTest in $solutionsJson.resources.$language.unitTests) {
        $unitTestCounter++
        $line += "### Unit Tests $unitTestCounter ($language)`n"

        $line += "``````$language`n"
        $line += "$unitTest`n"
        $line += "```````n"
    }
}

$line | Out-File -FilePath "./Solutions/algorithm-$QuestionId.md"