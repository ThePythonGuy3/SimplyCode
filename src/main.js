const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {ipcMain} = require('electron')

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		transparent: true,
		webPreferences: {
			nodeIntegration: true,
			worldSafeExecuteJavaScript: true,
			enableRemoteModule: true
		}
	});
	mainWindow.loadURL(`file://${__dirname}/electron-index.html`);

	//mainWindow.webContents.on("devtools-opened", () => { mainWindow.webContents.closeDevTools(); });
	
	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	ipcMain.on('close', (evt, arg) => {
		mainWindow.close();
	});

	ipcMain.on('max', (evt, arg) => {
		mainWindow.maximize();
	});

	ipcMain.on('unmax', (evt, arg) => {
		mainWindow.unmaximize();
	});

	ipcMain.on('minimize', (evt, arg) => {
		mainWindow.minimize();
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
