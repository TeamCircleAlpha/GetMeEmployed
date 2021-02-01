
// add job search button
function searchJob(event){
    event.preventDefault()
    var jobSearched = document.querySelector('#search').value
    
    // clear input 
    document.querySelector('#job-input').value = ''
}