module.exports = function(eleventyConfig) {
 // Pass through CSS
 eleventyConfig.addPassthroughCopy("src/assets/css");
 eleventyConfig.addPassthroughCopy("src/assets/images");
 
 // Watch CSS for changes
 eleventyConfig.addWatchTarget("src/assets/css/");
 
 // Ignore files
 eleventyConfig.ignores.add("README.md");
 eleventyConfig.ignores.add("node_modules/**/*");
 
 return {
   dir: {
     input: "src",
     output: "_site",
     includes: "_includes",
     layouts: "_layouts",
     data: "_data"
   },
   templateFormats: ["njk", "md", "html"],
   htmlTemplateEngine: "njk",
   markdownTemplateEngine: "njk"
 };
};
