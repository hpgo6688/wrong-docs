```
$ tree .devcontainer 
.devcontainer
├── devcontainer.json
└── postCreateCommand.sh

```

## 项目1

### devcontainer.json

```json
{
	"name": "Node.js & TypeScript",
	"image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
	"features": {
		"ghcr.io/devcontainers/features/node:1": {
			"version": "16.18.0"
		},
		"ghcr.io/nils-geistmann/devcontainers-features/zsh:0": {},
		"ghcr.io/devcontainers-extra/features/zsh-plugins:0": {}
	},
	"customizations": {
		"vscode": {
			// "settings": {
			//     "git.autofetch": true
			// },
			"extensions": [
				"meganrogge.template-string-converter",
				"quicktype.quicktype",
				"wmaurer.change-case",
				"formulahendry.auto-complete-tag",
				"formulahendry.auto-rename-tag",
				"mhutchie.git-graph",
				"biomejs.biome",
				"lokalise.i18n-ally"
			]
		}
	},
	"runArgs": [
		"--add-host=host.docker.internal:host-gateway"
	],
	"postCreateCommand": "bash ./.devcontainer/postCreateCommand.sh"
}
```

### postCreateCommand.sh

```sh
#!/bin/bash

# Update package lists and install vim
sudo apt update
sudo apt install -y vim

# Install pnpm and set configuration
npm install -g pnpm@7.13.5
pnpm config set store-dir ~/.pnpm-store --global

# Add alias to .zshrc
echo "alias clnm='find ./ -type d -name node_modules | xargs rm -rf'" >> ~/.zshrc

# Install zsh plugins
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting
echo 'source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc

git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
echo 'source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc

```

## 项目2

### devcontainer.json

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/devcontainers/templates/tree/main/src/typescript-node
{
    "name": "Node.js & TypeScript",
    // Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
    "image": "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm",
    "features": {
      "ghcr.io/devcontainers/features/node:1": {},
      "ghcr.io/wxw-matt/devcontainer-features/command_runner:0": {}
    },
    "customizations": {
      "vscode": {
        "extensions": [
          "meganrogge.template-string-converter",
          "quicktype.quicktype",
          "wmaurer.change-case",
          "formulahendry.auto-complete-tag",
          "formulahendry.auto-rename-tag",
          "mhutchie.git-graph",
          "biomejs.biome"
        ]
      }
    },
    "postCreateCommand": "bash ./.devcontainer/postCreateCommand.sh"
  }
  
```

### postCreateCommand.sh

```sh
#!/bin/bash

# Add alias to .zshrc
echo "alias clnm='find ./ -type d -name node_modules | xargs rm -rf'" >> ~/.zshrc
node -v

# Install nrm and add registries
npm install -g nrm
nrm add phemex http://jfrog.cmex.corp:8081/artifactory/api/npm/npm-virtual/
nrm add phemex-local http://jfrog.cmex.corp:8081/artifactory/api/npm/npm-local/

# Add npm registry configuration
cat <<EOL >> ~/.npmrc
//jfrog.cmex.corp:8081/artifactory/api/npm/npm-local/:_password=UGhlbWV4QDIwMjEk
//jfrog.cmex.corp:8081/artifactory/api/npm/npm-local/:username=front
//jfrog.cmex.corp:8081/artifactory/api/npm/npm-local/:email=logan.zhao@cmexpro.com
//jfrog.cmex.corp:8081/artifactory/api/npm/npm-local/:always-auth=true
EOL

# Install Oh My Zsh if not already installed
if [ ! -d "$HOME/.oh-my-zsh" ]; then
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
fi

# Install zsh-syntax-highlighting
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting" ]; then
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
fi

# Install zsh-autosuggestions
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions" ]; then
  git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
fi

ZSHRC="$HOME/.zshrc"

# Set theme
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="agnoster"/' $ZSHRC

# Add plugins
if ! grep -q "plugins=(.*zsh-syntax-highlighting.*)" $ZSHRC; then
  sed -i 's/^plugins=(/plugins=(git zsh-syntax-highlighting zsh-autosuggestions autojump /' $ZSHRC
fi

# Manually load plugins
echo "source ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> $ZSHRC
echo "source ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" >> $ZSHRC

sudo apt update

# Enable autojump
sudo apt install -y autojump
echo '[ -f /usr/share/autojump/autojump.sh ] && . /usr/share/autojump/autojump.sh' >> ~/.zshrc

# Customize prompt
echo 'PROMPT="%B%F{green}root@%m:%f%F{green}%~%f%F{yellow}${vcs_info_msg_0_}%f%F{cyan}$%f%b "' >> $ZSHRC

# Add vim
sudo apt install -y vim

# Use vim in git
echo 'export GIT_EDITOR=vim' >> ~/.zshrc

# Apply changes
source $ZSHRC

# Swicth zsh
exec zsh

```
