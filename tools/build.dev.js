const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");
const express = require("express");
const app = express();
const logger = require("./logger");
const config = require("../config");

module.exports = function({ siteTitle, projects, tagCloud, experience }) {
  nunjucks.configure("src/views", {
    autoescape: true,
    express: app,
    watch: true
  });

  app.get("/", (req, res) => {
    res.render("index.html", {
      siteTitle,
      projects,
      tagCloud,
      experience,
      env: "dev"
    });
  });

  app.get("/css/style.css", (req, res) => {
    res
      .type("text/css")
      .send(fs.readFileSync(path.resolve(config.paths.dist, "css/style.css")));
  });

  app.get("/js/main.js", (req, res) => {
    res
      .type("application/javascript")
      .send(fs.readFileSync(path.resolve(config.paths.src, "main.js")));
  });

  app.listen(3000, function() {
    logger.info("Dev server listening on port 3000!");
  });
};
