const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'airpods.jpg', url: 'https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg' },
    { name: 'switch.jpg', url: 'https://m.media-amazon.com/images/I/61S9df6k9uL._AC_SL1500_.jpg' },
    { name: 'mxmaster.jpg', url: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg' },
    { name: 'hydroflask.jpg', url: 'https://m.media-amazon.com/images/I/618S899nL-L._AC_SL1500_.jpg' },
    { name: 'bellroy.jpg', url: 'https://m.media-amazon.com/images/I/71Z-T8G9f8L._AC_SL1500_.jpg' },
    { name: 'applewatch.jpg', url: 'https://m.media-amazon.com/images/I/716u7T9I8VL._AC_SL1500_.jpg' },
    { name: 'anker.jpg', url: 'https://m.media-amazon.com/images/I/61pDbtm0SGL._AC_SL1500_.jpg' },
    { name: 'hue.jpg', url: 'https://m.media-amazon.com/images/I/71lF8z2Z8LL._AC_SL1500_.jpg' },
    { name: 'mixer.jpg', url: 'https://m.media-amazon.com/images/I/71YV6m-uRcL._AC_SL1500_.jpg' },
    { name: 'aeron.jpg', url: 'https://m.media-amazon.com/images/I/71P7tV2H7aL._AC_SL1500_.jpg' },
    { name: 'timbuk2.jpg', url: 'https://m.media-amazon.com/images/I/81Pz-U5W30L._AC_SL1500_.jpg' },
    { name: 'rayban.jpg', url: 'https://m.media-amazon.com/images/I/51r5Y-z6YML._AC_SL1500_.jpg' },
    { name: 'bose.jpg', url: 'https://m.media-amazon.com/images/I/51p8I6yM2QL._AC_SL1500_.jpg' },
    { name: 'seagate.jpg', url: 'https://m.media-amazon.com/images/I/71f-vVw2VGL._AC_SL1500_.jpg' },
    { name: 'pixel.jpg', url: 'https://m.media-amazon.com/images/I/71-0Y7m0iGL._AC_SL1500_.jpg' },
    { name: 'tab.jpg', url: 'https://m.media-amazon.com/images/I/71N15g-uROL._AC_SL1500_.jpg' },
    { name: 'matte_grey_desktop_mat.jpg', url: 'https://m.media-amazon.com/images/I/71Yv8q2m1qL._AC_SL1500_.jpg' }
];

const downloadDir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

images.forEach(img => {
    const file = fs.createWriteStream(path.join(downloadDir, img.name));
    https.get(img.url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${img.name}`);
        });
    }).on('error', (err) => {
        fs.unlink(path.join(downloadDir, img.name));
        console.error(`Error downloading ${img.name}: ${err.message}`);
    });
});
