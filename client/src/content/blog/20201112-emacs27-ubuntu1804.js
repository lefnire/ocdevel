export default {
  id: "20201112-emacs27-ubuntu1804",
  date: "2020-11-12",
  title: "Install Emacs 27 on Ubuntu 18.04",
  body: `
I use [Spacemacs](https://www.spacemacs.org/) (highly recommended) who's latest versions aren't compatible with earlier Emacs (eg, 25 is common on 18.04).

\`\`\`
# Install Emacs 27
sudo add-apt-repository ppa:kelleyk/emacs
sudo apt update
sudo apt install emacs27

# Install Spacemacs
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d
\`\`\`    
`
}