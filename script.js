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
    //Checks search input if it is empty shows modal
    if (document.querySelector('#keywords').value === "" && document.querySelector('#location').value === "") {
        showModal();
    } else {
        document.querySelector('#searchCont').classList.remove('push-center');
        document.querySelector('#searchCont').style.marginTop = "90px";
        displayCards();
    }
});

// opens side nav menu on click
document.querySelector('#savedJobLink').addEventListener("click", function () {
    if (document.querySelector("#mySidenav").style.width === "") {
        // open side nav menu
        document.querySelector("#mySidenav").style.width = "250px";
    }
    else {
        // close side nav menu
        document.querySelector("#mySidenav").style.width = "";
    }
})



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
    let Description = encodeURIComponent(document.querySelector('#keywords').value);
    let Location = encodeURIComponent(document.querySelector('#location').value);
    let minSalary = document.querySelector('#minSalary').value;
    let fullTime = document.getElementById('fullTimeCheck');
    let partTime = document.getElementById('partTimeCheck');
    let contract = document.getElementById('contractCheck');
    let permanent = document.getElementById('permanentCheck');

    //Github Jobs search inputs
    let ghString = "";
    ghString += `description=${Description}&`;
    ghString += `location=${Location}`;

    //Adzuna search inputs
    let adString = "";
    adString += `what=${Description}`;
    adString += `&where=${Location}`;
    adString += `&salary_min=${minSalary}`;
    if(fullTime.checked == true){
        adString += `&full_time=1`
    }
    if(partTime.checked == true){
        adString += `&part_time=1`
    }
    if(contract.checked == true){
        adString += `&contract=1`
    }
    if(permanent.checked == true){
        adString += `&permanent=1`
    }

    console.log(ghString)
    console.log(adString)
    // Githubjobs parameters:
    // ?search= (search terms)
    // &location= (city name, zip)
    // &lat/&long= (latitude & longitude)
    // &full_time=true (for full time)

    // await sendSearchRequests(ghString, adzString, ghLocation);
    await new Promise(resolve => setTimeout(resolve, 1500));
    sendDummyRequests();

}

async function sendSearchRequests(ghString, adString) {
    githubJobs = await $.ajax({
        url: `https://repos.codehot.tech/cors_proxy.php?url=https://jobs.github.com/positions.json?${ghString}20%`,
        method: 'GET',
    }).then(r => JSON.parse(r)).catch(e => console.log(e));
    adzunaJobs = await $.ajax({
        url: `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appID}&app_key=${appKey}&content-type=application/json&results_per_page=50&${adString}20%`,
        method: 'GET'
    }).then(r => r.results).catch(e => console.log(e));
}

function sendDummyRequests() {
    githubJobs = [
        {
            company: "Bitovi",
            company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
            company_url: "https://www.bitovi.com/",
            created_at: "Wed Feb 03 17:04:44 UTC 2021",
            description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
            how_to_apply: "<p>Please use this link to apply.</p>",
            id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
            location: "REMOTE - North America",
            title: "React Developer and Consultant",
            type: "Full Time",
            url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"
        },
        {
            company: "Bitovi",
            company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
            company_url: "https://www.bitovi.com/",
            created_at: "Wed Feb 03 17:04:44 UTC 2021",
            description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
            how_to_apply: "<p>Please use this link to apply.</p>",
            id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
            location: "REMOTE - North America",
            title: "React Developer and Consultant",
            type: "Full Time",
            url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"
        },
        {
            company: "Bitovi",
            company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ3lZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ea1619cf85bf3b6d816d407f71431443c6547a80/bitovi_bits_red.png",
            company_url: "https://www.bitovi.com/",
            created_at: "Wed Feb 03 17:04:44 UTC 2021",
            description: "<p><strong>ABOUT BITOVI:</strong></p><p>Description stuff</p>",
            how_to_apply: "<p>Please use this link to apply.</p>",
            id: "5cf52acc-82f7-4350-af99-46bd2cf4f014",
            location: "REMOTE - North America",
            title: "React Developer and Consultant",
            type: "Full Time",
            url: "https://jobs.github.com/positions/5cf52acc-82f7-4350-af99-46bd2cf4f014"
        }
    ];
    adzunaJobs = [
        {
            adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
            category: { label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs" },
            company: { __CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats" },
            created: "2021-01-29T21:38:16Z",
            description: "Food Delivery - Weekly Pay Mississauga, etc...",
            id: "1962234920",
            latitude: 43.716561,
            location: { display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)' },
            longitude: -79.699347,
            redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
            salary_is_predicted: "0",
            title: "Food Delivery - Weekly Pay",
            __CLASS__: "Adzuna::API::Response::Job"
        },
        {
            adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
            category: { label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs" },
            company: { __CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats" },
            created: "2021-01-29T21:38:16Z",
            description: "Food Delivery - Weekly Pay Mississauga, etc...",
            id: "1962234920",
            latitude: 43.716561,
            location: { display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)' },
            longitude: -79.699347,
            redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
            salary_is_predicted: "0",
            title: "Food Delivery - Weekly Pay",
            __CLASS__: "Adzuna::API::Response::Job"
        },
        {
            adref: "eyJhbGciOiJIUzI1NiJ9.eyJzIjoicHA1Um5rcG02eEczaGprVnNhYndnQSIsImkiOiIxOTYyMjM0OTIwIn0.ANrEuFwKn9SKHwxkTGoCKqMaLf1fr3Snv3mLkP2spQE",
            category: { label: "Logistics & Warehouse Jobs", __CLASS__: "Adzuna::API::Response::Category", tag: "logistics-warehouse-jobs" },
            company: { __CLASS__: "Adzuna::API::Response::Company", display_name: "Uber Eats" },
            created: "2021-01-29T21:38:16Z",
            description: "Food Delivery - Weekly Pay Mississauga, etc...",
            id: "1962234920",
            latitude: 43.716561,
            location: { display_name: "Brampton, Peel region", __CLASS__: "Adzuna::API::Response::Location", area: 'Array(4)' },
            longitude: -79.699347,
            redirect_url: "https://www.adzuna.ca/land/ad/1962234920?se=pp5Rnkpm6xG3hjkVsabwgA&utm_medium=api&utm_source=ddcfef90&v=CF2E393A704DC3B2BE001FFB447AC20DD860D4F1",
            salary_is_predicted: "0",
            title: "Food Delivery - Weekly Pay",
            __CLASS__: "Adzuna::API::Response::Job"
        }
    ];
}
// Search invalid modal
var modal = document.querySelector('#emptyModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
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
                            <a class="titleLink" style="width: 80%">${githubJobs[i].company}</a>
                            <p onclick="star(this)" class="saveBtn">&#9733</p>
                    </div>
                    <h6 class="card-subtitle mb-2">${githubJobs[i].title}</h6>
                    <h6 class="card-subtitle">${githubJobs[i].location}</h6>
                    <h6 class="card-subtitle mb-2 salary"><a href="${githubJobs[i].url}">Click here for more info</a></h6>
                </div>
            </div>
        </div>`;

        document.querySelector('#searchOutputContainer').innerHTML += 
        `<div class="col-md-4">
            <div class="card clickcard my-3 mx-3 shape" id="cardClick">
                <div class="card-body">
                    <div class="row d-flex">
                            <a class="titleLink" style="width: 80%">${githubJobs[i].company}</a>
                            <p onclick="star(this)" class="saveBtn">&#9733</p>
                    </div>
                    <h6 class="card-subtitle mb-2">${adzunaJobs[i].title}</h6>
                    <h6 class="card-subtitle">${adzunaJobs[i].location.display_name}</h6>
                    <h6 class="card-subtitle mb-2 salary"><a href="${adzunaJobs[i].redirect_url}">Click here for more info</a></h6>
                </div>
            </div>
        </div>`;
    }
}
var saveList = []

function renderItem(){

    if (JSON.parse(localStorage.getItem("saveList")) !== null)
        {saveList = JSON.parse(localStorage.getItem("saveList"))}

    for (let i=0; i<saveList.length; i++){
        document.querySelector(".active").innerHTML += saveList[i]}
}
renderItem()

function star(el){

    var sideNav = document.querySelector(".active")

    sideNav.innerHTML = ""

    var jobTitle = el.previousElementSibling.textContent;
    var link = el.parentElement.parentElement.children[3].children[0].href
    el.parentElement.children[1].style.color = "orange"
   
    saveList.push(
    `<a href=${link}><div class="savedJobBody">
                            <h5 class="card-title">${jobTitle}</h5>
                            <a class="remove-favorite">&#9733;</a>
                            <p class="card-text">Job title</p>
                            <span class="card-text">Description or something idk, two lines maybe</span>
                        </div></a>`)

    for (let i=0; i<saveList.length; i++){
        sideNav.innerHTML += saveList[i]
    }

    localStorage.setItem("saveList", JSON.stringify(saveList))
}