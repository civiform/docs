const esbuild = require('esbuild')

module.exports = function(eleventyConfig) {

  eleventyConfig.setNunjucksEnvironmentOptions({
    lstripBlocks: true,
    trimBlocks: true
  });

  eleventyConfig.on("eleventy.after", () => {
    return esbuild.build({
      entryPoints: ["src/js/index.js"],
      bundle: true,
      outdir: "public/js"
    });
  });
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addPassthroughCopy({ "src/rootcopy": "/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
