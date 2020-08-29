chrome.runtime.onMessage.addListener(letsConnect);
async function letsConnect(userOptions) {
    await connectWithSuggestedMembers(userOptions);
    location.reload();
}

async function connectWithSuggestedMembers(userOptions) {
    let periods = [300, 400, 600];
    await scrollDown(userOptions.scrollingPeriod)
    let connectMembersBtns = getConnectMembersBtns();
    connectMembersBtns.forEach((btn, index) => {
        let memberEntityElem = btn.parentElement.parentElement.parentElement;
        if (isMemberSuitableToConnect(memberEntityElem, userOptions.keywords, userOptions.filterMutualConn)) {
            setTimeout(() => { 
                btn.click();
            }, index * periods[Math.floor(Math.random() * periods.length)] );
        } else {
            console.log("Not Suitable To Connect!");
        }
    });
    resolve("done");
}

function scrollDown(scrollingPeriod) {
    return new Promise((resolve) => {
        const scrollDownInterval = setInterval(() => {
            window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        }, randNum());

        setTimeout(() => {
            clearInterval(scrollDownInterval);
            resolve("scroll is done");
        }, (scrollingPeriod * 60 * 1000));
    });
}

function getConnectMembersBtns() {
    let spans = document.querySelectorAll('span.artdeco-button__text');
    let btns = []; 
    spans.forEach(span => {
        if(RegExp('Connect').test(span.textContent)) {
            btns.push(span.parentElement);
        }
    }); 
    return btns;
}

function isMemberSuitableToConnect(memberElem, keywords, filterMutualConn) {
    let occupation = memberElem.querySelector(".discover-person-card__occupation").innerText.trim().toLowerCase();
    let actualMutualConn = memberElem.querySelector(".member-insights__reason").innerText.trim().split(" ")[0];
    actualMutualConn = isNaN(actualMutualConn) ? 1 : Number(actualMutualConn);

    if (actualMutualConn < filterMutualConn) {
        return false;
    }

    for (const keyword of keywords) {
        if (occupation.includes(keyword)) {
            return true;
        }
    }
    return false;
}
// Generate Random Number
function randNum() {
    return (Math.floor(Math.random() * 10) + 10) * (Math.floor(Math.random() * 300) + 1);
}