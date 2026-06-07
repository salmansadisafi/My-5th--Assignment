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

         // লেবেল এবং আইকন সেট করার নিয়ম
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

        // কার্ড তৈরি
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl border border-slate-200 border-t-4 " + borderColor + " shadow-sm p-5 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-md transition";
        
        card.innerHTML = "<div>" +
            "<div class='flex justify-between items-center mb-4'>" +
                "<div class='text-xs font-bold text-slate-400'># " + (issue.id || '1') + "</div>" +
                "<span class='text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wide " + priorityColor + "'>" + priority + "</span>" +
            "</div>" +
            "<h3 class='font-bold text-[15px] text-slate-800 line-clamp-2 mb-2 leading-snug'>" + (issue.title || 'No Title') + "</h3>" +
            "<p class='text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed'>" + (issue.description || 'No Description') + "</p>" +
            "<div class='flex flex-wrap gap-2 mb-4'>" +
                "<span class='inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full border " + labelStyle + "'>" + labelIcon + " " + labelText + "</span>" +
            "</div>" +
        "</div>" +
        "<div class='border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-medium'>" +
            "<div class='text-slate-400 mb-0.5'>By <span class=" + "'text-slate-500'" + ">" + (issue.author || 'unknown') + "</span></div>" +
            "<div>" + (issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : '1/15/2024') + "</div>" +
        "</div>";

        card.addEventListener("click", function () {
            openModal(issue);
        });

        issuesContainer.appendChild(card);
    });
}

