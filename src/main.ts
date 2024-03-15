import {
	app,
	BrowserWindow,
	ipcMain,
	Menu,
	nativeImage,
	shell,
	Tray,
} from 'electron';
import path from 'path';
import Store, { ConfigType } from './config';

// if (require('electron-squirrel-startup')) {
// 	app.quit();
// }

const store = new Store();

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 370,
		height: 580,
		minWidth: 300,
		minHeight: 400,
		// titleBarStyle: 'hidden',
		// titleBarOverlay: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		icon: path.join(__dirname, `assets/laptop_image`),
	});

	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
		);
	}

	store.init();

	ipcMain.handle('config:get', (event, key: string) => {
		return store.get(key);
	});

	ipcMain.handle('config:set', (event, key: keyof ConfigType, value: any) => {
		store.set(key, value);
	});

	//mainWindow.webContents.openDevTools();

	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith('external://')) {
			url = url.replace('external://', '');
			shell.openExternal(url);
			return { action: 'deny' };
		}
	});

	mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
		(details, callback) => {
			const { requestHeaders } = details;
			requestHeaders['Access-Control-Allow-Headers'] = '*';
			callback({ requestHeaders });
		}
	);

	mainWindow.webContents.session.webRequest.onHeadersReceived(
		(details, callback) => {
			const { responseHeaders } = details;
			responseHeaders['Access-Control-Allow-Origin'] = ['*'];
			responseHeaders['Access-Control-Allow-Headers'] = ['*'];
			callback({
				responseHeaders,
			});
		}
	);
};

app.on('ready', createWindow);

app.whenReady().then(() => {
	if (store?.get('showTrayIcon')) {
		buildTrayIcon();
	}

	// buildApplicationMenu();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

function buildTrayIcon() {
	const icon = nativeImage.createFromPath('assets/laptop_image.png');
	const tray = new Tray(icon.resize({ width: 16, height: 16 }));

	const contextMenu = Menu.buildFromTemplate([
		{ label: 'HomePage Desktop', type: 'normal', enabled: false },
		{ label: '-', type: 'separator' },
		{ label: 'Quit', type: 'normal', role: 'quit' },
	]);

	tray.setContextMenu(contextMenu);
}

function buildApplicationMenu() {
	const isMac = process.platform === 'darwin';

	const menuTemplate = [
		...(isMac
			? [
					{
						label: app.name,
						submenu: [
							{
								// role: 'about',
								label: 'About HomePage Desktop',
								click: async () => {
									// await shell.openPath('/settings');
									// const aboutWindow = new BrowserWindow({
									// 	width: 400,
									// 	height: 300,
									// 	modal: true,
									// 	resizable: false,
									// 	hiddenInMissionControl: true,
									// 	parent: BrowserWindow.getFocusedWindow(),
									// 	webPreferences: {
									// 		preload: path.join(__dirname, 'preload.js'),
									// 	},
									// 	title: 'About HomePage Desktop',
									// });
									// aboutWindow.loadURL('/about.html');
								},
							},
							{ type: 'separator' },
							{ role: 'hide' },
							{ role: 'hideOthers' },
							{ type: 'separator' },
							{ role: 'quit' },
						],
					},
			  ]
			: []),
		{
			label: 'File',
			submenu: [{ role: 'quit' }],
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Report Issue',
					click: async () => {
						await shell.openExternal('https://github.com');
					},
				},
			],
		},
	];

	const menu = Menu.buildFromTemplate(menuTemplate);

	Menu.setApplicationMenu(menu);
}
