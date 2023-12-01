const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
console.log('found image savedsss');

const base64ToImageMiddleware = (req, res, next) => {
  const { Image } = req.body;

  if (Image && /^data:image\/\w+;base64,/.test(Image)) {
    console.log('Found image, saving...');

    // Extract base64 data and create a buffer
    const base64Data = Image.replace(/^data:image\/\w+;base64,/, "");
    const bufferData = Buffer.from(base64Data, 'base64');

    // Generate a unique filename
    const fileName = uuidv4() + '.jpg';
    const filePath = path.join(__dirname, '../public/images/', fileName);
    const filePathSave = '/images/' + fileName;

    // Write the buffer data to the file
    fs.writeFile(filePath, bufferData, (err) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        req.body.Image = filePathSave;
        console.log('Image saved successfully');
        console.log(req.body.Image);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = base64ToImageMiddleware;


module.exports = base64ToImageMiddleware;