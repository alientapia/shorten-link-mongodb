const { Schema, model } = require('mongoose');

const urlSchema = new Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model('Url', urlSchema);
