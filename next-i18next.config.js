const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "ge"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
};
