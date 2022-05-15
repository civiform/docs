module.exports = function(eleventyConfig) {

  eleventyConfig.setNunjucksEnvironmentOptions({
    lstripBlocks: true,
    trimBlocks: true
  });

  eleventyConfig.addPassthroughCopy({ "src/rootcopy": "/" });
  eleventyConfig.addPassthroughCopy({ "src/sass/fonts": "fonts" });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
