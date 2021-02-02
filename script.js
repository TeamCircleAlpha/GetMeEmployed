// on card click
document.querySelector('#cardClick').addEventListener("click", function() {
    console.log("zupazup");
})

// on search button click
document.querySelector('#searchBtn').addEventListener("click", function() {
    // move search block up
    document.querySelector('#searchCont').classList.remove('push-center');
    document.querySelector('#searchCont').style.marginTop = "5px";
    // unhide output row
    document.querySelector('#searchOutputContainer').classList.remove('d-none');
    // startSearch(); // <-- parse input & call API
    // display output
});

// opens side nav menu on click
document.querySelector('#savedJobLink').addEventListener("click", function() {
    if (document.querySelector("#mySidenav").style.width === "") {
        // open side nav menu
        document.querySelector("#mySidenav").style.width = "250px";
        document.querySelector("#savedJobLink").style.width = "350px";
    }
    else {
        // close side nav menu
        document.querySelector("#mySidenav").style.width = "";
        document.querySelector("#savedJobLink").style.width = null;
    }
})

// add job search button
function searchJob(event) {
    event.preventDefault();
    var jobSearched = document.querySelector('#job-input').value;
    // clear input 
    document.querySelector('#job-input').value = '';
}

// getJob function 
async function getJob(jobTitle) {
    var queryURL = "";
    // get job information
    var jobData = await fetch(queryUrl).then(r => r.json());

    // display the job search
    var jobView = document.querySelector('jobView');
    jobView.innerHTML = ``; // insert card info with job here
}

/* ---------------------- */
/* ----- API ACCESS ----- */
/* ---------------------- */
let appID = 'ddcfef90';
let appKey = '34e2e2ed55214203ba42f1f55e511f13';
let githubJobs, adzunaJobs;

// startSearch();

async function startSearch() {
    //parse search terms
    let ghString = 'description=js', adzString = 'what=developer';
    // Githubjobs parameters:
    // ?search= (search terms)
    // &location= (city name, zip)
    // &lat/&long= (latitude & longitude)
    // &full_time=true (for full time)
    await sendSearchRequests(ghString, adzString);
}


}


// save job search to local storage
function saveSearch(){
    var savedJob = localStorage.setItem("#mySideNav")
}

// get saved job search in side bar
function showSaved(){
    var jobsSaved = localStorage.getItem()
    document.querySelector('').textContent += `${}`
}


async function sendSearchRequests(ghString, adzString) {
    githubJobs = await $.ajax({
        url: `https://repos.codehot.tech/cors_proxy.php?url=https://jobs.github.com/positions.json?${ghString}`,
        method: 'GET',
    }).then(r => JSON.parse(r)).catch(e => console.log(e));
    adzunaJobs = await $.ajax({
        url: `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appID}&app_key=${appKey}&content-type=application/json&results_per_page=50&${adzString}`,
        method: 'GET'
    }).then(r => r.results).catch(e => console.log(e));
}