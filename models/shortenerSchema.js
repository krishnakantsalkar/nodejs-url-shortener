const mongoose = require("mongoose");

let shortenerSchema = new mongoose.Schema({
  urlCode: { type: String }, //uniqe urlcode
  longUrl: { type: String }, //actual full url
  shortUrl: { type: String }, //http://baseurl/urlCode
  date: {
    type: String,
    default: Date.now,
  },
});

let shortenerModel = mongoose.model("shortUrls", shortenerSchema);

module.exports = shortenerModel;
