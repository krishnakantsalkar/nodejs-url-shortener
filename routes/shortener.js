const express = require("express");
const shortModel = require("../models/shortenerSchema");
const validUrl = require("valid-url");
const shortid = require("shortid");
const router = express.Router();

const baseUrl = "http://localhost:3000"; // change to https://maven.to

router.post("/shorten", async (req, res) => {
  try {
    let longUrl = req.body.longUrl;

    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json("Invalid base URL");
    }

    if (validUrl.isUri(longUrl)) {
      const urlCode = shortid.generate();

      let url = await shortModel.findOne({
        longUrl,
      });

      if (url) {
        res.send({ result: url, message: "url already exist" });
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new shortModel({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.send({ result: url, message: "short url generated!" });
      }
    } else {
      res.status(403).json("Invalid longUrl");
    }
  } catch (ex) {
    console.log(ex);
    res.status(403).send(ex.message);
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await shortModel.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    console.log(ex);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
