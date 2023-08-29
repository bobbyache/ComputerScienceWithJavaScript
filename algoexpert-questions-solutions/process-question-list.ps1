
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

$token = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjdjYmM2ZWRhNzk1ZGM1YzMxZjJmOTk2Yzg0ODRkZTRiMGIxOTgwMmVmOTYwOWE3YzJmNDFmM2E0OTVhYjZmN2MiLCJ0eXAiOiJKV1QifQ.eyJTZXNzaW9uSUQiOiIwM2QxNTA4MS04MDJiLTQyZDktYjY0NS1kMTg1NGMyZjM5Y2QiLCJNZXRhZGF0YSI6eyJwYXJ0aXRpb24iOiJtYWluIiwib2F1dGhfcHJvdmlkZXIiOiJnb29nbGUiLCJvYXV0aF91c2VyX2lkIjoiMTExMTI5NTgwODg2MDIzODM2Nzk0IiwiZW1haWwiOiJyb2JiaWUuYS5ibGFrZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IiIsIm5hbWUiOiJSb2IgQmxha2UiLCJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YWRXXzBrMWs0aHZqY2p0d21ncUJRVDFOb0hPbmM3NU11bG5URHdUQT1zOTYtYyIsInJlZ2lvbiI6IlpBIiwicm9sZXMiOiJwcmVtaXVtdjEsZnJvbnRlbmRleHBlcnR2MSxtbGV4cGVydHYxLHN5c3RlbXNleHBlcnR2MSx1c2VyIn0sIkdlbmVyaWNNZXRhIjp7fSwiZXhwIjoxNjgzNDQ4MjkxLCJqdGkiOiJiODFiN2IzNy03NzZlLTRjNjktYWYxNy1jM2VkMjEzZWQ5NTQiLCJpYXQiOjE2ODIyMzg2OTEsImlzcyI6ImFsZ29leHBlcnQiLCJzdWIiOiJnb29nbGV8OWRkZTdkYzItNzhlNy00NDMzLTlkYmQtOTE0MTBiNzE0NGQ2In0.kdVIhYfcy13-myJxORdueMEFY2cDkeUIn7VZd7FXNac"
$jsonFile = ".\data\question-urls-list.json"
$scriptFolder = $PSScriptRoot

$problemDefinitionFilePath = Join-Path $scriptFolder "process-problem-definition.ps1"
$problemSolutionsFilePath = Join-Path $scriptFolder "process-problem-solutions.ps1"

# Used for the random processing delay
$delayMin = 1
$delayMax = 10

# Read the generated output from the JSON file
$json = Get-Content $jsonFile -Raw | ConvertFrom-Json

# Used to calculate percentage completed
$total = $json.questions.Count
$processed = 0

foreach ($question in $json.questions) {

    try {
        # Delay before processing
        $delaySeconds = Get-Random -Minimum $delayMin -Maximum $delayMax
        Start-Sleep -Seconds $delaySeconds
        
        # Process this URL with the provided token
        & $problemDefinitionFilePath -QuestionId $question.uid -Token $token
        & $problemSolutionsFilePath -QuestionId $question.uid -Token $token

        # Increment the script's progress through the list
        $processed++
        $percentageDone = [int]($processed / $total * 100)

        Write-Host "Processed... " + $question.uid + " $percentageDone% ($delaySeconds seconds)"
    
        # Check if the C key is pressed, and break out of the loop if it is
        if ([System.Console]::KeyAvailable) {
            $key = [System.Console]::ReadKey($true)
            if ($key.Key -eq "C" -or $key.Key -eq "c") {
                break
            }
        }
    } catch {
        # Display the error message
        Write-Host "An error occurred: $($Error[0].Exception.Message)"

        # Prompt the user to continue or not
        $choice = Read-Host "Do you want to continue with the next URL? (Y/N)"
        if ($choice -ne "Y" -and $choice -ne "y") {
            break
        }
    }
}

Write-Host "Done processing!"