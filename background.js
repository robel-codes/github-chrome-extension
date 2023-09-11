let username = "";

chrome.runtime.onMessage.addListener(function (message, sender, request) {
  if (message.action === "openReposPage") {
    // Set the username
    username = message.username;

    // Redirect to the repository list page (popup.html)

    // chrome.action.setPopup({ popup: "popup.html" }, function () {
    //   // Log a message to check if setPopup callback is called
    //   console.log("Popup set to repos.html");
    // });
    console.log(chrome);
    console.log(chrome.action);
    console.log(sender);
    console.log(request);
    chrome.tabs.update(sender.id, { url: request.redirect });
  }
});
