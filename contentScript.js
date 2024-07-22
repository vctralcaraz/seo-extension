chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.message === 'checkImages') {
        const imgElements = document.getElementsByTagName('img');
        const imagesURLs = [];

        for (const img of imgElements) {
            const url = new URL(img.src);
            const currentUrl = window.location.href;
            const currentDomain = new URL(currentUrl).hostname;
            const imageDomain = url.hostname;
            const isSameDomain = currentDomain === imageDomain;
            const urlInfo = {
                src: img.src,
                isSameDomain
            };
            imagesURLs.push(urlInfo);
        }
        //Send the image URLs back to the popup   
        sendResponse({ imagesURLs });
    }
}); 
