const fs = require("fs-extra");
const path = require("path");
const logger = require("./logger");
const { paths } = require("../config");
const directories = ["css", "js"];

async function setup() {
  try {
    await fs.copy(path.resolve(paths.src, "static"), paths.dist);
    logger.success("✓ Copied static files to dist");
  } catch (err) {
    logger.error(err);
  }

  for (const dir of directories) {
    try {
      await fs.ensureDir(path.resolve(paths.dist, dir));
      logger.success(`✓ ${dir} directory created sucessfully`);
    } catch (err) {
      logger.error(err);
    }
  }
}

setup();
