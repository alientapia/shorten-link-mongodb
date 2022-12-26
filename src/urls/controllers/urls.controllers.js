const Url = require('../model/UrlModel');
const validator = require('validator');
const shortid = require('shortid');

const acortarLink = async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL;
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).send({ message: 'Invalid url' });
    }
    const validLongUrl = validator.isURL(longUrl);

    if (!validLongUrl) {
      return res.status(400).send({ message: 'Invalid url' });
    }
    const urlFound = await Url.findOne({ longUrl });
    if (urlFound) {
      const { shortUrl: newUrl } = urlFound;
      return res.status(200).send({ newUrl });
    }
    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;
    const newUrl = new Url({ longUrl, shortUrl, urlCode, date: new Date() });

    const urlSaved = await newUrl.save();
    if (!urlSaved) {
      return res.status(400).send({ message: 'Invalid url' });
    }
    const { shortUrl: nuevaUrl } = urlSaved;
    return res.status(200).send({ nuevaUrl });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const redirectLink = async (req, res) => {
  try {
    const { code } = req.params;
    const urlFound = await Url.findOne({
      urlCode: code,
    });
    if (!urlFound) {
      return res.status(404).json('No URL Found');
    }
    return res.redirect(urlFound.longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server Error');
  }
};

const homeLink = async (req, res) => {
  return res.status(200).send('<h1>Acortador de link</h1>');
};

module.exports = { acortarLink, redirectLink, homeLink };
