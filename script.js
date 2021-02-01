
// add job search button
function searchJob(event){
    event.preventDefault()
    var jobSearched = document.querySelector('#job-input').value

    // clear input 
    document.querySelector('#job-input').value = ''
}



// getJob function 
async function getJob( jobTitle ){
    var queryURL = ""

    // get job information
    var jobData = await fetch( queryUrl ).then( r=>r.json() )


// display the job search
var jobView = document.querySelector('jobView')
jobView.innerHTML = `` // insert card info with job here

}