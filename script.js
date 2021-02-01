
// add job search button
function searchJob(event){
    event.preventDefault()
    var jobSearched = document.querySelector('#job-input').value

    // clear input 
    document.querySelector('#job-input').value = ''
}