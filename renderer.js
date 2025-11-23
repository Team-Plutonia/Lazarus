document.getElementById('browse-btn').addEventListener('click', async () => {
    const path = await window.api.selectFile();
    if (path) document.getElementById('game-path').value = path;
});