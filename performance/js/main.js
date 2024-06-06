function measureAssetLoadTime(title, url) {
    // Get all resource performance entries
    const resourceEntries = performance.getEntriesByType('resource');

    // Filter entries by the specified URL
    const matchingEntries = resourceEntries.filter(entry => entry.name.indexOf(url) !== -1 );

    if (matchingEntries.length > 0) {
        const entry = matchingEntries[0];
        const totalTime = entry.responseEnd - entry.startTime;
        console.log(`Total time to load ${title}: ${totalTime.toFixed(2)} ms`);
        displayResult(title+": "+(totalTime.toFixed(2))+" ms")
    } else {
        console.log(`No performance entry found for URL: ${url}`);
    }
}

function displayResult(val){
    const el = document.querySelector("body > header > div > div > div > p");
    if(el){
        if(el.children.length === 0){ el.innerHTML === ""; }//empty
        $(el).append("<div>"+val+"</div>");
    }
}


window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    setTimeout(()=>{
        if(window.location.href.indexOf("/ateng/performance/at-")!==-1){
            measureAssetLoadTime('Tag Lib', 'https://assets.adobedtm.com/164e49a27fff/5b0d33ca78ce/launch-39eb5d49edd5-development.min.js');
            measureAssetLoadTime('Delivery API', '.tt.omtrdc.net');
        }else if(window.location.href.indexOf("/ateng/performance/websdk-")!==-1){
            measureAssetLoadTime('Tag Lib', 'https://assets.adobedtm.com/164e49a27fff/f9672c0a4e61/launch-c1f237bf3c43-development.min.js');
            measureAssetLoadTime('Edge API', 'https://edge.adobedc.net/ee/va6/v1/interact');
        }
    },3000);
});




