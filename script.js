/* ---------------------- */
/* ---- ON PAGE LOAD ---- */
/* ---------------------- */
var saveList = [];
var keywordSavedList = JSON.parse(localStorage.getItem('keywordSaved')) || [];

// load saved list from local storage
if (JSON.parse(localStorage.getItem("saveList")) !== null) {
    saveList = JSON.parse(localStorage.getItem("saveList"));
}
// populate sidenav with saved items
let maxCardsCol = Math.floor((window.innerHeight - 90) / 150);
if (maxCardsCol < 1) maxCardsCol = 1;
let numOfPages = Math.ceil(saveList.length/maxCardsCol);
renderList();

function renderList() {
    let k = 0;
    let innerHTMLStr = '';
    document.querySelector('#sidenav-indicators').innerHTML = '';

    for (let i = 0; i < numOfPages; i++) {
        // build sidenav dots
        document.querySelector('#sidenav-indicators').innerHTML += '<span class="sn-dot"></span>';
        // build sidenav main
        innerHTMLStr += '<div class="sidenav-col">';
        for (let j = 0; j < maxCardsCol; j++) {
            innerHTMLStr +=
                `<a href='${saveList[k].link}' target="_blank">
                <div class="savedJobBody" id=${saveList[k].id}>
                    <h5 class="card-title" onclick="removeSaved('${saveList[k].id}')">${saveList[k].companyName}</h5>
                    <a class="remove-favorite">&#9733;</a>
                    <span class="card-text">${saveList[k].jobTitle}</span>
                    <br />
                    <p class="card-text">${saveList[k].description}</p>
                </div>
            </a>`;
            k++;
            if (k === saveList.length) break;
        }
        innerHTMLStr += '</div>';
    }
    document.querySelector('#sidenavIn').innerHTML = innerHTMLStr;
}
if (saveList.length > 0) renderList();


//  Keyword save list shown when click search bar
const pSearch = document.querySelector('.searchInput')
pSearch.addEventListener('focus', function(){
    document.querySelector('.previousSearched').classList.remove('d-none')
})

pSearch.addEventListener('blur', function(){
    document.querySelector('.previousSearched').classList.add('d-none')
})
    
function keywordSaved(){
    let searchBarValue = document.querySelector('.searchInput').value

   

    if (keywordSavedList.indexOf(searchBarValue) === -1){
        keywordSavedList.push(searchBarValue)
        document.querySelector('.previousSearched').innerHTML += `<li class="list-group-item">${searchBarValue}</li>`
        localStorage.setItem("keywordSaved", JSON.stringify(keywordSavedList))
    }
}

(function(){
    let keywordListParse = JSON.parse(localStorage.getItem('keywordSaved')) || []

    for (let i=0; i<keywordSavedList.length; i++){
        document.querySelector('.previousSearched').innerHTML += `<li class="list-group-item">${keywordListParse[i]}</li>`
    }
})();


// on search button click
document.querySelector('#searchBtn').addEventListener("click", async function () {
    // start loading CSS
    toggleSearchAnim();
    // sends search value to saved keywords popout when keywords is clicked
    keywordSaved();
    // parse input & call API
    await startSearch();
    // stop loading CSS & display cards
    toggleSearchAnim();
    //Checks search input if it is empty shows modal
    if (document.querySelector('#keywords').value === "" && document.querySelector('#location').value === "") {
        showModal('Please enter at least 1 search keyword.');
    }
    else if (githubJobs.length === 0 || adzunaJobs.length === 0) {
        showModal('No search results found.');
    }
    else {
        document.querySelector('#searchCont').classList.remove('push-center');
        document.querySelector('#searchCont').style.marginTop = "90px";
        displayCards();
    }
    
});

// opens side nav menu on click
document.querySelector('#savedJobLink').addEventListener("click", function () {
    if (document.querySelector("#mySidenav").style.width === "") {
        // open side nav menu
        document.querySelector("#mySidenav").style.width = "253px";
    }
    else {
        // close side nav menu
        document.querySelector("#mySidenav").style.width = "";
    }
})

// When the user clicks the button, open the modal 
function showModal(msg) {
    document.querySelector('#modalMsg').innerHTML = msg;
    document.querySelector('#emptyModal').style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.querySelector('#modalClose').onclick = function () {
    document.querySelector('#emptyModal').style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == document.querySelector('#emptyModal')) {
        document.querySelector('#emptyModal').style.display = "none";
    }
}

// generate cards
function displayCards() {
    // clear old search
    document.querySelector('#searchOutputContainer').innerHTML = '';
    // calculate entries to display
    let numOfEntries = 0;
    if (githubJobs.length > 9 && adzunaJobs.length > 9) numOfEntries = 9;
    else if (githubJobs.length >= adzunaJobs.length) numOfEntries = adzunaJobs.length;
    else if (githubJobs.length < adzunaJobs.length) numOfEntries = githubJobs.length;
    else console.log('Unexpected error with API output');
    // add new results
    for (var i = 0; i < numOfEntries; i++) {
        document.querySelector('#searchOutputContainer').innerHTML +=
            `<div class="col-md-4">
            <div class="card clickcard my-3 mx-3 shape" id="cardClick">
                <div class="card-body">
                    <div class="row d-flex">
                            <a class="titleLink" style="width: 80%">${githubJobs[i].company}</a>
                            <p onclick="star(this)" id=${i} class="saveBtn">&#9733</p>
                    </div>
                    <h6 class="card-subtitle">${githubJobs[i].title}</h6>
                    <p class="card-subtitle my-3">${githubJobs[i].location}</p>
                    <p class="card-subtitle mt-5 job-link"><a href="${githubJobs[i].url}" target="_blank">Click here for more info</a></p>
                </div>
            </div>
        </div>`;
        document.querySelector('#searchOutputContainer').innerHTML +=
            `<div class="col-md-4">
            <div class="card clickcard my-3 mx-3 shape" id="cardClick">
                <div class="card-body">
                    <div class="row d-flex">
                            <a class="titleLink" style="width: 80%">${adzunaJobs[i].company.display_name}</a>
                            <p onclick="star(this)" id=${i+10} class="saveBtn">&#9733</p>
                    </div>
                    <h6 class="card-subtitle">${adzunaJobs[i].title}</h6>
                    <p class="card-subtitle my-3">${adzunaJobs[i].location.display_name}</p>
                    <p class="card-subtitle mt-5 job-link"><a href="${adzunaJobs[i].redirect_url}" target="_blank">Click here for more info</a></p>
                </div>
            </div>
        </div>`;
    }
}
// saves card to sidebar
function star(el) {

    //if star is orange, remove entry from sidenav
    if (el.parentElement.children[1].style.color === "orange") {
        el.parentElement.children[1].style.color = "lightgrey";
        removeSaved(this.id);
    }
    else {
        el.parentElement.children[1].style.color = "orange";
        // push favourite into side nav
        saveList.push({
            id: el.parentElement.children[1].id,
            link: el.parentElement.parentElement.children[3].children[0].href,
            companyName: el.previousElementSibling.textContent,
            jobTitle: el.parentElement.parentElement.children[1].innerText,
            description: el.parentElement.parentElement.children[2].innerText
        })
    }

    localStorage.setItem("saveList", JSON.stringify(saveList));
    renderList();
}
// remove favourite from sidenav
function removeSaved(id) {
    // remove id
    // renderList();
}

/* ----------------------- */
/* ---- CSS ANIMATION ---- */
/* ----------------------- */

// search input animation toggle
function toggleSearchAnim() {
    document.querySelector('.searchInput').classList.toggle('searchBar');
    document.querySelector('#searchBtn').classList.toggle('searchButton');
}

// drag to move sidenav
let oldX = 0;
let tracking = false;
document.querySelector('#mySidenav').addEventListener('mousedown', e => sidenavStartScroll(e));
window.addEventListener('mousemove', e => sidenavScroll(e));
window.addEventListener('mouseup', stopScroll);

function sidenavStartScroll(e) {
    tracking = true;
    oldX = e.clientX;
}

function sidenavScroll(e) {
    // find old offset
    let oldOffsetStr = document.querySelector('#sidenavIn').style.transform.replace(/[^-\d.]/g, '');
    let oldOffset = parseFloat(oldOffsetStr || 0);
    let deltaX = e.clientX - oldX;
    if (tracking) {
        document.querySelector('#sidenavIn').style.transform = `translateX(${oldOffset + deltaX}px)`;
    }
    oldX = e.clientX;
}

function stopScroll() {
    tracking = false;
    let oldOffsetStr = document.querySelector('#sidenavIn').style.transform.replace(/[^-\d.]/g, '');
    let oldOffset = parseFloat(oldOffsetStr);
    if (isNaN(oldOffset)) oldOffset = 0;
    let farEdge = -1*(numOfPages*250-250);
    let closestEdge = Math.round(oldOffset / 250) * 250;
    if (closestEdge > 0) closestEdge = 0;
    else if (closestEdge < farEdge) closestEdge = farEdge;
    anime({
        targets: '#sidenavIn',
        translateX: closestEdge,
        duration: 300,
        easing: 'easeOutSine'
    });
    // switch page indicator to correct page
    let pageNum = -1 * closestEdge / 250;
    for (let i = 0; i < document.querySelector('#sidenav-indicators').children.length; i++) {
        if (i === pageNum) {
            document.querySelector('#sidenav-indicators').children[i].classList.add('active');
        }
        else document.querySelector('#sidenav-indicators').children[i].classList.remove('active');
    }
}

/* ------------------------ */
/* ------ API ACCESS ------ */
/* ------------------------ */

let appID = 'ddcfef90';
let appKey = '34e2e2ed55214203ba42f1f55e511f13';
let githubJobs = [], adzunaJobs = [];

async function startSearch() {
    //parse search terms
    let jobDescription = encodeURIComponent(document.querySelector('#keywords').value);
    let jobLocation = encodeURIComponent(document.querySelector('#location').value);
    let jobSalary = parseInt(document.querySelector('#minSalary').value);
    //Github Jobs search inputs
    let ghString = "";
    ghString += `description=${jobDescription}&`;
    if (jobLocation !== '') ghString += `location=${jobLocation}`;
    //Adzuna search inputs
    let adString = "";
    adString += `what=${jobDescription}`;
    if (jobLocation !== '') adString += `&where=${jobLocation}`;
    if (jobSalary > 0) adString += `&salary_min=${jobSalary}`;
    if (document.getElementById('fullTimeCheck').checked == true) adString += `&full_time=1`;
    if (document.getElementById('partTimeCheck').checked == true) adString += `&part_time=1`;
    if (document.getElementById('contractCheck').checked == true) adString += `&contract=1`;
    if (document.getElementById('permanentCheck').checked == true) adString += `&permanent=1`;
    // await sendSearchRequests(ghString, adzString, ghLocation);
    await new Promise(resolve => setTimeout(resolve, 1500));
    sendDummyRequests();
}

async function sendSearchRequests(ghString, adString) {
    githubJobs = await $.ajax({
        url: `https://repos.codehot.tech/cors_proxy.php?url=https://jobs.github.com/positions.json?${ghString}`,
        method: 'GET',
    }).then(r => JSON.parse(r)).catch(e => console.log(e));
    adzunaJobs = await $.ajax({
        url: `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appID}&app_key=${appKey}&content-type=application/json&results_per_page=50&${adString}`,
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
