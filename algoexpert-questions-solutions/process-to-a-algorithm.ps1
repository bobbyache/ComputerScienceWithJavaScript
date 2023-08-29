
<# -------------------------------------------------------------------------------
Run this script after you have run process-question-list
It will create the lookup file you'll need to quickly process the details.
------------------------------------------------------------------------------- #>

$QuestionId = "a-algorithm"

$scriptFolder = $PSScriptRoot

$solutionsPath = Join-Path $scriptFolder ("./Solutions/algorithm-a-algorithm-solutions.json")
$solutionsJson = Get-Content $solutionsPath -Raw | ConvertFrom-Json

$languages = @(
    "cpp",
    "csharp",
    "go",
    "java",
    "javascript",
    "kotlin",
    "swift",
    "python",
    "typescript"
)

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
    $solutionCounter = 0

    foreach ($solution in $solutionsJson.resources.$language.solutions) {
        $solutionCounter++
        $line += "### Solution $solutionCounter ($language)`n"

        $line += "``````$language`n"
        $line += "$solution`n"
        $line += "```````n"
    }
}

$line | Out-File -FilePath "./Solutions/algorithm-$QuestionId.md"