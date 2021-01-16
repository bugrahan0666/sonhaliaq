echo off
cls
:a
title ( ACAR ) Management v12 (New)
echo (~ ACAR ~) Bot Aktif Edildi! acar-log.txt dosyasindan kontrol edebilirsiniz.
node acar.js > acar-log.txt 2> acar-error.txt
goto a