const HTMLData = require("./html.json");
const CSSData = require("./css.json");

const CombinedData = [...HTMLData, ...CSSData];

module.exports = CombinedData;
