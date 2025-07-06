module.exports = function (eleventyConfig) {
  // Pass through images
  eleventyConfig.addPassthroughCopy('src/assets/images');

  // Watch CSS and JS source files
  eleventyConfig.addWatchTarget('src/assets/css/');
  eleventyConfig.addWatchTarget('src/assets/js/');

  // Copy the bundle.css from JS output to CSS folder after build
  eleventyConfig.on('eleventy.after', async () => {
    const fs = require('fs').promises;
    const path = require('path');

    try {
      // Check if bundle.css exists next to bundle.js
      const cssSource = path.join('_site/assets/js/bundle.css');
      const cssDest = path.join('_site/assets/css/bundle.css');

      // Create css directory if it doesn't exist
      await fs.mkdir(path.dirname(cssDest), { recursive: true });

      // Copy the CSS file
      await fs.copyFile(cssSource, cssDest);

      // Remove the CSS file from JS folder
      await fs.unlink(cssSource);

      // Also handle source map if it exists
      try {
        await fs.copyFile(cssSource + '.map', cssDest + '.map');
        await fs.unlink(cssSource + '.map');
      } catch (e) {
        // Source map might not exist in production
      }
    } catch (e) {
      // File might not exist on first run
    }
  });

  // Set browser sync config
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/assets/css/*.css', '_site/assets/js/*.js'],
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
