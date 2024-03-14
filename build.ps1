Write-Host "Preparing the environment"
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue .\out
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue .\build

Write-Host "Building the application"
npm install
npm run make

$file = Get-ChildItem -Path .\out\make -Filter *.zip -Recurse -File | Select-Object FullName, Name

if ($file -ne $null) {
    Write-Host "File: $($file.FullName)"
    New-Item -ItemType Directory -ErrorAction SilentlyContinue -Path .\build
    Copy-Item -Path $file.FullName -Destination .\build -Force
    Expand-Archive -Path $file.FullName -DestinationPath .\build -Force
    Remove-Item -Path $file.Name -Force -ErrorAction SilentlyContinue
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue  .\out

    Write-Host ""
    Write-Host "Completed, grab your application from the build folder."
    exit 0
}

Write-Host "Something went wrong :("
exit 1