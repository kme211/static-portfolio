var argv = require("yargs").argv;
const development = argv.env !== "production";
const kebabCase = require("../tools/kebabCase");
const experience = require("../src/experience");
let projects = require("../src/projects");
const logger = require("./logger");
const { siteTitle } = require("../config");

const baseImgUrl =
  "//res.cloudinary.com/ddy54k4ks/image/upload/w_500/f_auto,q_70";
let tags = projects
  .map(project => project.tags)
  .reduce((a, b) => a.concat(b), []);
let tagCloud = {};
tags.forEach(tag => {
  tagCloud[tag] ? tagCloud[tag]++ : (tagCloud[tag] = 1);
});

tagCloud = Object.keys(tagCloud)
  .map(key => {
    return {
      name: key,
      kebabName: kebabCase(key),
      instances: tagCloud[key]
    };
  })
  .sort((a, b) => {
    if (a.instances < b.instances) return 1;
    if (a.instances > b.instances) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

logger.info("Build process started for " + argv.env);

projects = projects
  .sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;
    return 0;
  })
  .map(project => {
    let codeIcon = project.links.code.match("codepen")
      ? "icon-codepen"
      : "icon-github";
    let imgUrl = baseImgUrl + project.imgUrl;
    let classes = project.tags.map(tag => kebabCase(tag));
    return Object.assign({}, project, { codeIcon, imgUrl, classes });
  });

if (development) {
  require("./build.dev")({ siteTitle, projects, tagCloud, experience });
} else {
  require("./build.prod")({ siteTitle, projects, tagCloud, experience });
}
