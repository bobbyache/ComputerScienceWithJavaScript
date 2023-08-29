param (
    [string]$QuestionId,
    [string]$Token
)

# Check if output folder exists and if not, create it
$folderPath = ".\Solutions\"

if (-not (Test-Path $folderPath -PathType Container)) {
    New-Item -ItemType Directory -Path $folderPath | Out-Null
    Write-Host "Folder created: $folderPath"
}

# Build up the file path
$filePath = Join-Path -Path $folderPath -ChildPath "algorithm-$QuestionId-problem-definition.json"

# Set the payload body JSON
$bodyName = "{`"name`":`"" + $QuestionId + "`"}" 

# Add the session cookies
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.217384799.1681629640", "/", ".algoexpert.io")))
$session.Cookies.Add((New-Object System.Net.Cookie("_gid", "GA1.2.1100096992.1682065893", "/", ".algoexpert.io")))
$session.Cookies.Add((New-Object System.Net.Cookie("token2", "$Token", "/", "www.algoexpert.io")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.1.1996588309.1681629640", "/", ".algoexpert.io")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_4K96J2M1TM", "GS1.1.1682084343.6.1.1682084412.60.0.0", "/", ".algoexpert.io")))
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"

# Fetch the JSON Resource
$response =  Invoke-WebRequest -UseBasicParsing -Uri "https://prod.api.algoexpert.io/api/problems/v1/algoexpert/coding-questions/get" `
-Method "POST" `
-WebSession $session `
-Headers @{
"authority"="prod.api.algoexpert.io"
  "method"="POST"
  "path"="/api/problems/v1/algoexpert/coding-questions/get"
  "scheme"="https"
  "accept"="application/json, text/plain, */*"
  "accept-encoding"="gzip, deflate, br"
  "accept-language"="en-US,en;q=0.9"
  "authorization"="$Token"
  "origin"="https://www.algoexpert.io"
  "referer"="https://www.algoexpert.io/"
  "sec-ch-ua"="`"Chromium`";v=`"112`", `"Google Chrome`";v=`"112`", `"Not:A-Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
  "sec-fetch-dest"="empty"
  "sec-fetch-mode"="cors"
  "sec-fetch-site"="same-site"
} `
-ContentType "application/json" `
-Body $bodyName

# Write out the file
if ($response.StatusCode -eq 200) {
    $response.Content | Out-File -FilePath $filePath
} else {
    Write-Host "Error fetching resource. Status code: $($response.StatusCode)"
}