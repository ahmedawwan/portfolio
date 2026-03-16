"use strict";

window.initProjectModal = function () {
  const modalTriggers = document.querySelectorAll("[data-modal-trigger]");
  console.log("[initProjectModal] found modal triggers:", modalTriggers.length);
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const modalOverlay = document.querySelector("[data-overlay]");
  const modalRoot = document.querySelector("[data-project-modal]");
  const modalImg = document.querySelector("[data-project-modal] [data-modal-img]");
  const modalTitle = document.querySelector("[data-project-modal] [data-modal-title]");
  const modalText = document.querySelector("[data-project-modal] [data-modal-text] p");
  const modalExpertise = document.querySelector(
    "[data-project-modal] [data-modal-expertise]"
  );
  const playstoreLink = document.querySelector(
    "[data-project-modal] [data-playstore-link]"
  );
  const appstoreLink = document.querySelector(
    "[data-project-modal] [data-appstore-link]"
  );
  const amazonLink = document.querySelector(
    "[data-project-modal] [data-amazon-link]"
  );
  const webLink = document.querySelector(
    "[data-project-modal] [data-web-link]"
  );
  const githubLink = document.querySelector(
    "[data-project-modal] [data-github-link]"
  );

  if (
    !modalContainer ||
    !modalCloseBtn ||
    !modalOverlay ||
    !modalRoot ||
    !modalImg ||
    !modalTitle ||
    !modalText ||
    !modalExpertise ||
    !playstoreLink ||
    !appstoreLink
  ) {
    console.log("[initProjectModal] missing critical modal elements", {
      modalContainer,
      modalCloseBtn,
      modalOverlay,
      modalRoot,
      modalImg,
      modalTitle,
      modalText,
      modalExpertise,
      playstoreLink,
      appstoreLink,
      amazonLink,
      webLink,
      githubLink,
    });
    return;
  }

  function setLinkVisibility(anchor, url) {
    if (!anchor) return;
    if (url) {
      anchor.href = url;
      anchor.style.display = "inline-flex";
    } else {
      anchor.href = "";
      anchor.style.display = "none";
    }
  }

  function openModalForProjectIndex(index) {
    console.log("[initProjectModal] openModalForProjectIndex called with", index);
    const idx = typeof index === "string" ? parseInt(index, 10) : index;
    if (!Array.isArray(window.projectsData) || isNaN(idx)) return;

    const project = window.projectsData[idx];
    if (!project) {
      console.log("[initProjectModal] no project found at index", idx);
      return;
    }

    modalImg.src = project.image || "";
    modalImg.alt = project.imageAlt || project.title || "Project image";
    modalTitle.textContent = project.title || "";
    modalText.textContent = project.description || "";

    const expertise = project.expertise;
    modalExpertise.innerHTML = "";
    let tags = [];
    if (Array.isArray(expertise)) {
      tags = expertise;
    } else if (typeof expertise === "string") {
      tags = expertise.split(",").map((t) => t.trim()).filter(Boolean);
    }
    tags.forEach((label) => {
      const span = document.createElement("span");
      span.textContent = label;
      modalExpertise.appendChild(span);
    });

    const links = project.links || {};
    setLinkVisibility(playstoreLink, links.playStore || "");
    setLinkVisibility(appstoreLink, links.appStore || "");
    setLinkVisibility(amazonLink, links.amazon || "");
    setLinkVisibility(webLink, links.web || "");
    setLinkVisibility(githubLink, links.github || "");

    console.log("[initProjectModal] opening modal for project", project.title);
    modalContainer.classList.add("active");
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      console.log("[initProjectModal] trigger clicked", trigger);
      event.preventDefault();

      const projectIndex = trigger.getAttribute("data-project-index");
      openModalForProjectIndex(projectIndex);
    });
  });

  modalCloseBtn.addEventListener("click", () => {
    modalContainer.classList.remove("active");
  });

  modalOverlay.addEventListener("click", () => {
    modalContainer.classList.remove("active");
  });

  // Close when clicking on the dimmed area outside the modal card
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      modalContainer.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalContainer.classList.contains("active")) {
      modalContainer.classList.remove("active");
    }
  });
};

