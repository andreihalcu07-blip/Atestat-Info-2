# Download media used by history chapters into pages/history/media/
# Run this from the repository root or from the pages/history folder.

$target = Join-Path -Path $PSScriptRoot -ChildPath "media"
if (-not (Test-Path $target)) { New-Item -ItemType Directory -Path $target | Out-Null }

$files = @(
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Classic_shot_of_the_ENIAC.jpg'; name = 'Classic_shot_of_the_ENIAC.jpg' },
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Hollerith_punched_card.jpg'; name = 'Hollerith_punched_card.jpg' },
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Human_computer_with_IBM_704_in_1959.jpg'; name = 'Human_computer_with_IBM_704_in_1959.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/b/b5/IBM_System_360_model_30_profile.agr.jpg'; name = 'IBM_System_360_model_30_profile.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/IBM_System_360_Model_40_with_open_gates.jpg'; name = 'IBM_System_360_Model_40.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/8/84/IBM_System_360_%284358133497%29.jpg'; name = 'IBM_System_360_4358133497.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Ken_Thompson_and_Dennis_Ritchie--1973.jpg'; name = 'Ken_Thompson_and_Dennis_Ritchie_1973.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/6/61/PDP-11-40.jpg'; name = 'PDP-11-40.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Pdp-11-40.jpg'; name = 'Pdp-11-40.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Three_different_%28coloured%29_minicomputers_from_DEC_%28late_1960s_to_early_1970s%29_in_a_museum_-_a_PDP-11%2C_a_PDP-8e%2C_and_a_PDP-12.jpg'; name = 'DEC_PDPs.jpg' }
    # Chapter 4 additions (personal computer era)
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Xerox_Alto.jpg'; name = 'Xerox_Alto.jpg' }
    ,@{ url = 'https://archive.org/download/computer-macintosh-128k-1984-all-about-apple-onlus/Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg'; name = 'Computer_macintosh_128k.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/IBM_PC_5150.jpg'; name = 'IBM_PC_5150.jpg' }
    ,@{ url = 'https://archive.org/download/IBMPCModel5150GuideToOperations/__ia_thumb.jpg'; name = 'IBM_PC_5150_thumb.jpg' }
    # Chapter 5: Linux / Open Source
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg'; name = 'Tux.svg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg'; name = 'Linus_Torvalds_cropped.jpg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Kernel.org_screenshot.png'; name = 'Kernel_org_screenshot.png' }
    # Chapter 6: Modern OS / Mobile & Cloud
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg'; name = 'Android_robot.svg' }
    ,@{ url = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/BalticServers_data_center.jpg'; name = 'BalticServers_data_center.jpg' }
)

foreach ($f in $files) {
    $out = Join-Path $target $f.name
    Write-Host "Downloading $($f.url) -> $out"
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add('user-agent','Mozilla/5.0 (Windows NT; Win64; x64)')
        $wc.DownloadFile($f.url, $out)
        Write-Host "Saved $($f.name)"
    } catch {
        Write-Warning "Failed to download $($f.url): $_"
        # Try Invoke-WebRequest as a fallback with redirection enabled
        try {
            Invoke-WebRequest -Uri $f.url -OutFile $out -UseBasicParsing -MaximumRedirection 10 -Headers @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT; Win64; x64)' } -ErrorAction Stop
            Write-Host "Saved (fallback) $($f.name)"
        } catch {
            Write-Warning "Fallback also failed for $($f.url): $_"
        }
    }
}

Write-Host "Done. Files (if downloaded) are in: $target" -ForegroundColor Green

# Additional higher-resolution fallbacks and optional video downloads
$extraFiles = @(
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/IBM_PC_5150.jpg/1200px-IBM_PC_5150.jpg'; name = 'IBM_PC_5150_highres.jpg' },
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Pdp-11-40.jpg/1200px-Pdp-11-40.jpg'; name = 'Pdp-11-40_highres.jpg' },
    @{ url = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg'; name = 'Computer_macintosh_128k_highres.jpg' }
)

foreach ($f in $extraFiles) {
    $out = Join-Path $target $f.name
    if (-not (Test-Path $out)) {
        Write-Host "Downloading fallback $($f.url) -> $out"
        try {
            $wc = New-Object System.Net.WebClient
            $wc.Headers.Add('user-agent','Mozilla/5.0 (Windows NT; Win64; x64)')
            $wc.DownloadFile($f.url, $out)
            Write-Host "Saved $($f.name)"
        } catch {
            Write-Warning "Failed to download fallback $($f.url): $_"
        }
    } else { Write-Host "$($f.name) already exists, skipping" }
}

# Optional video download using yt-dlp (if installed). Creates pages/history/media/videos/
$videoDir = Join-Path $target "videos"
if (-not (Test-Path $videoDir)) { New-Item -ItemType Directory -Path $videoDir | Out-Null }

$videos = @(
    @{ url = 'https://www.youtube.com/watch?v=K4mYk1kO5Yg'; name = 'unix_history' },
    @{ url = 'https://www.youtube.com/watch?v=2B-XwPjn9YY'; name = 'macintosh_history' },
    @{ url = 'https://www.youtube.com/watch?v=CMX3wD0q7wI'; name = 'cloud_overview' },
    @{ url = 'https://www.youtube.com/watch?v=FV3v3D6qQvQ'; name = 'linux_history' }
)

function Download-Video($v) {
    $outTemplate = Join-Path $videoDir "${($v.name)}.%(ext)s"
    if (Get-Command yt-dlp -ErrorAction SilentlyContinue) {
        Write-Host "Downloading video $($v.url) -> $outTemplate"
        & yt-dlp -f best -o $outTemplate $v.url
    } else {
        Write-Warning 'yt-dlp not found in PATH — skipping video downloads. To enable, install yt-dlp (https://github.com/yt-dlp/yt-dlp)'
    }
}

foreach ($v in $videos) { Download-Video $v }
