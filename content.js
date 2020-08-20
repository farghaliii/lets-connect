chrome.runtime.onMessage.addListener(gotKeywords);

function scrollDown(scrollingPeriod) {
    return new Promise((resolve) => {
        const scrollDownInterval = setInterval(() => {
            window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        }, 1200);

        setTimeout(() => {
            clearInterval(scrollDownInterval);
            resolve("scroll is done");
        }, (scrollingPeriod * 60 * 1000));
    });
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

async function connectWithSuggestedMembers(userOptions) {
    const scrollDownMsg = await scrollDown(userOptions.scrollingPeriod)
    console.log(scrollDownMsg);
    console.log(userOptions.keywords);
    
    let connectMembersBtns = document.querySelectorAll('[data-control-name="invite"], [data-control-name="people_connect"]');
    
    connectMembersBtns.forEach(btn => {
        let memberEntityElem = btn.parentElement.parentElement.parentElement;
        console.log("Check if memeber is suitable to connect.")
        if (isMemberSuitableToConnect(memberEntityElem, userOptions.keywords, userOptions.filterMutualConn)) {
            setTimeout(() => {
                btn.click()
                console.log("Conected!");
            }, Math.floor(Math.random() * 1000) + 500);
        } else {
            console.log("Not Suitable To Connect!");
        }
    });

    setTimeout(() => { location.reload(); }, 3000);
}

function gotKeywords(userOptions) {
    connectWithSuggestedMembers(userOptions);
}