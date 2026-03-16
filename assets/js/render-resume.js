function renderTimeline(listId, items) {
  const el = document.getElementById(listId);
  if (!el) return;

  el.innerHTML = (items || [])
    .map(
      (item) => `
      <li class="timeline-item">
        ${
          item.link
            ? `<a href="${item.link}" target="_blank"><h4 class="h4 timeline-item-title">${item.title}</h4></a>`
            : `<h4 class="h4 timeline-item-title">${item.title}</h4>`
        }
        <span>${item.period}</span>
        ${
          item.issuer
            ? `<p class="timeline-text"><strong>${item.issuer}</strong></p>`
            : ""
        }
        ${
          item.description
            ? `<p class="timeline-text">${item.description}</p>`
            : ""
        }
      </li>`
    )
    .join("");
}

window.renderResume = function () {
  renderTimeline("experience-list", window.experienceData || []);
  renderTimeline("education-list", window.educationData || []);
  renderTimeline("certifications-list", window.certificationsData || []);
};

