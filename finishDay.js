const finalConclusion = Number(localStorage.getItem("finalProgress"));
const success = document.getElementById("successTasks");
const unsuccess = document.getElementById("unsuccessTasks");
const title = document.getElementById("final-title");
const conclusion = document.getElementById("conclusion");

if (finalConclusion === 100) {
    success.removeAttribute("hidden");
    title.textContent = "Total Concentration";
} else {
    unsuccess.removeAttribute("hidden");
    title.textContent = "Keep Training";
}
conclusion.innerText = `Your final progress: ${Math.round(finalConclusion) || 0}%`;

// Going back home starts a fresh day: the saved task list is cleared.
const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
    localStorage.removeItem("greenProductiveTasks");
    window.electronAPI.loadPage("index.html");
});
