# Script para atualizar todos os imports de @/constants/rainer-design-tokens para @rainersoft/rainer-design-tokens

Write-Host "Atualizando imports para usar @rainersoft/rainer-design-tokens..." -ForegroundColor Cyan

$files = Get-ChildItem -Recurse -Include *.ts,*.tsx -Path app,components,lib,constants -Exclude *OLD*,*test*,*.spec.ts,*.test.ts

$updated = 0
$errors = @()

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
        
        if ($content -match '@/constants/rainer-design-tokens') {
            $newContent = $content -replace '@/constants/rainer-design-tokens', '@rainersoft/rainer-design-tokens'
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "Updated: $($file.Name)" -ForegroundColor Green
            $updated++
        }
    }
    catch {
        $errors += "$($file.Name): $_"
        Write-Host "Error: $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Atualizacao concluida!" -ForegroundColor Green
Write-Host "Arquivos atualizados: $updated" -ForegroundColor Cyan

if ($errors.Count -gt 0) {
    Write-Host ""
    Write-Host "Erros encontrados:" -ForegroundColor Red
    $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
