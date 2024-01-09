export default {
  id: "20201208-wsl-docker-misc",
  date: "2020-12-08",
  title: "WSL2 + Docker odds & ends",
  body: `
#### Use more than 8GB RAM
[[Details]](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig). Docker + WSL2 defaults to only use 8GB system RAM. Bump it up to max. 

1. Edit \`C:\\Users\\yourUserName\\.wslconfig\`
   \`\`\`
   [wsl2]
   #kernel=C:\\\\temp\\\\myCustomKernel
   memory=4GB # Limits VM memory in WSL 2 to 4 GB
   #processors=2 # Makes the WSL 2 VM use two virtual processors
   \`\`\`
1. Restart WSL (\`wsl --shutdown\` in Powershell)

#### .profile tweaks
1. WSL2 uses \`.profile\`, but many installs default to \`.bashrc\` (eg Anaconda). Load \`.bashrc\` via \`.profile\`
    \`\`\`
    if [ -n "$BASH_VERSION" ]; then
        # include .bashrc if it exists
        if [ -f "$HOME/.bashrc" ]; then
            . "$HOME/.bashrc"
        fi
    fi
    \`\`\`
1. Tmux with colors: \`export TERM=xterm-256color\`

#### Clear cache (mem leak)
Docker on WSL2 has a memory leak. Periodically clear the cache
1. \`echo 1 | sudo tee /proc/sys/vm/drop_caches\`

#### Install Python
1. Download [Anaconda for Linux](https://www.anaconda.com/products/individual#linux)
1. \`sh ./Anaconda-whatever.sh\`
1. If \`conda\` command not recognized after shell restart, try moving whatever it added to \`~\\.bashrc\` to \`~\\.profile\` 

#### docker-compose w GPU support
[[Details]](https://github.com/docker/compose/issues/6691#issuecomment-670700674)

1. Install forked docker-compose via pip
    \`\`\`
    pip install git+https://github.com/docker/docker-py.git
    pip install git+https://github.com/yoanisgil/compose.git@device-requests --ignore-installed PyYAML
    \`\`\`
1. Edit \`~/.profile\`: \`export COMPOSE_API_VERSION=auto\`
1. Looks like the above got merged into docker-compose, but still not working for me without forked docker-compose. Revisit.

#### Other
See more tricks [here](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly) (note-to-self: add the useful ones into this post). 
`
}