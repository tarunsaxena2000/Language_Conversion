const express = require('express');
const bodyParser = require('body-parser');
const translate = require('translate-google');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const translatedText = await translate(text, { to: 'fr' });
    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
