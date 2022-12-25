const express = require('express');

const router = express.Router();

const Url = require('../model/UrlModel');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

router.get('/', async (req, res) => {
  res.send(`<h2>Acortador de link v1.0.0</h2>`);
});

module.exports = router;
