document.addEventListener("DOMContentLoaded", function () {
  const sidebarRoot = document.getElementById("sidebar-root");
  const navbarRoot = document.getElementById("navbar-root");
  const pageRoot = document.getElementById("page-root");

  if (!sidebarRoot || !navbarRoot || !pageRoot) {
    return;
  }

  function loadPartial(url) {
    return fetch(url).then((res) => res.text());
  }

  Promise.all([
    loadPartial("./components/sidebar.html"),
    loadPartial("./components/navbar.html"),
    loadPartial("./components/about.html"),
    loadPartial("./components/resume.html"),
    loadPartial("./components/portfolio.html"),
    loadPartial("./components/blog.html"),
    loadPartial("./components/project-modal.html"),
  ])
    .then(
      ([
        sidebarHtml,
        navbarHtml,
        aboutHtml,
        resumeHtml,
        portfolioHtml,
        blogHtml,
        modalHtml,
      ]) => {
        sidebarRoot.innerHTML = sidebarHtml;
        navbarRoot.innerHTML = navbarHtml;
        pageRoot.innerHTML =
          aboutHtml + "\n" + resumeHtml + "\n" + portfolioHtml + "\n" + blogHtml + "\n" + modalHtml;
      }
    )
    .then(() => {
      // After partials are injected, render data-driven content and initialize behavior.
      if (window.renderAbout) window.renderAbout();
      if (window.renderResume) window.renderResume();
      if (window.renderPortfolio) window.renderPortfolio();
      if (window.renderBlog) window.renderBlog();
      if (window.initSite) window.initSite();
      if (window.initProjectModal) window.initProjectModal();
    })
    .catch((err) => {
      console.error("Failed to load components", err);
    });
});

