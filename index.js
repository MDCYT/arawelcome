const express = require('express');
const {createCanvas, loadImage} = require('canvas');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const canvas = createCanvas(2048, 1173);
    //Get in img the bg.png for bg of the image
    const img = await loadImage(__dirname + '/public/img/bg.png').then(img => {
        return img;
    });
    //Get in canvas the canvas
    //Get in ctx the context of the canvas
    const ctx = canvas.getContext('2d');
    //Get in img2 the image of the url
    const downloadedImage = await (await fetch(req.query.url)).buffer();
    const img2 = await loadImage(downloadedImage).then(img2 => {
        return img2;
    });
    console.log(img2);
    //Set the image in the center of the canvas, with a 200px width and a 200px height, if overpass the canvas, it will be cropped, and make a corner radius of 100px
    //Set the image in the center of the canvas, with a 200px width and a 200px height, if overpass the canvas, it will be cropped, and make a corner radius of 100px
    ctx.drawImage(img, 0, 0, 2048, 1173);
    // //Make corner radius of 100px
    // ctx.drawImage(img2, );
    // //Send the image in view as a png
    //Make corner radius of 100px for img2
    ctx.beginPath();
    ctx.arc(img.width / 2 - 50, img.height / 2 - 250, 200, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img2, img.width / 2 - 500 / 2, img.height / 2 - 900 / 2, 400, 400);
    //Send the image in view as a png
    res.send(`<img src="${canvas.toDataURL()}">`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);