const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    
  })

contextBridge.exposeInMainWorld('electronAPI', {
  chooseAudioFile: () => ipcRenderer.invoke('choose-audio-file'),
  chooseCoverFile: () => ipcRenderer.invoke('choose-cover-file'),
  loadArtists: () => ipcRenderer.invoke('load-artists'),
  loadAlbum: () => ipcRenderer.invoke('load-album')
})

