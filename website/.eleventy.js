const esbuild = require('esbuild')
const { sassPlugin } = require("esbuild-sass-plugin");


module.exports = function(eleventyConfig) {

  eleventyConfig.setNunjucksEnvironmentOptions({
    lstripBlocks: true,
    trimBlocks: true
  });

  eleventyConfig.on("eleventy.after", () => {
    return esbuild.build({
      entryPoints: ["src/js/index.js", "src/css/index.scss"],
      external: ["*.woff2", "*.woff"],
      bundle: true,
      outdir: "public",
      plugins: [sassPlugin()]
    });
  });
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

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
