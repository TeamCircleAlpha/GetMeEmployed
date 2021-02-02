
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
// Client ID: 66e5e3662ce7c8e0354477de03877de5f4f1daa213491433a9c64c2ecbf46a87
// Client Secret: nEWgCYfZvA7ula7JOxx0RQPlO9enplnxsRNDg8kHnYJj5Xn2XK0yC24JDr2Vhiju
// Application website: https://github.com/TeamCircleAlpha/GetMeEmployed

let clientID = '66e5e3662ce7c8e0354477de03877de5f4f1daa213491433a9c64c2ecbf46a87';
let clientSecret = 'nEWgCYfZvA7ula7JOxx0RQPlO9enplnxsRNDg8kHnYJj5Xn2XK0yC24JDr2Vhiju';
let redirectURI = encodeURI('https://teamcirclealpha.github.io/GetMeEmployed/');
let fetchURL = `https://secure.indeed.com/oauth/v2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`;

// STEP 1: Send API call
/* https://secure.indeed.com/oauth/v2/authorize
?client_id=66e5e3662ce7c8e0354477de03877de5f4f1daa213491433a9c64c2ecbf46a87
&redirect_uri=https://github.com/TeamCircleAlpha/GetMeEmployed
&response_type=code
*/

// STEP 2: Receive authorization code
// GET http://www.acerecruitersllc.com/oauth/indeed?code=[client code]

// STEP 3: Request User's Access Token
// POST https://apis.indeed.com/oauth/v2/tokens
/* curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: application/json" 
"https://apis.indeed.com/oauth/v2/tokens
?code=[client code]
&client_id=[client id]
&client_secret=[client secret]
&redirect_uri=[website]
&grant_type=authorization_code"
*/

// STEP 4: Receive Access Token (JSON)
/*
{
   "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV[...]",
   "id_token":"eyJraWQiOiJlMzEzZTc4My1lM2YwLTQ3ZWMtY[...]",
   "refresh_token":"[client code]",
   "expires_in":3600,
   "token_type":"Bearer",
   "scope": "email offline_access"
} 
OR
{
   error: "invalid_request",
   error_description: "Invalid authentication request."
}
*/

// STEP 5: Pass token to API
// HEADER --> Authorization: Bearer [access_token]

/* ----------------------------- */
/* ----------------------------- */
/* ----------------------------- */
let fetchedObj;
async function init() {
    fetchedObj = await $.ajax({
        url:'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=python', 
        method: 'GET'
    })
}
init()
// Githubjobs parameters:
// ?search= (search terms)
// &location= (city name, zip)
// &lat/&long= (latitude & longitude)
// &full_time=true (for full time)
