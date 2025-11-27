param(
  [string]$BaseUrl = "http://localhost:3000",
  [string]$Email = "free_user@example.com",
  [string]$Password = "Passw0rd!",
  [string]$FullName = "Nguyen Van A",
  [string]$BirthDate = "1990-01-01"
)

Write-Host "[E2E] Starting Free vs Premium gating test against $BaseUrl" -ForegroundColor Cyan

# 1) Register (ignore if exists)
try {
  $regBody = @{ name = "Test Free"; email = $Email; password = $Password } | ConvertTo-Json
  $reg = Invoke-WebRequest -Uri "$BaseUrl/api/auth/register" -Method Post -ContentType "application/json" -Body $regBody -ErrorAction Stop
  Write-Host "[E2E] Registered user $Email (status $($reg.StatusCode))" -ForegroundColor Green
} catch {
  Write-Host "[E2E] Register may already exist; continuing..." -ForegroundColor Yellow
}

# 2) Get CSRF and login using a persistent web session
$csrfResp = Invoke-WebRequest -Uri "$BaseUrl/api/auth/csrf" -SessionVariable s -ErrorAction Stop
$csrf = (ConvertFrom-Json $csrfResp.Content).csrfToken
if (-not $csrf) { throw "Failed to fetch CSRF token" }
Write-Host "[E2E] CSRF token acquired" -ForegroundColor Green

$form = "csrfToken=$csrf&callbackUrl=%2F&json=true&email=$([uri]::EscapeDataString($Email))&password=$([uri]::EscapeDataString($Password))"
$login = Invoke-WebRequest -Uri "$BaseUrl/api/auth/callback/credentials" -Method Post -ContentType "application/x-www-form-urlencoded" -Body $form -WebSession $s -MaximumRedirection 0 -ErrorAction SilentlyContinue

# Verify cookie presence
$cookieHost = [Uri]$BaseUrl
$cookies = $s.Cookies.GetCookies($cookieHost)
if ($cookies.Count -eq 0) { throw "Login failed: no session cookies captured" }
Write-Host "[E2E] Logged in. Cookies stored: $($cookies.Count)" -ForegroundColor Green

# 3) Call Numerology 4 times; expect 4th = 429 for Free
$body = @{ fullName = $FullName; birthDate = $BirthDate } | ConvertTo-Json
$statuses = @()
for ($i=1; $i -le 4; $i++) {
  try {
    $resp = Invoke-WebRequest -Uri "$BaseUrl/api/numerology" -Method Post -ContentType "application/json" -WebSession $s -Body $body -ErrorAction Stop
    $statuses += $resp.StatusCode
    Write-Host "[E2E] Numerology call #$i => $($resp.StatusCode)" -ForegroundColor Gray
  } catch {
    $errResp = $_.Exception.Response
    if ($errResp) {
      $code = [int]$errResp.StatusCode
      $statuses += $code
      Write-Host "[E2E] Numerology call #$i => $code" -ForegroundColor Gray
    } else {
      throw
    }
  }
}

if ($statuses.Count -ne 4) { throw "Unexpected number of responses for numerology" }

$expectFreePass = ($statuses[0] -eq 200 -and $statuses[1] -eq 200 -and $statuses[2] -eq 200 -and $statuses[3] -eq 429)
if ($expectFreePass) {
  Write-Host "[E2E] PASS: Free user limited to 3/day (4th=429)" -ForegroundColor Green
} else {
  Write-Host "[E2E] FAIL: Expected [200,200,200,429], got [$($statuses -join ', ')]" -ForegroundColor Red
}

# 4) Try Premium-only PDF export; expect 402 for Free
$exportBody = @{ fullName = $FullName; birthDate = $BirthDate; readingType = "thansohoc" } | ConvertTo-Json
try {
  $pdfResp = Invoke-WebRequest -Uri "$BaseUrl/api/export-pdf" -Method Post -ContentType "application/json" -WebSession $s -Body $exportBody -ErrorAction Stop
  $pdfCode = $pdfResp.StatusCode
} catch {
  $pdfCode = [int]$_.Exception.Response.StatusCode
}

if ($pdfCode -eq 402) {
  Write-Host "[E2E] PASS: Free user blocked from PDF export (402)" -ForegroundColor Green
} else {
  Write-Host "[E2E] FAIL: Expected 402 for PDF export, got $pdfCode" -ForegroundColor Red
}

Write-Host "[E2E] Done." -ForegroundColor Cyan
