document.addEventListener("DOMContentLoaded", function () {
  const usernameForm = document.getElementById("usernameForm");
  const githubUsernameInput = document.getElementById("githubUsername");

  usernameForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = githubUsernameInput.value;

    // Send a message to the background script to open the repository list page
    chrome.runtime.sendMessage({
      action: "openReposPage",
      username: username,
      redirect: "popup.html"
    });
  });
});
