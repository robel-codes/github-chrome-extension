document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const repoList = document.getElementById("repoList");

  const username = chrome.extension.getBackgroundPage().username;

  // Function to fetch and display repositories based on the search query
  const fetchAndDisplayRepos = async (searchQuery = "") => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();

      // Filter repositories based on the search query
      const filteredRepos = data.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Clear the existing list
      repoList.innerHTML = "";

      // Display the filtered repositories
      filteredRepos.forEach((repo) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = repo.html_url;
        a.textContent = repo.name;

        a.target = "_blank"; // Open link in a new tab
        a.addEventListener("click", (event) => {
          event.preventDefault();
          chrome.tabs.create({ url: repo.html_url });
        });

        li.appendChild(a);
        repoList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
    }
  };

  // Initial fetch and display of repositories
  fetchAndDisplayRepos();

  // Add an event listener to the search input
  searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value;
    fetchAndDisplayRepos(searchQuery);
  });
});
