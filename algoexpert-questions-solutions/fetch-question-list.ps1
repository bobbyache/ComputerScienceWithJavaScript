$token = "eyJhbGciOiJIUzI1"
$outputFilePath = ".\data\question-urls-list.json"

Write-Host "Output file path: $outputFilePath"


$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"

$response = Invoke-WebRequest -UseBasicParsing -Uri "https://prod.api.algoexpert.io/api/problems/v1/algoexpert/coding-questions/list" `
-Method "POST" `
-WebSession $session `
-Headers @{
    "authority"="prod.api.algoexpert.io"
    "method"="POST"
    "path"="/api/problems/v1/algoexpert/coding-questions/list"
    "scheme"="https"
    "accept"="application/json, text/plain, */*"
    "accept-encoding"="gzip, deflate, br"
    "accept-language"="en-US,en;q=0.9"
    "authorization"="$token"
    "origin"="https://www.algoexpert.io"
    "referer"="https://www.algoexpert.io/"
    "sec-ch-ua"="`"Chromium`";v=`"112`", `"Google Chrome`";v=`"112`", `"Not:A-Brand`";v=`"99`""
    "sec-ch-ua-mobile"="?0"
    "sec-ch-ua-platform"="`"Windows`""
    "sec-fetch-dest"="empty"
    "sec-fetch-mode"="cors"
    "sec-fetch-site"="same-site"
}

if ($response.StatusCode -eq 200) { # Check if the request was successful
$response.Content | Out-File -FilePath $outputFilePath # Write the contents to the output file
    Write-Host "Contents written to file: " $outputFilePath
} else {
    Write-Host "Error fetching resource. Status code: $($response.StatusCode)"
}
