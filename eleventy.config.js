module.exports = function (eleventyConfig) {
  // Static assets copied verbatim to the output. Paths are inside the input
  // dir, so Eleventy strips "src/" — e.g. src/images → /images.
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // The Decap admin is copied verbatim (above); don't treat its index.html as
  // a template.
  eleventyConfig.ignores.add("src/admin/**");

  // Re-run the dev server when these change.
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");

  // Blog posts, newest first.
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );

  // Polish long-form date, e.g. "23 lipca 2025".
  const MONTHS_PL = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
  ];
  eleventyConfig.addFilter("datePL", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return `${d.getUTCDate()} ${MONTHS_PL[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("startsWith", (str, prefix) =>
    (str || "").startsWith(prefix)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
