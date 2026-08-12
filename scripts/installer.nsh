; Close an already-running copy before NSIS replaces its files.
!macro customInit
  DetailPrint 'm72b installer: install directory is $INSTDIR'
  DetailPrint 'm72b installer: closing the existing app if it is running'
  nsExec::ExecToLog 'taskkill /F /IM "m72b file formatter.exe"'
  Pop $0
  DetailPrint 'm72b installer: taskkill result is $0'
  Sleep 500
!macroend

; Recover from stale uninstall entries left by early builds.
!macro customUnInstallCheck
  DetailPrint 'm72b installer: old uninstaller returned $R0; continuing upgrade'
  ClearErrors
!macroend

!macro customUnInstallCheckCurrentUser
  DetailPrint 'm72b installer: current-user uninstaller returned $R0; continuing upgrade'
  ClearErrors
!macroend
