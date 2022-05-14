module.exports = function(eleventyConfig) {

  eleventyConfig.setNunjucksEnvironmentOptions({
    lstripBlocks: true,
    trimBlocks: true
  });

  eleventyConfig.addPassthroughCopy({ "src/rootcopy": "/" });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
