//window.addEventListener("DOMContentLoaded", () => {
            //document.getElementById('browse-btn').addEventListener('click', async () => {
            //    const path = await window.api.selectFile();
            //    if (path) document.getElementById('game-path').value = path;
            //});

            function openDownloadUI(gameName, fileName, url) {
                document.getElementById("download-popup").style.display = "block";
                document.getElementById("dl-game-name").textContent = gameName;
                document.getElementById("dl-file-name").textContent = fileName;
                window.currentDownload = {
                    gameName,
                    fileName,
                    url
                };
            }
            document.getElementById("dl-browse").onclick = async () => {
                const folder = await window.api.selectFolder();
                if (folder) document.getElementById("dl-folder").value = folder;
            };
            document.getElementById("dl-start").onclick = async () => {
                const folder = document.getElementById("dl-folder").value;
                if (!folder) return alert("Choose a folder!");
                const filePath = folder + "/" + window.currentDownload.fileName;
                document.getElementById("dl-log").innerHTML = "Starting download...";
                await window.api.downloadGame(window.currentDownload.url, filePath);
            };
            window.api.onDownloadProgress((p) => {
                document.getElementById("dl-progress").style.width = p + "%";
                document.getElementById("dl-log").innerHTML += `<br>${p}%`;
                const log = document.getElementById("dl-log");
                log.scrollTop = log.scrollHeight;
            });

document.getElementById("dl-start").onclick = () => {
    const folder = document.getElementById("dl-folder").value;
    if (!folder) return alert("Choose a folder!");

    const filePath = folder + "/" + window.currentDownload.fileName;

    const log = document.getElementById("dl-log");
    log.innerHTML = "Starting download...";

    window.api.downloadGame(window.currentDownload.url, filePath);
};

window.api.onDownloadProgress((p) => {
    document.getElementById("dl-progress").style.width = p + "%";
    document.getElementById("dl-log").innerHTML = `Downloading... ${p}%`;

    const log = document.getElementById("dl-log");
    log.scrollTop = log.scrollHeight;
});

window.api.onDownloadFinished(() => {
    const log = document.getElementById("dl-log");
    log.innerHTML += "<br>Download complete!";
    alert('Download Finished!');
    document.getElementById('download-popup').style.display = 'none';
});
window.api.onDownloadError((err) => {
    const log = document.getElementById("dl-log");
    log.innerHTML += `<br>Error: ${err}`;
});


//});