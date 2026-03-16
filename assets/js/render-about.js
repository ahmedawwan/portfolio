window.renderAbout = function () {
  const servicesList = document.getElementById("services-list");
  const skillsList = document.getElementById("skills-list");

  if (!servicesList || !skillsList) return;

  servicesList.innerHTML = (window.servicesData || [])
    .map(
      (s) => `
      <li class="service-item">
        <div class="service-icon-box">
          <img src="${s.icon}" alt="${s.alt}" width="40" />
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${s.title}</h4>
          <p class="service-item-text">${s.description}</p>
        </div>
      </li>`
    )
    .join("");

  skillsList.innerHTML = (window.skillsData || [])
    .map(
      (sk) => `
      <li class="skills-item">
        <div class="title-wrapper">
          <h5 class="h5">${sk.name}</h5>
          <data value="${sk.value}">${sk.value}%</data>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" style="width: ${sk.value}%"></div>
        </div>
      </li>`
    )
    .join("");
};

