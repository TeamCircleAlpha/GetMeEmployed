/* ------------------------ */
/* - BUTTON FUNCTIONALITY - */
/* ------------------------ */

// on search button click
document.querySelector('#searchBtn').addEventListener("click", async function () {
    // start loading CSS
    toggleSearchAnim();
    // parse input & call API
    await startSearch();
    // stop loading CSS & display cards
    toggleSearchAnim();
    document.querySelector('#searchCont').classList.remove('push-center');
    document.querySelector('#searchCont').style.marginTop = "5px";
    displayCards();
});

// opens side nav menu on click
document.querySelector('#savedJobLink').addEventListener("click", function () {
    if (document.querySelector("#mySidenav").style.width === "") {
        // open side nav menu
        document.querySelector("#mySidenav").style.width = "250px";
        document.querySelector("#savedJobLink").style.width = "360px";
    }
    else {
        // close side nav menu
        document.querySelector("#mySidenav").style.width = "";
        document.querySelector("#savedJobLink").style.width = null;
    }
})

// generate cards
function displayCards() {
    // clear old search
    document.querySelector('#searchOutputContainer').innerHTML = '';
    // add new results
    for (var i=0; i<9; i++) {
        document.querySelector('#searchOutputContainer').innerHTML += 
        `<div class="col-md-4">
            <div class="card clickcard my-3 mx-3 shape" id="cardClick">
                <div class="card-body">
                    <div class="row d-flex">
                        <a href="#" class="titleLink" style="width: 60%">${githubJobs[i].company}</a>
                        <button type="button" class="position-absolute end-0 me-3" id="saveBtn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <h6 class="card-subtitle mb-2">${githubJobs[i].title}</h6>
                    <h6 class="card-subtitle">${githubJobs[i].location}</h6>
                    <h6 class="card-subtitle mb-2 salary" ><a href="${githubJobs[i].url}">Click here for more info</a></h6>
                </div>
            </div>
        </div>`;

        document.querySelector('#searchOutputContainer').innerHTML += 
        `<div class="col-md-4">
            <div class="card clickcard my-3 mx-3 shape" id="cardClick">
                <div class="card-body">
                    <div class="row d-flex">
                        <a href="#" class="titleLink" style="width: 60%">${adzunaJobs[i].company.display_name}</a>
                        <button type="button" class="position-absolute end-0 me-3" id="saveBtn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <h6 class="card-subtitle mb-2">${adzunaJobs[i].title}</h6>
                    <h6 class="card-subtitle">${adzunaJobs[i].location.display_name}</h6>
                    <h6 class="card-subtitle mb-2 salary" ><a href="${adzunaJobs[i].redirect_url}">Click here for more info</a></h6>
                </div>
            </div>
        </div>`;
    }
}

/* ----------------------- */
/* ---- CSS ANIMATION ---- */
/* ----------------------- */

// search input animation toggle
function toggleSearchAnim() {
    document.querySelector('.searchInput').classList.toggle('searchBar');
    document.querySelector('#searchBtn').classList.toggle('searchButton');

}

/* ------------------------ */
/* ------ API ACCESS ------ */
/* ------------------------ */

let appID = 'ddcfef90';
let appKey = '34e2e2ed55214203ba42f1f55e511f13';
let githubJobs, adzunaJobs;

async function startSearch() {
    //parse search terms
    let ghString = document.querySelector('#keywords').value, ghLocation = document.querySelector('#location').value, adzString = 'what=developer';

    // Githubjobs parameters:
    // ?search= (search terms)
    // &location= (city name, zip)
    // &lat/&long= (latitude & longitude)
    // &full_time=true (for full time)
    // await sendSearchRequests(ghString, adzString, ghLocation);
    await new Promise(resolve => setTimeout(resolve, 1500));
    sendDummyRequests();
}

async function sendSearchRequests(ghString, adzString, ghLocation) {
    githubJobs = await $.ajax({
        url: `https://repos.codehot.tech/cors_proxy.php?url=https://jobs.github.com/positions.json?description=${ghString}&location=${ghLocation}`,
        method: 'GET',
    }).then(r => JSON.parse(r)).catch(e => console.log(e));
    adzunaJobs = await $.ajax({
        url: `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appID}&app_key=${appKey}&content-type=application/json&results_per_page=50&what=${ghString}&where=${ghLocation}`,
        method: 'GET'
    }).then(r => r.results).catch(e => console.log(e));
}

function sendDummyRequests() {
    githubJobs =[
        {company: "Bitovi",
        company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
        company_url: "https://www.bitovi.com/",
        created_at: "Wed Feb 03 17:04:44 UTC 2021",
        description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
        how_to_apply: "<p>Please use this link to apply.</p>",
        id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
        location: "REMOTE - North America",
        title: "React Developer and Consultant",
        type: "Full Time",
        url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"},
        {company: "Bitovi",
        company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
        company_url: "https://www.bitovi.com/",
        created_at: "Wed Feb 03 17:04:44 UTC 2021",
        description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
        how_to_apply: "<p>Please use this link to apply.</p>",
        id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
        location: "REMOTE - North America",
        title: "React Developer and Consultant",
        type: "Full Time",
        url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"},
        {company: "Bitovi",
        company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
        company_url: "https://www.bitovi.com/",
        created_at: "Wed Feb 03 17:04:44 UTC 2021",
        description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
        how_to_apply: "<p>Please use this link to apply.</p>",
        id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
        location: "REMOTE - North America",
        title: "React Developer and Consultant",
        type: "Full Time",
        url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"}
    ];
    adzunaJobs =[
        {adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
        category: {label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs"},
        company: {__CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats"},
        created: "2021-01-29T21:38:16Z",
        description: "Food Delivery - Weekly Pay Mississauga, etc...",
        id: "1962234920",
        latitude: 43.716561,
        location: {display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)'},
        longitude: -79.699347,
        redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
        salary_is_predicted: "0",
        title: "Food Delivery - Weekly Pay",
        __CLASS__: "Adzuna::API::Response::Job"},
        {adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
        category: {label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs"},
        company: {__CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats"},
        created: "2021-01-29T21:38:16Z",
        description: "Food Delivery - Weekly Pay Mississauga, etc...",
        id: "1962234920",
        latitude: 43.716561,
        location: {display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)'},
        longitude: -79.699347,
        redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
        salary_is_predicted: "0",
        title: "Food Delivery - Weekly Pay",
        __CLASS__: "Adzuna::API::Response::Job"},
        {adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
        category: {label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs"},
        company: {__CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats"},
        created: "2021-01-29T21:38:16Z",
        description: "Food Delivery - Weekly Pay Mississauga, etc...",
        id: "1962234920",
        latitude: 43.716561,
        location: {display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)'},
        longitude: -79.699347,
        redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
        salary_is_predicted: "0",
        title: "Food Delivery - Weekly Pay",
        __CLASS__: "Adzuna::API::Response::Job"}
    ];
}
