
<# -------------------------------------------------------------------------------
Once you have the question list (question-urls-list.json) you can use this script
to capture all the information you need.

- Log into AlgoExpert
- Get hold of the token
- Set your delay
- Start processing

The script will end up calling process-problem-definition.ps1 and
aprocess-problem-definition.ps1 and the result will be a sub folder "Solutions"
populated with both definition and solution files for each question.

The only one you couldn't get with this was the a*-algorithm. You had to get it
manually.
------------------------------------------------------------------------------- #>

$token = "eyJhbGciOiJIUzI1N"
$jsonFile = ".\data\question-urls-list.json"
$scriptFolder = $PSScriptRoot

$problemFilePath = Join-Path $scriptFolder "process-problem.ps1"
#$problemSolutionsFilePath = Join-Path $scriptFolder "process-problem-solutions.ps1"

# Used for the random processing delay
$delayMin = 1
$delayMax = 10

# Read the generated output from the JSON file
$json = Get-Content $jsonFile -Raw | ConvertFrom-Json

# Used to calculate percentage completed
$total = $json.questions.Count
$processed = 0

foreach ($question in $json) {

    try {
        # Delay before processing
        $delaySeconds = Get-Random -Minimum $delayMin -Maximum $delayMax
        Start-Sleep -Seconds $delaySeconds
        
        $fileName = $question.module + " - " + $question.name + ".json"
        
        # Process this URL with the provided token
        & $problemFilePath -QuestionId $question.slug -Token $token -Premium $question.premium -FileName $fileName

        # Increment the script's progress through the list
        $processed++
        $percentageDone = [int]($processed / $total * 100)

        Write-Host ("Processed... " + $question.module + " - " + $question.name + " $percentageDone% ($delaySeconds seconds)")
    
        # Check if the C key is pressed, and break out of the loop if it is
        if ([System.Console]::KeyAvailable) {
            $key = [System.Console]::ReadKey($true)
            if ($key.Key -eq "C" -or $key.Key -eq "c") {
                break
            }
        }
    } catch {
        # Display the error message
        # Write-Host ("Processed... " + $question.module + " - " + $question.name + " $percentageDone% ($delaySeconds seconds)")
        Write-Host "An error occurred: $($Error[0].Exception.Message)"
    }
}

Write-Host "Done processing!"