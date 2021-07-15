var repoNameEl = document.querySelector("#repo-name")
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEL = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    //url for github api: in correct format
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    //make a get request to url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
              //pass response data to dom function
              displayIssues(data);

              //check if api has paginaed issues
              if(response.headers.get("Link")) {
                  displayWarning(repo);
              }
          });
        }
        else {
          console.log(response);
          alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
    }

    //loop over github issues
    for (var i = 0; i < issues.length; i++){
        //create a link element to take users to the issues on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);
    
    //add issues container right before for looop closes???
    issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo){
    //add text to warning container
    limitWarningEL.textContent = "to see more than 30 issues, visit ";


    //creates link element
    var linkEl = document.createElement("a");
    linkEl.textContent = "see more Issues on Github.com";
    linkEl.setAttribute ("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute ("target", "_blank")

    //append to the warning container
    limitWarningEL.appendChild(linkEl);
};

getRepoIssues("facebook/react");