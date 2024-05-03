const path = require("path");
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const prettier = require("prettier");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    lstripBlocks: true,
    trimBlocks: true,
  });

  eleventyConfig.on("eleventy.after", () => {
    return esbuild.build({
      entryPoints: ["src/js/index.js", "src/css/index.scss"],
      external: ["*.woff2", "*.woff"],
      bundle: true,
      outdir: "public",
      plugins: [sassPlugin()],
    });
  });
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
        return prettier.format(content, { parser: "html" });
      default:
        return content;
    }
  });

  eleventyConfig.addPassthroughCopy({ "src/rootcopy": "/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });

  eleventyConfig.addFilter("textDate", (dateObj) => {
    /* Expects an ISO  8601-formatted  string, e.g. YYYY-MM-DD */
    return DateTime.fromISO(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
