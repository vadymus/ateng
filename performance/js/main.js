const PERF_STORAGE_NAME = "myPerformanceTest";
const TAG_LIB_TITLE = "JS Lib";
const TARGET_API_TITLE = "Delivery API";
const EDGE_API_TITLE = "Edge API";

function startPerformanceTest(){
    takeMeasurement();
    window.location.reload();
}

function clearPerformanceTest(){
    clearObject(PERF_STORAGE_NAME);
}

function takeMeasurement() {
    
    let resources = [];

    if(typeof adobe === "object" && typeof adobe.target === "object")
        resources = [
            {title: TAG_LIB_TITLE, url: '/launch-39eb5d49edd5-development.min.js'},
            {title: TARGET_API_TITLE, url: '.tt.omtrdc.net'}
        ];
    else if(typeof alloy === "function" && typeof _satellite === "object")
        resources = [
            {title: TAG_LIB_TITLE, url: '/launch-c1f237bf3c43-development.min.js'},
            {title: EDGE_API_TITLE, url: 'https://edge.adobedc.net/ee/va6/v1/interact'}
        ];
    else if(typeof alloy === "function" && typeof _satellite === "undefined")
        resources = [
            {title: TAG_LIB_TITLE, url: '/alloy.2.11.4.js'},
            {title: EDGE_API_TITLE, url: 'https://edge.adobedc.net/ee/va6/v1/interact'}
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

    const oldResults = readObject(PERF_STORAGE_NAME);
    const newResults = (oldResults) ? oldResults.concat([val]) : [val];

    console.log(`new result to be stored: ${newResults}`);
    storeObject(PERF_STORAGE_NAME, newResults);

    displayResults(newResults);
}

function displayResults(results){
    const el = document.querySelector("body > header > div > div > div > p");
    if(el && results && typeof results === "object"){
        //let html = '';
        let totalTags = [];
        let totalApis = [];
        results.forEach((result)=>{
            //html += `<td>${result.title}: ${result.time} ms</td>`;
            if(result.title === TAG_LIB_TITLE) totalTags.push(parseFloat(result.time));
            if(result.title === TARGET_API_TITLE) totalApis.push(parseFloat(result.time));
            if(result.title === EDGE_API_TITLE) totalApis.push(parseFloat(result.time));
        });
        $(el).html(
            "Tag: "+totalTags.join("+")+" = <span class='badge badge-success'>" + calculateAverage(totalTags).toFixed(2)+"</span>" +
            "<br/><br/>API: "+totalApis.join("+")+" = <span class='badge badge-success'>" + calculateAverage(totalApis).toFixed(2) +"</span>"
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
function calculateAverage(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        console.error("Input must be a non-empty array.");
        return 0;
    }
    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);// Calculate the sum of all elements in the array
    const average = sum / arr.length;// Calculate the average
    return average;
}

(() => {

 document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href);
        if (linkUrl.pathname === currentUrl) {
            link.classList.add('active');
            const parentDropdown = link.closest('.dropdown-menu');
            if (parentDropdown) {
                parentDropdown.previousElementSibling.classList.add('active');
            }
        }
    });
 });

 const results = readObject(PERF_STORAGE_NAME);
 displayResults(results);
})();
