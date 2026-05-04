@echo off
title NEON TERMINAL // SYSTEM CONTROL PANEL
color 0A

:menu
cls
echo ======================================
echo        NEON SYSTEM CONTROL PANEL
echo ======================================
echo.
echo   [1] System Information
echo   [2] Network Test (Ping Google)
echo   [3] Open Important Folders
echo   [4] Launch Website
echo   [5] Clean Temp Files
echo   [6] Exit
echo.
echo ======================================
set /p choice=Select option: 

if "%choice%"=="1" goto sysinfo
if "%choice%"=="2" goto network
if "%choice%"=="3" goto folders
if "%choice%"=="4" goto site
if "%choice%"=="5" goto clean
if "%choice%"=="6" exit

goto menu

:sysinfo
cls
echo ===== SYSTEM INFORMATION =====
systeminfo | findstr /C:"OS Name" /C:"OS Version" /C:"System Type"
echo.
pause
goto menu

:network
cls
echo ===== NETWORK TEST =====
echo Pinging Google DNS...
ping 8.8.8.8 -n 4
echo.
pause
goto menu

:folders
cls
echo Opening system folders...
start "" "%USERPROFILE%\Desktop"
start "" "%USERPROFILE%\Documents"
start "" "%USERPROFILE%\Downloads"
echo Done.
timeout /t 2 >nul
goto menu

:site
cls
echo Launching Microsoft Edge...
start "" "msedge.exe" "https://example.com"
goto menu

:clean
cls
echo Cleaning temporary files...
del /q /f /s %TEMP%\*
echo TEMP folder cleaned (some files may be in use).
echo.
pause
goto menu