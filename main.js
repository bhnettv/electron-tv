const { app, BrowserWindow, Menu } = require("electron");

app.commandLine.appendSwitch("disable-web-security");
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("enable-gpu-compositing");
app.commandLine.appendSwitch("disable-quic");
app.commandLine.appendSwitch("enable-fast-unload");
app.commandLine.appendSwitch("enable-tcp-fast-open");
app.commandLine.appendSwitch("enable-checker-imaging");
app.commandLine.appendSwitch("enable-native-gpu-memory-buffers");
app.commandLine.appendSwitch("enable-gpu-rasterization");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.

  win = new BrowserWindow({
    kiosk: true,
    webSecurity: false,
    webPreferences: {
      nodeIntegration: true,
      plugins: true
    }
  });

  // and load the index.html of the app.
  win.loadFile("src/index.html");

  // Open the DevTools.
  win.webContents.openDevTools();
  //   window.location.replace("chrome://gpu");
  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        { label: "Adjust notification value" },
        { label: "CoinMarketCap" },
        {
          label: "Exit",
          click() {
            app.quit();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
