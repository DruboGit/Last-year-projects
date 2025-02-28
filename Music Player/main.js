const { ipcMain, dialog } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const { rejects } = require('node:assert')
const path = require('node:path')
const sqlite3 = require('sqlite3').verbose()
const pug = require('pug')

const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

createTable =
  `
CREATE TABLE IF NOT EXISTS song (
id INTEGER PRIMARY KEY,
title TEXT NOT NULL,
artist INTEGER NOT NULL,
release_date TEXT,
album INTEGER NOT NULL,
genre TEXT,
file_path TEXT NOT NULL,
cover_path TEXT,
FOREIGN KEY(artist) REFERENCES artist (id),
FOREIGN KEY(album) REFERENCES artist (album)
)
`

db.serialize(() => {
  db.all(createTable, (err, row) => {
    if (err) {
      console.error(err.message);
    }


  });
});

/*
db.serialize(() => {
  db.all("INSERT INTO album(title, artist, release_date, cover_path) VALUES ('Erectile Dysfunction', '1', '06-02-0825', 'fuck.png')", (err, row) => {
    if (err) {
      console.error(err.message);
    }

  });
});
*/

async function handleChooseFile(event) {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openfile'],
    filters: [{ name: 'Image/Audio', extensions: ['jpg', 'png', 'gif', 'mp3', 'wav'] }]
  })

  if (!canceled) {
    return filePaths[0]
  }
}

function loadArtistsSQL() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM artist`

    return db.all(sql, function (err, row) {
      if (err) {
        console.log(err.message)
        return reject(err.message)
      }
      return resolve(row)
    })
  })
}

function loadAlbumsSQL() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM album`

    return db.all(sql, function (err, row) {
      if (err) {
        console.log(err.message)
        return reject(err.message)
      }
      return resolve(row)
    })
  })
}

async function loadArtists() {
  let artists = await loadArtistsSQL()
  console.log(artists)
  
  return pug.renderFile("artist_options.pug", {"artists" : artists})

}

async function loadAlbum() {
  let albums = await loadAlbumsSQL()
  console.log(albums)
  
  return pug.renderFile("album_options.pug", {"albums" : albums})

}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('choose-audio-file', handleChooseFile)
  ipcMain.handle('choose-cover-file', handleChooseFile)
  ipcMain.handle('load-artists', loadArtists)
  ipcMain.handle('load-album', loadAlbum)
  createWindow()
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})