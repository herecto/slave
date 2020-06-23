#include <iostream>
#include <windows.h>
#include <tchar.h>
using namespace std;
int main ()
{
  HKEY hPrimaryKey = HKEY_LOCAL_MACHINE;
	TCHAR *lpSubKey = _T("Software\\Microsoft\\Windows\\CurrentVersion\\Run");
	HKEY hKey;
	DWORD dwDisposition = REG_OPENED_EXISTING_KEY;
	LONG lRet = RegCreateKeyEx(
		hPrimaryKey,
		lpSubKey,
		0,
		0,
		REG_OPTION_NON_VOLATILE,
		KEY_ALL_ACCESS,
		0,
		&hKey,
		&dwDisposition);
	if (lRet != ERROR_SUCCESS)
	{
		return 0;
	}
	//TCHAR 
	TCHAR strFilePath[500];
	GetModuleFileName(0, strFilePath, 500);
	lRet = RegSetValueEx(
		hKey,
		_T("SelfRunDemo"),
		0,
		REG_SZ,
		(BYTE*)strFilePath,
		lstrlen(strFilePath)*sizeof(TCHAR));
	if (lRet == ERROR_SUCCESS)
	{
		MessageBox(0, _T("已加入自启动"), _T("JW"),0);
	}
	RegCloseKey(hKey);
  return 0;
}
