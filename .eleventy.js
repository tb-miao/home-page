export default function(eleventyConfig) {
  eleventyConfig.setInputDirectory("content");
  eleventyConfig.setIncludesDirectory("../templates");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addPassthroughCopy({
    public: "."
  });

  eleventyConfig.addShortcode("iconLink", function(iconClass, label, href, className = "") {
    const escapeAttr = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const escapeHtml = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const rawHref = String(href || "");
    const isExternal = /^https?:\/\//i.test(rawHref);
    const isRelative = /^\/(?!\/)/.test(rawHref);
    const safeHref = isExternal || isRelative ? rawHref : "#";
    const safeIconClass = escapeAttr(iconClass);
    const safeClassName = escapeAttr(className);
    const safeLabel = String(label || "");
    const text = safeLabel ? `&nbsp;${escapeHtml(safeLabel)}` : "";
    const extraClass = safeClassName ? ` class="${safeClassName}"` : "";
    const targetAttrs = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
    const ariaLabel = safeLabel ? "" : ` aria-label="${escapeAttr(safeHref)}"`;
    return `<a href="${escapeAttr(safeHref)}"${targetAttrs}${extraClass}${ariaLabel}><i class="${safeIconClass}" aria-hidden="true"></i>${text}</a>`;
  });

  eleventyConfig.addPairedShortcode("listRow", function(content) {
    return `<div class="list-container"><div class="list-row">${content}</div></div>`;
  });

  eleventyConfig.addPairedShortcode("projectGrid", function(content) {
    return `<div class="projects-section"><h3 class="projects-title"><i class="fa-solid fa-folder-open"></i>&nbsp;我的项目</h3><div class="projects-grid">${content}</div></div>`;
  });

  eleventyConfig.addShortcode("projectCard", function(title, description, href, stars = 0, language = "") {
    const escapeAttr = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const escapeHtml = (value = "") =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const rawHref = String(href || "");
    const isExternal = /^https?:\/\//i.test(rawHref);
    const safeHref = isExternal ? rawHref : "#";
    const targetAttrs = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);
    const safeLanguage = escapeHtml(language);

    return `<div class="project-card"><a href="${escapeAttr(safeHref)}"${targetAttrs} class="project-card-link"><div class="project-header"><h4 class="project-title">${safeTitle}</h4>${stars > 0 ? `<span class="project-stars"><i class="fa-solid fa-star"></i>${stars}</span>` : ""}</div><p class="project-description">${safeDescription}</p>${safeLanguage ? `<span class="project-language">${safeLanguage}</span>` : ""}</a></div>`;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
