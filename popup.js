document.addEventListener('DOMContentLoaded', function() {
    const fetchImagesButton = document.getElementById('fetchImages');
    fetchImagesButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: fetchImageURLs,
            }).then((results) => {
                const imageURLs = results[0];
                showImageURLs(imageURLs);
            }).catch((error) => {
                console.error(`Error: ${error}`);
            });
        });
    });
});
function fetchImageURLs() {
    const images = document.getElementsByTagName('img');
    const imageURLs = Array.from(images).map((image) => {
        return { src: image.src, url: new URL(image.src) };
    });
    return imageURLs;
}
function showImageURLs(imageURLs) {
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 9999; padding: 10px; background-color: white;';
    for (const imageInfo of imageURLs) {
        const urlDiv = document.createElement('div');
        urlDiv.textContent = imageInfo.src;
        if (imageInfo.url.hostname === window.location.hostname) {
            urlDiv.style.backgroundColor = 'green';
        } else {
            urlDiv.style.backgroundColor = 'red';
        }
        const img = document.createElement('img');
        img.src = imageInfo.src;
        img.style.cssText = 'margin-right: 10px;';
        container.appendChild(img);
        container.appendChild(urlDiv);
    }
    document.body.appendChild(container);
}
