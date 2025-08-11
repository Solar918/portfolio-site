module.exports = function(eleventyConfig) {
  // Copy static assets (CSS, images) to output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Collection of project markdown files for index rendering
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => b.date - a.date);
  });

  // Unique list of tech tags from all projects
  eleventyConfig.addCollection("techTags", function(collectionApi) {
    let tagSet = new Set();
    collectionApi.getFilteredByGlob("src/projects/*.md").forEach(item => {
      if (Array.isArray(item.data.tech)) {
        item.data.tech.forEach(t => tagSet.add(t));
      }
    });
    return Array.from(tagSet).sort();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
