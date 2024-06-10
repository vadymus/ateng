function startPerformanceTest(){
    takeMeasurement();
}

function clearPerformanceTest(){
    clearObject('myPerformanceTest');
}

function takeMeasurement() {
    
    let resources = [];

    if(typeof adobe === "object" && typeof adobe.target === "object")
        resources = [
            {title: 'Tag Lib', url: '/launch-39eb5d49edd5-development.min.js'},
            {title: 'Delivery API', url: '.tt.omtrdc.net'}
        ];
    else if(typeof alloy === "function")
        resources = [
            {title: 'Tag Lib', url: '/launch-c1f237bf3c43-development.min.js'},
            {title: 'Edge Server API', url: 'https://edge.adobedc.net/ee/va6/v1/interact'}
        ];

    resources.forEach((resource)=>{
        const resourceEntries = performance.getEntriesByType('resource');// Get all resource performance entries        
        const matchingEntries = resourceEntries.filter(entry => entry.name.indexOf(resource.url) !== -1 );// Filter entries by the specified URL
        if (matchingEntries.length > 0) {
            const entry = matchingEntries[0];
            const totalTime = entry.responseEnd - entry.startTime;
            console.log(`Total time to load ${resource.title}: ${totalTime.toFixed(2)} ms`);
            saveAndDisplayResult({title: resource.title, time: totalTime.toFixed(2)})
        } else {
            console.log(`No performance entry found for URL: ${url}`);
        }
    });

}

function saveAndDisplayResult(val){

    const oldResults = readObject('myPerformanceTest');
    const newResults = (oldResults) ? oldResults.concat([val]) : [val];

    console.log(`new result to be stored: ${newResults}`);
    storeObject('myPerformanceTest', newResults);

    displayResults(newResults);
}

function displayResults(results){
    const el = document.querySelector("body > header > div > div > div > p");
    if(el && typeof results === "object"){
        //let html = '';
        let totalTags = [];
        let totalApis = [];
        results.forEach((result)=>{
            //html += `<td>${result.title}: ${result.time} ms</td>`;
            if(result.title==="Tag Lib") totalTags.push(parseFloat(result.time));
            if(result.title==="Delivery API") totalApis.push(parseFloat(result.time));
            if(result.title==="Edge Server API") totalApis.push(parseFloat(result.time));
        });
        $(el).html(
            "Tag: "+totalTags.join("+")+" = " + calculateMedian(totalTags) +
            "<br/><br/>API: "+totalApis.join("+")+" = " + calculateMedian(totalApis) 
            );
    }
}

function storeObject(key, obj) {
    if (typeof obj === "object") {
        const jsonString = JSON.stringify(obj);
        localStorage.setItem(key, jsonString);
        console.log(`Object stored under key: ${key}`);
    } else {
        console.error("The value to store is not an object.", obj);
    }
}
function readObject(key) {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        try {
            const obj = JSON.parse(jsonString);
            console.log(`Object retrieved from key: ${key}`, obj);
            return obj;
        } catch (e) {
            console.error("Error parsing JSON string from local storage.", e);
        }
    } else {
        console.log(`No object found under key: ${key}`);
    }
    return null;
}
function clearObject(key) {
    if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        console.log(`Object under key: ${key} has been cleared.`);
    } else {
        console.log(`No object found under key: ${key} to clear.`);
    }
    const el = document.querySelector("body > header > div > div > div > p");
    if(el){ $(el).html(""); }
}
function calculateMedian(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty array.");
    }
    // First, sort the array in ascending order
    const sortedArr = arr.slice().sort((a, b) => a - b);
    // Calculate the median
    const middleIndex = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 === 0) {
        // If even, median is the average of the two middle numbers
        return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
    } else {
        // If odd, median is the middle number
        return sortedArr[middleIndex];
    }
}

(() => {
    //setTimeout(()=>{
    const results = readObject('myPerformanceTest')
    displayResults(results);
    //},2000);
})();
