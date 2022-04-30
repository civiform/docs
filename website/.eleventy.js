module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/rootcopy": "/" });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
