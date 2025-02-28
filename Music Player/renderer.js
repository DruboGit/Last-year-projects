document.getElementById("audio-input").addEventListener("click", async () => {
    const path = await window.electronAPI.chooseAudioFile()
    const fileName = path.substring(path.lastIndexOf("\\") + 1, path.length);
    document.getElementById("audio-input").value = fileName
})

document.getElementById("cover-input").addEventListener("click", async () => {
    const path = await window.electronAPI.chooseCoverFile()
    const fileName = path.substring(path.lastIndexOf("\\") + 1, path.length);
    document.getElementById("cover-input").value = fileName
})

async function loadArtists(){
    const options = await window.electronAPI.loadArtists()
    console.log(options)
    document.getElementById("artist-select").innerHTML += options
}

async function loadAlbum(){
    const options = await window.electronAPI.loadAlbum()
    console.log(options)
    document.getElementById("album-select").innerHTML += options
}

loadArtists()
loadAlbum()