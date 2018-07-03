const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");
const minify = require("html-minifier").minify;
const CleanCSS = require("clean-css");
const logger = require("./logger");
const config = require("../config");

module.exports = function({ siteTitle, projects, tagCloud, experience }) {
  const stylesPath = path.resolve(config.paths.dist, "css/style.css");
  fs.readFile(stylesPath, (err, data) => {
    if (err) return logger.error(err);
    const options = {};
    const output = new CleanCSS(options).minify(data);
    fs.writeFile(stylesPath, output.styles, () => {
      logger.success("✓ Minified css written");
    });
  });

  nunjucks.configure(path.resolve(config.paths.src, "views"));

  const rendered = nunjucks.render("index.html", {
    siteTitle,
    projects,
    tagCloud,
    experience,
    env: "production"
  });

  fs.writeFile(
    path.resolve(config.paths.dist, "index.html"),
    minify(rendered, {
      removeComments: true,
      removeAttributeQuotes: true,
      collapseWhitespace: true
    }),
    () => logger.success("✓ Minified index.html written")
  );
};
