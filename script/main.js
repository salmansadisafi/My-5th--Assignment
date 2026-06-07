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

// 3rd making card function-
function displayIssues(issues) {
    issuesContainer.innerHTML = "";
    issueCountSpan.innerText = issues.length;

    if (!issues || issues.length === 0) {
        issuesContainer.innerHTML = "<p class='text-slate-500 col-span-4 text-center py-10'>No issues found!</p>";
        return;
    }

    issues.forEach(function (issue) {
        
        let borderColor = "border-t-emerald-500";
        if (issue.status && issue.status.toLowerCase() === "closed") {
            borderColor = "border-t-purple-500";
        }

        
        let priority = "LOW";
        if (issue.priority) {
            priority = issue.priority.toUpperCase();
        }
        
        let priorityColor = "bg-slate-100 text-slate-500";
        if (priority === "HIGH") {
            priorityColor = "bg-red-50 text-red-500";
        } else if (priority === "MEDIUM") {
            priorityColor = "bg-amber-50 text-amber-500";
        }

         // label icon-
        let labelText = "BUG";
        if (issue.label) {
            labelText = issue.label.toUpperCase();
        }
        
        let labelStyle = "bg-red-50 text-red-500 border-red-100";
        let labelIcon = "<i class='fa-solid fa-bug text-[10px]'></i>";
        
        if (labelText === "ENHANCEMENT") {
            labelStyle = "bg-emerald-50 text-emerald-500 border-emerald-100";
            labelIcon = "<i class='fa-solid fa-wand-magic-sparkles text-[10px]'></i>";
        }

        // making card
const card = document.createElement("div");

card.className = `bg-white rounded-xl border border-slate-200 border-t-4 ${borderColor} shadow-sm p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-md transition`;

card.innerHTML = `
    <div>
        <div class="flex justify-between items-center mb-4">
            <div class="text-xs font-bold text-slate-400">
                # ${issue.id || "1"}
            </div>

            <span class="text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wide ${priorityColor}">
                ${priority}
            </span>
        </div>

        <h3 class="font-bold text-[15px] text-slate-800 line-clamp-2 mb-2 leading-snug">
            ${issue.title || "No Title"}
        </h3>

        <p class="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
            ${issue.description || "No Description"}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full border ${labelStyle}">
                ${labelIcon} ${labelText}
            </span>
        </div>
    </div>

    <div class="border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-medium">
        <div class="text-slate-400 mb-0.5">
            By <span class="text-slate-500">${issue.author || "unknown"}</span>
        </div>

        <div>
            ${issue.createdAt
                ? new Date(issue.createdAt).toLocaleDateString()
                : "1/15/2024"}
        </div>
    </div>
`;

        card.addEventListener("click", function () {
            openModal(issue);
        });

        issuesContainer.appendChild(card);
    });
}

// 4th modal function
function openModal(issue) {
    let statusText = "Opened";
    let statusBg = "bg-emerald-100 text-emerald-600";
    
    if (issue.status && issue.status.toLowerCase() === "closed") {
        statusText = "Closed";
        statusBg = "bg-purple-100 text-purple-600";
    }

    modalBody.innerHTML = `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-4">
                ${issue.title || "No Title Provided"}
            </h2>

            <div class="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <span class="px-3 py-1 rounded-full ${statusBg}">
                    ${statusText}
                </span>

                <span>
                    • Opened by
                    <span class="font-bold text-slate-700">
                        ${issue.author || "Anonymous"}
                    </span>
                </span>

                <span>
                    • ${issue.createdAt
                        ? new Date(issue.createdAt).toLocaleDateString("en-GB")
                        : "22/02/2026"}
                </span>
            </div>
        </div>

        <div class="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
            <p class="text-sm text-slate-600 leading-relaxed">
                ${issue.description || "No description available for this issue."}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-8 border-t border-slate-100 pt-6">
            <div>
                <p class="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">
                    Label:
                </p>
                <p class="text-sm font-bold text-slate-800">
                    ${(issue.label || "BUG").toUpperCase()}
                </p>
            </div>

            <div>
                <p class="text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">
                    Priority:
                </p>
                <p class="text-sm font-bold text-slate-800">
                    ${(issue.priority || "LOW").toUpperCase()}
                </p>
            </div>
        </div>
    `;

    issueModal.classList.remove("hidden");
    issueModal.classList.add("flex");
}


// modal close-
closeModalBtn.addEventListener("click", function () {
    issueModal.classList.add("hidden");
    issueModal.classList.remove("flex");
});

// 5th tab filtering function-
function switchTab(activeTabButton, statusType) {
    tabAll.className = "px-8 py-2 text-slate-500 rounded-lg font-medium";
    tabOpen.className = "px-8 py-2 text-slate-500 rounded-lg font-medium";
    tabClosed.className = "px-8 py-2 text-slate-500 rounded-lg font-medium";
    
    activeTabButton.className = "px-8 py-2 bg-indigo-600 text-white rounded-lg font-medium";

    if (statusType === "all") {
        displayIssues(allIssues);
    } else {
        const filtered = allIssues.filter(function (issue) {
            return issue.status && issue.status.toLowerCase() === statusType;
        });
        displayIssues(filtered);
    }
}

tabAll.addEventListener("click", function () { switchTab(tabAll, "all"); });
tabOpen.addEventListener("click", function () { switchTab(tabOpen, "open"); });
tabClosed.addEventListener("click", function () { switchTab(tabClosed, "closed"); });

// 6th serch function
searchBtn.addEventListener("click", function () {
    const searchText = searchInput.value.trim();
    if (searchText === "") {
        displayIssues(allIssues);
        return;
    }

    loader.classList.remove("hidden");
    issuesContainer.innerHTML = "";

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(function (res) { 
            return res.json(); 
        })
        .then(function (searchResult) {
            const searchData = searchResult.data || searchResult;
displayIssues(searchData);
            loader.classList.add("hidden");
        })
        .catch(function (err) {
            console.error(err);
            loader.classList.add("hidden");
        });
});

// data load call-
loadIssues();
