window.renderBlog = function () {
  const list = document.getElementById("blog-posts-list");
  if (!list) return;

  list.innerHTML = (window.blogPostsData || [])
    .map(
      (b) => `
      <li class="blog-post-item">
        <a href="${b.url}" target="_blank">
          <figure class="blog-banner-box">
            <img src="${b.image}" alt="${b.imageAlt}" loading="lazy" />
          </figure>
          <div class="blog-content">
            <div class="blog-meta">
              <p class="blog-category">${b.category}</p>
              <span class="dot"></span>
              <time datetime="${b.dateISO}">${b.dateLabel}</time>
            </div>
            <h3 class="h3 blog-item-title">${b.title}</h3>
            <p class="blog-text">${b.description}</p>
          </div>
        </a>
      </li>`
    )
    .join("");
};

