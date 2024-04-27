const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/image/*", async (req, res) => {
  const imageUrl = decodeURIComponent(req.originalUrl.substr(7));
  console.log(imageUrl);

  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
      }
    });

    res.set('Content-Type', imageResponse.headers['content-type']);

    imageResponse.data.pipe(res);
  } catch (error) {
    console.error('Failed to retrieve the image:', error);
    res.status(500).send("Failed to retrieve image");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});