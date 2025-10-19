## Setup Node.js on Windows
> Microsoft step-by-step guide:
https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
- Download Node Version Manager (NVM)
  - https://github.com/coreybutler/nvm-windows/releases
  - Select `nvm-setup.zip`
    - This should install the Node Version Manager AND latest version of Node (you will need the latter)
- Open the zip file and then open the `node-setup.exe`, step through the install wizard
- Run the following commands
```sh
nvm ls
# this should output a list of node version you have currently installed
# if you have a node version installed skip to step B...
```
- A. Run the install command:
```sh
nvm install latest
```
- B. Select the version of Node you want to use (latest)
```sh
nvm use <version>
# e.g. nvm use 22.0.0
```
- Verify which Node version you are now using:
```sh
npm --version
# alternatively use node -v
# you should see something like:
# v22.5.1
```