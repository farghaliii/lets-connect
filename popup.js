const inpFilters = document.getElementById("filters"),
    inpMutualConn = document.getElementById("mutual-connection"),
    inpScrolligPeriod = document.getElementById("scrolling-period"),
    btnConnect = document.getElementById("connect"),
    divContainer = document.getElementById("container");

btnConnect.addEventListener("click", connect);

function connect() {
    let keywords = prepareKeywords(inpFilters.value);
    keywords = keywords.length < 1 ? [""] : keywords;
    let data = { 
        "keywords": keywords,
        "filterMutualConn": Number(inpMutualConn.value),
        "scrollingPeriod": Number(inpScrolligPeriod.value)
     };
    sendMessage(data);
    loading();
}


function loading() {
    divContainer.innerHTML = `
    <div class='loading'>
        <h2>Wait Please...</h2>
        <p>The page will reload after finishing.</p>
        <p>With defualt options the process almost takes from 5 min to 15 min.</p>
        <p>Thank You.</p>
    </div>`;
}

function prepareKeywords(keywordsAsStr) {
    return keywordsAsStr.trim().toLowerCase().split(",").map(cleanKeywords).filter(cleanKeywords);
}

function cleanKeywords(keyword) {
    return !keyword ? false : keyword.trim();
}

function sendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}