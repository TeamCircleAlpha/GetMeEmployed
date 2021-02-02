
// add job search button
function searchJob(event){
    event.preventDefault()
    var jobSearched = document.querySelector('#search').value

    // clear input 
    document.querySelector('#search').value = ''
    getJob( jobTitle )
}


// getJob function 
async function getJob( jobTitle ){
    var queryURL = ""

    // get job information
    var jobData = await fetch( queryURL ).then( r=>r.json() )


// display the job search
var jobView = document.querySelector('jobView')
jobView.innerHTML = `` // insert card info with job here

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

