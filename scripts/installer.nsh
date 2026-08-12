; Close an already-running copy before NSIS replaces its files.
; The process name comes from productName in package.json.
!macro customInit
  DetailPrint 'm72b installer: customInit started'
  DetailPrint 'm72b installer: install directory is $INSTDIR'
  DetailPrint 'm72b installer: attempting to close m72b file formatter.exe'
  nsExec::ExecToLog 'taskkill /F /IM "m72b file formatter.exe"'
  Pop $0
  DetailPrint 'm72b installer: taskkill result is $0'
  Sleep 500
  DetailPrint 'm72b installer: customInit completed'
!macroend

; Some early builds may have a stale/broken uninstaller entry. If its
; uninstaller returns an error, continue with the upgrade after closing the
; process above; the new package will replace the application files.
!macro customUnInstallCheck
  DetailPrint 'm72b installer: old uninstaller returned $R0; continuing with repair upgrade'
  ClearErrors
!macroend

!macro customUnInstallCheckCurrentUser
  DetailPrint 'm72b installer: current-user old uninstaller returned $R0; continuing with repair upgrade'
  ClearErrors
!macroend
