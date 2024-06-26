var webVitals=function(e){"use strict";var n,t,r,i,o,a=-1,c=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n))}),!0)},u=function(){var e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},s=function(){var e=u();return e&&e.activationStart||0},f=function(e,n){var t=u(),r="navigate";a>=0?r="back-forward-cache":t&&(document.prerendering||s()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-")));return{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v4-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},d=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries())}))}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},l=function(e,n,t,r){var i,o;return function(a){n.value>=0&&(a||r)&&((o=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=o,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n))}},p=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}))},v=function(e){document.addEventListener("visibilitychange",(function(){"hidden"===document.visibilityState&&e()}))},m=function(e){var n=!1;return function(){n||(e(),n=!0)}},h=-1,g=function(){return"hidden"!==document.visibilityState||document.prerendering?1/0:0},T=function(e){"hidden"===document.visibilityState&&h>-1&&(h="visibilitychange"===e.type?e.timeStamp:0,E())},y=function(){addEventListener("visibilitychange",T,!0),addEventListener("prerenderingchange",T,!0)},E=function(){removeEventListener("visibilitychange",T,!0),removeEventListener("prerenderingchange",T,!0)},C=function(){return h<0&&(h=g(),y(),c((function(){setTimeout((function(){h=g(),y()}),0)}))),{get firstHiddenTime(){return h}}},L=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e()},S=[1800,3e3],b=function(e,n){n=n||{},L((function(){var t,r=C(),i=f("FCP"),o=d("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(o.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-s(),0),i.entries.push(e),t(!0)))}))}));o&&(t=l(e,i,S,n.reportAllChanges),c((function(r){i=f("FCP"),t=l(e,i,S,n.reportAllChanges),p((function(){i.value=performance.now()-r.timeStamp,t(!0)}))})))}))},w=[.1,.25],I=0,P=1/0,A=0,F=function(e){e.forEach((function(e){e.interactionId&&(P=Math.min(P,e.interactionId),A=Math.max(A,e.interactionId),I=A?(A-P)/7+1:0)}))},M=function(){"interactionCount"in performance||n||(n=d("event",F,{type:"event",buffered:!0,durationThreshold:0}))},k=[],D=new Map,B=0,R=function(){return(n?I:performance.interactionCount||0)-B},x=[],H=function(e){if(x.forEach((function(n){return n(e)})),e.interactionId||"first-input"===e.entryType){var n=k[k.length-1],t=D.get(e.interactionId);if(t||k.length<10||e.duration>n.latency){if(t)e.duration>t.latency?(t.entries=[e],t.latency=e.duration):e.duration===t.latency&&e.startTime===t.entries[0].startTime&&t.entries.push(e);else{var r={id:e.interactionId,latency:e.duration,entries:[e]};D.set(r.id,r),k.push(r)}k.sort((function(e,n){return n.latency-e.latency})),k.length>10&&k.splice(10).forEach((function(e){return D.delete(e.id)}))}}},N=function(e){var n=self.requestIdleCallback||self.setTimeout,t=-1;return e=m(e),"hidden"===document.visibilityState?e():(t=n(e),v(e)),t},q=[200,500],O=[2500,4e3],j={},V=[800,1800],_=function e(n){document.prerendering?L((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0)},z={passive:!0,capture:!0},G=new Date,J=function(e,n){t||(t=n,r=e,i=new Date,U(removeEventListener),K())},K=function(){if(r>=0&&r<i-G){var e={entryType:"first-input",name:t.type,target:t.target,cancelable:t.cancelable,startTime:t.timeStamp,processingStart:t.timeStamp+r};o.forEach((function(n){n(e)})),o=[]}},Q=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){J(e,n),i()},r=function(){i()},i=function(){removeEventListener("pointerup",t,z),removeEventListener("pointercancel",r,z)};addEventListener("pointerup",t,z),addEventListener("pointercancel",r,z)}(n,e):J(n,e)}},U=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,Q,z)}))},W=[100,300];return e.CLSThresholds=w,e.FCPThresholds=S,e.FIDThresholds=W,e.INPThresholds=q,e.LCPThresholds=O,e.TTFBThresholds=V,e.onCLS=function(e,n){n=n||{},b(m((function(){var t,r=f("CLS",0),i=0,o=[],a=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=o[0],t=o[o.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,o.push(e)):(i=e.value,o=[e])}})),i>r.value&&(r.value=i,r.entries=o,t())},u=d("layout-shift",a);u&&(t=l(e,r,w,n.reportAllChanges),v((function(){a(u.takeRecords()),t(!0)})),c((function(){i=0,r=f("CLS",0),t=l(e,r,w,n.reportAllChanges),p((function(){return t()}))})),setTimeout(t,0))})))},e.onFCP=b,e.onFID=function(e,n){n=n||{},L((function(){var i,a=C(),u=f("FID"),s=function(e){e.startTime<a.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),i(!0))},p=function(e){e.forEach(s)},h=d("first-input",p);i=l(e,u,W,n.reportAllChanges),h&&(v(m((function(){p(h.takeRecords()),h.disconnect()}))),c((function(){var a;u=f("FID"),i=l(e,u,W,n.reportAllChanges),o=[],r=-1,t=null,U(addEventListener),a=s,o.push(a),K()})))}))},e.onINP=function(e,n){"PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&(n=n||{},L((function(){var t;M();var r,i=f("INP"),o=function(e){N((function(){e.forEach(H);var n,t=(n=Math.min(k.length-1,Math.floor(R()/50)),k[n]);t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r())}))},a=d("event",o,{durationThreshold:null!==(t=n.durationThreshold)&&void 0!==t?t:40});r=l(e,i,q,n.reportAllChanges),a&&(a.observe({type:"first-input",buffered:!0}),v((function(){o(a.takeRecords()),r(!0)})),c((function(){B=0,k.length=0,D.clear(),i=f("INP"),r=l(e,i,q,n.reportAllChanges)})))})))},e.onLCP=function(e,n){n=n||{},L((function(){var t,r=C(),i=f("LCP"),o=function(e){n.reportAllChanges||(e=e.slice(-1)),e.forEach((function(e){e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-s(),0),i.entries=[e],t())}))},a=d("largest-contentful-paint",o);if(a){t=l(e,i,O,n.reportAllChanges);var u=m((function(){j[i.id]||(o(a.takeRecords()),a.disconnect(),j[i.id]=!0,t(!0))}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return N(u)}),!0)})),v(u),c((function(r){i=f("LCP"),t=l(e,i,O,n.reportAllChanges),p((function(){i.value=performance.now()-r.timeStamp,j[i.id]=!0,t(!0)}))}))}}))},e.onTTFB=function(e,n){n=n||{};var t=f("TTFB"),r=l(e,t,V,n.reportAllChanges);_((function(){var i=u();i&&(t.value=Math.max(i.responseStart-s(),0),t.entries=[i],r(!0),c((function(){t=f("TTFB",0),(r=l(e,t,V,n.reportAllChanges))(!0)})))}))},e}({});

const PERF_STORAGE_NAME = "myPerformanceTest";
const TAG_LIB_TITLE = "JS Lib";
const TARGET_API_TITLE = "Delivery API";
const EDGE_API_TITLE = "Edge API";
const TOOLTIP_LIB = "JavaScript code library that delivers at.js, alloy.js (Web SDK). For example, Data Collection Tag library.";
const TOOLTIP_API = "API call to Adobe edge to retrieve personalization. For example, send event to Edge Server API";

function startPerformanceTest(){
    takeMeasurement();
    setTimeout(()=>{
        window.location.reload();
    }, 200);
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
            {title: TAG_LIB_TITLE, url: '/alloy.2.20.0.min.js'},
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

function getBadgeColor(title, value){
    let badgeType = ""
    switch(title){
        case TAG_LIB_TITLE:
            if(value <= 500) badgeType = "badge-success";
            else badgeType = "badge-warning";
            break;
        case TARGET_API_TITLE:  
            if(value <= 500) badgeType = "badge-success";
            else badgeType = "badge-warning";
            break;
        case EDGE_API_TITLE:
            if(value <= 500) badgeType = "badge-success";
            else badgeType = "badge-warning";
            break;
        case "CLS":
            if(value <= 0.1) badgeType = "badge-success";
            else if(value <= 0.25) badgeType = "badge-warning";
            else badgeType = "badge-danger";
            break;
        case "INP":
            if(value <= 200) badgeType = "badge-success";
            else if(value <= 500) badgeType = "badge-warning";
            else badgeType = "badge-danger";
            break;
        case "LCP":
            if(value <= 2500) badgeType = "badge-success";
            else if(value <= 4000) badgeType = "badge-warning";
            else badgeType = "badge-danger";
            break;
        case "FCP":
            if(value <= 1800) badgeType = "badge-success";
            else if(value <= 3000) badgeType = "badge-warning";
            else badgeType = "badge-danger";
            break;
        case "TTFB":
            if(value <= 800) badgeType = "badge-success";
            else if(value <= 1800) badgeType = "badge-warning";
            else badgeType = "badge-danger";
            break;
    }
    return badgeType;
}

function displayResults(results){
    if(results && typeof results === "object"){
        let totalTags = [], totalApis = [], totalCLS = [], totalINP = [], totalLCP = [], totalFCP = [], totalTTFB = [];
        results.forEach((result)=>{
            switch(result.title){
                case TAG_LIB_TITLE:     totalTags.push(parseFloat(result.time)); break;
                case TARGET_API_TITLE:  totalApis.push(parseFloat(result.time)); break;
                case EDGE_API_TITLE:    totalApis.push(parseFloat(result.time)); break;
                case "CLS":  totalCLS.push(parseFloat(result.time)); break;
                case "INP":  totalINP.push(parseFloat(result.time)); break;
                case "LCP":  totalLCP.push(parseFloat(result.time)); break;
                case "FCP":  totalFCP.push(parseFloat(result.time)); break;
                case "TTFB": totalTTFB.push(parseFloat(result.time)); break;
            }
        });

        let html1 = "";
        if(totalTags.length>0)
            html1 += "<div>Library "+getTooltip(TOOLTIP_LIB)+": <span class='badge "+getBadgeColor(TAG_LIB_TITLE, calculateAverage(totalTags).toFixed(0))+"'>" + calculateAverage(totalTags).toFixed(0)+" ms</span> ("+totalTags.join("+")+")</div>";
        if(totalApis.length>0)
            html1 += "<div>API "+getTooltip(TOOLTIP_API)+": <span class='badge "+getBadgeColor(EDGE_API_TITLE, calculateAverage(totalApis).toFixed(0))+"'>" + calculateAverage(totalApis).toFixed(0) +" ms</span> ("+totalApis.join("+")+")</div>";
        $("body > header > div > div > div > #metrics").html(html1);

        let html2 = "";
        if(totalCLS.length>0)
            html2 += "<div>CLS "+getTooltip("Cumulative Layout Shift")+": <span class='badge "+getBadgeColor("CLS", calculateAverage(totalCLS).toFixed(2))+"'>" + calculateAverage(totalCLS).toFixed(2)+"</span> ("+totalCLS.join("+")+")</div>";
        if(totalINP.length>0)
            html2 += "<div>INP "+getTooltip("Interaction to Next Paint")+": <span class='badge "+getBadgeColor("INP", calculateAverage(totalINP).toFixed(0))+"'>" + calculateAverage(totalINP).toFixed(0)+"</span> ("+totalINP.join("+")+")</div>";
        if(totalLCP.length>0)
            html2 += "<div>LCP "+getTooltip("Largest Contentful Paint")+": <span class='badge "+getBadgeColor("LCP", calculateAverage(totalLCP).toFixed(0))+"'>" + calculateAverage(totalLCP).toFixed(0)+"</span> ("+totalLCP.join("+")+")</div>";
        if(totalFCP.length>0)
            html2 += "<div>FCP "+getTooltip("First Contentful Paint")+": <span class='badge "+getBadgeColor("FCP", calculateAverage(totalFCP).toFixed(0))+"'>" + calculateAverage(totalFCP).toFixed(0)+"</span> ("+totalFCP.join("+")+")</div>";
        if(totalTTFB.length>0)
            html2 += "<div>TTFB "+getTooltip("Time to First Byte")+": <span class='badge "+getBadgeColor("TTFB", calculateAverage(totalTTFB).toFixed(0))+"'>" + calculateAverage(totalTTFB).toFixed(0)+"</span> ("+totalTTFB.join("+")+")</div>";
        
        const badgeType = "badge-success";//(vital.rating==="good") ? "badge-success" : "badge-warning";

        $("body > header > div > div > div > #vitals").html(html2);
        
        $('[data-toggle="tooltip"]').tooltip();
    }
}

function handleWebVitals(vital){
    saveAndDisplayResult({title: vital.name, time: vital.value.toFixed(2)});
    console.log("web vital", vital);
}

function getTooltip(msg){
    return '<sup><i class="bi bi-info-circle-fill text-info" data-toggle="tooltip" title="'+msg+'"></i></sup>';
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
    $("body > header > div > div > div > #metrics").html("");
    $("body > header > div > div > div > #vitals").html("");
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
    const queryStr = window.location.search;
    const navLinks = document.querySelectorAll('.dropdown-menu .dropdown-item');

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href);
        if (linkUrl.pathname+linkUrl.search === currentUrl+queryStr) {
            link.classList.add('active');
            const drowdownParentLink = link.parentNode.parentNode.querySelector("a.nav-link.dropdown-toggle");
            if(drowdownParentLink) drowdownParentLink.classList.add('active');
        }
    });
    //core
    webVitals.onCLS(handleWebVitals);
    webVitals.onINP(handleWebVitals);
    webVitals.onLCP(handleWebVitals);
    //other
    webVitals.onFCP(handleWebVitals);
    webVitals.onTTFB(handleWebVitals);
    //deprecated
    //webVitals.onFID(console.log);

 });

 const results = readObject(PERF_STORAGE_NAME);
 displayResults(results);

})();

