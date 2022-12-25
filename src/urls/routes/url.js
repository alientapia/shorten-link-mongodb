const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');

const router = express.Router();

const Url = require('../model/UrlModel');

// The API base Url endpoint
const baseUrl = process.env.BASE_URL;

router.post('/', async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base URL');
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        const { shortUrl: newUrl } = url;
        res.json({ newUrl });
      } else {
        const shortUrl = `${baseUrl}/${urlCode}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        const { shortUrl: newUrl } = await url.save();

        res.json({ newUrl });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(401).json('Invalid longUrl');
  }
});

module.exports = router;
