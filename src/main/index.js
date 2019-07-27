import electron from 'electron';
import path from 'path';
import fs from 'fs';

import dhcp from './dhcp';

// Base path used to resolve modules
const base = electron.app.getAppPath();
const rendererPath = path.join(base, 'renderer');

const modules = { dhcp };

// some minimal RPC
electron.ipcMain.on('rpc', async (event, target, method, ...args) => {
  const model = await modules[target][method](...args);
  event.reply('update', model);
});

// proper MIME type for js files
electron.protocol.registerSchemesAsPrivileged([
  { scheme: 'es6', privileges: { standard: true, secure: true } }
]);

electron.app.on('ready', function() {

  electron.protocol.registerBufferProtocol('es6', (req, callback) => {
    const targetFile = path.join(
      rendererPath,
      req.url.replace(/^es6:\/\//, '').replace(/\/$/, '')
    );

    console.log(req, targetFile);
    fs.readFile(targetFile, (e, b) => {
      callback({ mimeType: 'text/javascript', data: b });
    });
  });

  let window = new electron.BrowserWindow({
    title: CONFIG.name,
    width: CONFIG.width,
    height: CONFIG.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadURL(`file://${path.join(rendererPath, 'index.html')}`)

  window.webContents.on('did-finish-load', function(){
    window.webContents.send('loaded', {
      appName: CONFIG.name,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome,
    });
  });

  window.on('closed', function() {
    window = null;
  });
});
