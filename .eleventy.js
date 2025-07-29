module.exports = function (eleventyConfig) {
  /* ─────────────────────────── Passthroughs ─────────────────────────── */
  // Pass through images
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/js');

  /* ────────────────────────── Custom Collections ─────────────────────── */
  // Locations collection – makes the data in src/_data/locations.json
  // available via collections.locations in your templates
  eleventyConfig.addCollection('locations', () => {
    // Adjust the path if you move your data file
    return require('./src/_data/locations.json');
  });

  /* ─────────────────────── Extra Watch Targets ───────────────────────── */
  eleventyConfig.addWatchTarget('src/assets/css/');
  eleventyConfig.addWatchTarget('src/assets/js/');

  /* ────────────────────── Post-build CSS Relocation ──────────────────── */
  eleventyConfig.on('eleventy.after', async () => {
    const fs = require('fs').promises;
    const path = require('path');

    try {
      // Source and destination for bundle.css
      const cssSource = path.join('_site/assets/js/bundle.css');
      const cssDest = path.join('_site/assets/css/bundle.css');

      // Ensure the destination folder exists
      await fs.mkdir(path.dirname(cssDest), { recursive: true });

      // Copy CSS (and sourcemap, if present) then clean up original
      await fs.copyFile(cssSource, cssDest);
      await fs.unlink(cssSource);
      try {
        await fs.copyFile(cssSource + '.map', cssDest + '.map');
        await fs.unlink(cssSource + '.map');
      } catch {
        /* map may not exist in production */
      }
    } catch {
      /* bundle.css may not exist on first run */
    }
  });

  /* ─────────────────────────── Browser-Sync ──────────────────────────── */
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/assets/css/*.css', '_site/assets/js/*.js'],
  });

  /* ─────────────────────────── Directory Map ─────────────────────────── */
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
