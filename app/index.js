"use strct";

// Electronのモジュール
const electron = require("electron");

const app = electron.app;
const Menu = electron.Menu;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({width: 1280, height: 720, useContentSize: true});
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// menu
const menu_template = [
    {
        label: app.getName(),
        submenu: [
            //{role: 'about'},
            {
                role: 'close',
                accelerator: 'Command+Q'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {
                label: 'DevTools',
                accelerator: 'Alt+Command+I',
                click: function() {
                    mainWindow.openDevTools();
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(menu_template);
Menu.setApplicationMenu(menu);
