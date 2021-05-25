

rem Create working directory for cmake
mkdir "%~dp0.build"

rem Generate project with cmake
cd "%~dp0.build"
call cmake -G "Visual Studio 16 2019" -A x64 "%~dp0"
