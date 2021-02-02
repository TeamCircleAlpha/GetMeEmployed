var timesClicked = 0;

document.querySelector('#savedJobLink').addEventListener("click", function openClose() {
    timesClicked++;
    if (timesClicked % 2 == 0) closeNav();
    else openNav();
})

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("savedJobLink").style.width = "350px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("savedJobLink").style.width = null
}

function buttonTrans() {
    document.getElementById('searchCont').style.marginTop = "5px"
}

// ------------------- //
//  API FUNCTIONALITY  //
// ------------------- //

let appID = 'ddcfef90';
let appKey = '34e2e2ed55214203ba42f1f55e511f13';
let githubJobs, adzunaJobs;

startSearch();

function startSearch() {
    //parse search terms
    let ghString = 'description=js', adzString = 'what=developer';
    // Githubjobs parameters:
    // ?search= (search terms)
    // &location= (city name, zip)
    // &lat/&long= (latitude & longitude)
    // &full_time=true (for full time)
    sendSearchRequests(ghString, adzString);
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