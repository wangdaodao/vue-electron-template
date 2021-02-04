import { app, shell, Menu } from 'electron'
import {checkForUpdates} from './updater.js';
let template = [
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: `版本` + app.getVersion(),
        id: 'version',
        click: (e) => {
          checkForUpdates(e)
        }
      },
      {
        label: '学习更多',
        id: 'about',
        click: () => {
          shell.openExternal('https://wangdaodao.com/')
        }
      }
    ]
  }
]

var list = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(list)