window.renderPortfolio = function () {
  const list = document.getElementById("project-list");
  if (!list) {
    console.log("[renderPortfolio] #project-list not found");
    return;
  }

  if (!Array.isArray(window.projectsData)) {
    console.log(
      "[renderPortfolio] window.projectsData is not an array",
      window.projectsData,
    );
  } else {
    console.log(
      "[renderPortfolio] rendering projects",
      window.projectsData.length,
    );
  }

  list.innerHTML = (window.projectsData || [])
    .map((p, index) => {
      const dataCategory = p.categories.join(" ");
      const modalAttrs = p.useModal
        ? ` data-modal-trigger data-project-index="${index}"`
        : "";

      const onclickAttr =
        !p.useModal && p.openLinks && p.openLinks.length
          ? ` onclick="${p.openLinks
              .map((u) => `window.open('${u}')`)
              .join(";")};"`
          : "";

      return `
      <li class="project-item active" data-filter-item data-category="${dataCategory}"${modalAttrs}>
        <a href="#"${onclickAttr}>
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${p.image}" alt="${p.imageAlt}" loading="lazy" />
          </figure>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-category">${p.stackLabel}</p>
        </a>
      </li>`;
    })
    .join("");
};
