export default {
  id: "20200118-prevent-windows-auto-restart",
  date: "2020-01-18",
  title: "Prevent Windows from automatically updating and restarting",
  body: `
Windows security is no joke. UNIX-based systems have stronger intrinsic security, yet you still want to keep frequently-updated for security reasons; all the more for Windows whose security is garbage. Nonetheless, sometimes you don't want auto-update & auto-restart. Eg, I have long-running machine learning jobs spanning multiple days. To do ML on Windows, you want WSL2 which requires the dev-channel, which has your system updating every couple days. This has caused a _lot_ of heart-ache for me, due to how aggressively Windows decides to update and restart, crashing all your running programs. And there's no setting, no matter how deep into advanced configuration you go, for disabling this feature.

There's a hack. Taken from [answers.microsoft.com](https://answers.microsoft.com/en-us/windows/forum/windows_10-other_settings/disable-windows-10-automatic-restart-after-updates/16f1826d-a796-4de8-ac99-1d625420d265?page=11), you configure a setting in RegEdit.

1. Click Start > type "Registry Editor" and click that
1. Navigate to \`\\HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\`
1. For some, there might already be a \`\\WindowsUpdate\\AU\` key. There wasn't for me, so I had to create that path. Right-click "Windows" > New > Key > "WindowsUpdate" > Save. Within that, New > Key > AU
1. Right-click in AU > New > DWORD (32-bit) value > "AUOptions" > Save
1. Right click AUOptions > Modify > Value data: 2 > OK. That is, set the value to 2; doesn't matter if Hex or Decimal, but I'm using Hex for what it's worth. 
`
}