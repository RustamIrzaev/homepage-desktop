# Homepage Desktop

Desktop wrapper for [Homepage dashboard](https://gethomepage.dev/latest/) we all do like. Navigate and open services and bookmarks inside a cozy UI.
On Windows, Linux and Mac.

<p align="center">
  <img width="339" alt="image" src="https://github.com/RustamIrzaev/homepage-desktop/assets/352703/991ab9e6-1865-4fb8-993c-6e0b09f53a43">
   <img width="350" alt="image2_1" src="https://github.com/RustamIrzaev/homepage-desktop/assets/352703/c474f940-b5cd-4073-bf84-54256664ce45">
</p>

# Installation

> At this point you have to clone and build the application by yourself. Although, it is quite easy. Binaries are not planned at this moment :/

To do so, you need `Node` to be installed.

1. Clone the repository (or download sources from [Releases](https://github.com/RustamIrzaev/homepage-desktop/releases/tag/v0.1.2) and unpack)

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

## All configuration parameters

| Option                 | Description                                | Notes                           |
| ---------------------- | ------------------------------------------ | ------------------------------- |
| Homepage Dashboard URL | Specify the Homepage url                   | required                        |
| Tray Icon              | Shows or hides the application tray icon   | application restart is required |
| Compact UI             | Makes bookmarks and services look the same | -                               |

# License

Homepage Desktop is released under MIT license. See the [license file](license.md) for more information.
