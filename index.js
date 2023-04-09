const express = require('express');
const {createCanvas, loadImage} = require('canvas');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function convertDiscordImageURL(url) {
    // Verificar si la URL tiene la estructura adecuada
    const regex = /^https:\/\/cdn\.discordapp\.com\/avatars\/\d+\/\w+\.(?:png|jpg|jpeg|gif|webp)$/i;
    if (!regex.test(url)) {
      return false;
    }
  
    // Obtener la extensión de archivo de la URL
    const extension = url.split('.').pop().toLowerCase();
  

    // Verificar si la extensión es diferente a PNG
    if (extension !== 'png') {
      // Reemplazar la extensión en la URL por .png
      return url.replace(`.${extension}`, '.png');
    }

  
    return url; // La URL ya es PNG, no se necesita convertir
  }
  

app.get('/', async (req, res) => {
    if(!req.query.url) return res.send('No url');
    let url = convertDiscordImageURL(req.query.url);
    if(!url) return res.send('Not a discord url');
    const canvas = createCanvas(2048, 1173);
    //Get in img the bg.png for bg of the image
    const img = await loadImage(__dirname + '/public/img/bg.png').then(img => {
        return img;
    });
    //Get in canvas the canvas
    //Get in ctx the context of the canvas
    const ctx = canvas.getContext('2d');
    //Get in img2 the image of the url
    const downloadedImage = await (await fetch(url)).buffer();
    const img2 = await loadImage(downloadedImage).then(img2 => {
        return img2;
    });
    const black = await loadImage(__dirname + '/public/img/Black_colour.jpg').then(black => {
        return black;
    });
    console.log(img2);
    //Set the image in the center of the canvas, with a 200px width and a 200px height, if overpass the canvas, it will be cropped, and make a corner radius of 100px
    //Set the image in the center of the canvas, with a 200px width and a 200px height, if overpass the canvas, it will be cropped, and make a corner radius of 100px
    ctx.drawImage(img, 0, 0, 2048, 1173);
    //Insert Text
    ctx.font = 'bold 100px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText('MDC#0001', img.width / 2 + 0, img.height / 2 + 300);
    //Insert more text with a shadow
    ctx.font = 'bold 100px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    ctx.fillText('MDC#0001', img.width / 2 + 0, img.height / 2 + 300);

    //Insert more text for a welcome message
    ctx.font = 'bold 100px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 10;
    ctx.fillText('Welcome to the server!', img.width / 2 - 300, img.height / 2 + 450);
    //Make corner radius of 100px for img2
    ctx.beginPath();
    ctx.arc(img.width / 2 + 250, img.height / 2 - 150, 300, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    // Make a bg black for if the image is transparent
    ctx.drawImage(black, 0, 0, 2048, 1173);
    ctx.drawImage(img2, img.width / 2 - 50, img.height / 2 - 450, 600, 600);
    //Show the image in view, withouth saving or using html
    // res.setHeader('Content-Type', 'image/png')
    // res.setHeader('Content-Disposition', 'attachment; filename="image.png"')
    // res.send(canvas.toBuffer());
    res.send('<img src="' + canvas.toDataURL() + '" />');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);