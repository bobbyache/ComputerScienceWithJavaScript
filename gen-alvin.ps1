
# Generate alvin problem-solution files

$scriptLocation = Get-Location
$qik = Join-Path -Path $scriptLocation -ChildPath "\alvin\_qik\gen.json"
QikConsole gen simple -f $qik
