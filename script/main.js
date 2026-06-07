// 1st element select-
const issuesContainer = document.getElementById("ISSUES-LIST");
const issueCountSpan = document.getElementById("issue-count");
const loader = document.getElementById("loader");

const tabAll = document.getElementById("tab-all");
const tabOpen = document.getElementById("tab-open");
const tabClosed = document.getElementById("tab-closed");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const issueModal = document.getElementById("issue-modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal-btn");


let allIssues = [];

// 2nd api to data-
function loadIssues() {
    loader.classList.remove("hidden");
    issuesContainer.innerHTML = "";
    
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(function (res) { 
            return res.json(); 
        })
        .then(function (result) {
            allIssues = result.data || result;
            displayIssues(allIssues);
            loader.classList.add("hidden");
        })
        .catch(function (err) {
            console.error("API Error:", err);
            loader.innerHTML = "Something went wrong! Server might be down.";
        });
}


