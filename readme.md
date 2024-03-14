# Homepage Desktop

Desktop wrapper for [Homepage dashboard](https://gethomepage.dev/latest/) we all do like. Navigate and open services and bookmarks inside a cozy UI.
On Windows, Linux and Mac.

<p align="center">
  <img width="339" alt="logo" src="https://github.com/RustamIrzaev/homepage-desktop-private/assets/352703/ea20083c-b615-4189-9094-61f7d6ad879f">
</p>

# Installation

> At this point you have to clone and build the application by yourself. Although, it is quite easy. Binaries will be available, but can't say when exactly :/

To do so, you need `Node` to be installed.

1. Clone the repository

   ```bash
   git clone https://github.com/RustamIrzaev/homepage-desktop.git
   ```

2. Navigate to the directory:

   ```bash
   cd homepage-desktop
   ```

3. Run a build script
   - Mac/Linux:
   ```bash
    chmod +x ./build.sh
    ./build.sh
   ```
   - Windows:
   ```bash
   .\build.ps1
   ```
   (if you run into a policy error, run `powershell -ExecutionPolicy Bypass -File .\build.ps1` instead)
4. After the script completes, your application will be under `/build` folder. Feel free to copy anywhere suitable for you and run.

# Configuration

During the first run, the application will ask you to configure a single required parameter - `Homepage dashboard URL`. Specify the url and click 'Save'. Now your application is ready to be used.
