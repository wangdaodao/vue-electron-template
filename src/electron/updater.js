/**
 * updater.js
 *
 * Please use manual update only when it is really required, otherwise please use recommended non-intrusive auto update.
 *
 * Import steps:
 * 1. create `updater.js` for the code snippet
 * 2. require `updater.js` for menu implementation, and set `checkForUpdates` callback from `updater` for the click property of `Check Updates...` MenuItem.
 */
import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
let updater
autoUpdater.autoDownload = false

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
})

autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: '更新提示',
    message: '发现有新版本'+ info.version +'，是否更新？',
    buttons: ['更新', '不了'],
    cancelId: 1,
  }).then(index => {
    if (index.response == 0) {
      autoUpdater.downloadUpdate();
    }
    else {
      updater.enabled = true
      updater = null
    }
  })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: '提示',
    message: '暂无更新'
  })
  updater.enabled = false
  updater = null
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    title: '安装更新',
    buttons: ['安装', '稍后安装'],
    message: '安装包已经下载完毕，是否现在安装？',
    cancelId: 1,
  }).then(index => {
    if (index.response == 0) {
      autoUpdater.quitAndInstall()
    }
  })
})

// export this to MenuItem click callback
export function checkForUpdates(menuItem, focusedWindow, event) {
  updater = menuItem
  updater.enabled = false
  autoUpdater.checkForUpdates()
}
