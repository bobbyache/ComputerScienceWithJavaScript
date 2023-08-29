param (
    [string]$QuestionId,
    [string]$Token,
    [boolean]$Premium,
    [string]$FileName
)



# Check if output folder exists and if not, create it
$folderPath = ".\Solutions\"

if (-not (Test-Path $folderPath -PathType Container)) {
    New-Item -ItemType Directory -Path $folderPath | Out-Null
    Write-Host "Folder created: $folderPath"
}

# Build up the file path
$filePath = Join-Path -Path $folderPath -ChildPath $FileName
$path = "$QuestionId"
if ($Premium -eq $true) {
    $path = "premium/$QuestionId"
}


$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.1393539365.1678119372", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.1.919930511.1678119374", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("hubspotutk", "b71a780cf98bc04af5e6131c14cc96c3", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("token", "$Token", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("user", "%7B%22authenticated%22%3Atrue%2C%22email%22%3A%22robbie.a.blake%40gmail.com%22%2C%22issuer%22%3A%22https%3A%2F%2Faccounts.google.com%22%2C%22premium%22%3Atrue%7D", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("__hstc", "264420560.b71a780cf98bc04af5e6131c14cc96c3.1678119374110.1682527127956.1682582153800.25", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("__hssrc", "1", "/", ".structy.net")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_ZPENMYMP9W", "GS1.1.1682586137.50.0.1682586137.0.0.0", "/", ".structy.net")))
$response = Invoke-WebRequest -UseBasicParsing -Uri "https://api.structy.net/api/problems/$path" `
-WebSession $session `
-Headers @{
"authority"="api.structy.net"
  "method"="GET"
  "path"="/api/problems/$path"
  "scheme"="https"
  "accept"="*/*"
  "accept-encoding"="gzip, deflate, br"
  "accept-language"="en-US,en;q=0.9"
  "if-none-match"="W/`"3f57-1z9uOpLWkHFBncyQZVGKS10deno`""
  "origin"="https://www.structy.net"
  "referer"="https://www.structy.net/"
  "sec-ch-ua"="`"Chromium`";v=`"112`", `"Google Chrome`";v=`"112`", `"Not:A-Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
  "sec-fetch-dest"="empty"
  "sec-fetch-mode"="cors"
  "sec-fetch-site"="same-site"
} `
-ContentType "application/json"

$response.Content | Out-File -FilePath $filePath
