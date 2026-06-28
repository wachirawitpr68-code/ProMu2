Add-Type -AssemblyName System.Drawing
$images = @('sword.png', 'helmet.png', 'gloves.png', 'boots.png', 'chest.png')
foreach ($imgName in $images) {
    $path = "dungeon-item-sorter\public\assets\$imgName"
    if (Test-Path $path) {
        $bmp = [System.Drawing.Image]::FromFile($path)
        $new = New-Object System.Drawing.Bitmap(128, 128)
        $g = [System.Drawing.Graphics]::FromImage($new)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($bmp, 0, 0, 128, 128)
        $g.Dispose()
        $bmp.Dispose()
        
        $newPath = $path + ".new.png"
        $new.Save($newPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $new.Dispose()
        
        Remove-Item $path
        Rename-Item $newPath $imgName
    }
}
