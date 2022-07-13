### WebPod.io 
- is a web system builder, it has the ability to create custom digital systems.
- can also be used as a headless CMS
- has CMS features
- has multi user management feature.
- uses postgreSQL as its primary database
- uses Nuxt.js and Vue2

### Running WebPod.io in Windows OS

1. **Enable WSL (Windows Subsystem for linux)** in start menu search for `turn windows features on and off`, then scroll down to bottom and enable WSL

2. **Install Ubuntu Distro** open Windows PowerShell and type `wsl --install -d Ubuntu` you will need to provide your credentials on ubuntu's first launch.

3. **Install Docker Desktop & WSL Intigration** after installing docker desktop for windows, click the gear icon on the top part then go to `Resources > WSL INTEGRATION` make sure to Enable integration with my default WSL distro is checked and on the bottom the ubuntu distro that you installed should appeared and click the switch on to enable the integration.

4. **VS Code, Git CLone with WSL** launch a `WSL Window` in VS Code, click the bottom left corner click the icon that looks like: `><` there should a list that will appear on top, and click `New WSL Window`, next is you need to change directory `cd` to `mnt/wsl` then git clone webpod.io. It is important to `cd` to the wsl folder to enable file change reflection feature.


**Open WSL Folder In Explorer** by openning an explorer window click network then on the address bar type `\\wsl$`

**If files gets deleted after shutdown** shutdown wsl by openning a PowerShell terminal type: `wsl --shutdown` open file explorer click network in address bar type: `\\wsl$` click ubuntu > etc locate and delete `resolv.conf` file, then start WSL by typing `wsl` in PowerShell then restart your computer, open to VS Code, spawn a new `WSL window using distro` clone webpod.io (if all files is deleted).