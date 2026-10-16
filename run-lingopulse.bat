@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if not errorlevel 1 goto use_node

where py >nul 2>&1
if not errorlevel 1 goto use_py

where python >nul 2>&1
if not errorlevel 1 goto use_python

echo Python 3 nao foi encontrado. Instale o Python 3 para iniciar o LingoPulse.
pause
exit /b 1

:use_py
py -3 serve.py
goto finished

:use_node
node serve.mjs
goto finished

:use_python
python serve.py

:finished
exit /b %ERRORLEVEL%
