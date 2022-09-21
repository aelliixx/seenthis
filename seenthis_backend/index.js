const express = require('express');
const cors = require('cors')
const app = express();

let path = require('path');
const fs = require("fs");
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use('/videos', express.static('videos'));

app.use(cors())

// Have a list of images to serve from images folder.
// Thumbnails are cropped and resized to 300x300 and saved in thumbnails public folder.
const images = [{
    "id": 1,
    "title": "Apollo 17 Mission image - Sta LM,CDR, Flag,LRV",
    "description": "View of Station Lunar Module,Commander Astronaut Eugene A. Cernan, Flag,Lunar Roving Vehicle taken during the third Extravehicular Activity EVA 3 of the Apollo 17 mission. Original film magazine was labeled E film type was SO-368 Color Exterior, CEX, Ektachrome MS, color reversal 60mm lens with a sun elevation of 36 degrees.",
    "origin": "https://archive.org/download/as17-140-21388/as17-140-21388.jpg",
    "path": "as17-140-21388.jpg",
    "thumbnail": "as17-140-21388_thumbnail.jpg"
}, {
    "id": 2,
    "title": "Apollo 11 Mission image -  Astronaut Edwin Aldrin walks near the Lunar Module",
    "description": "Astronaut Edwin E. Aldrin Jr.,Lunar Module LM pilot, walks near the module as a picture is taken of him. Discoloration is visible on his boots and suit from the lunar soil adhering to them. Reflection of the LM and Astronaut Niel A. Armstrong is visible in Aldrin's helmet visor. Image taken at Tranquility Base during the Apollo 11 Mission. Original film magazine was labeled S. Film Type: Ektachrome EF SO168 color film on a 2.7-mil Estar polyester base taken with a 60mm lens. Sun angle is Medium. Tilt direction is Northeast NE.",
    "origin": "https://archive.org/download/AS11-40-5903/as11-40-5903.jpg",
    "path": "as11-40-5903.jpg",
    "thumbnail": "as11-40-5903_thumbnail.jpg"
}, {
    "id": 3,
    "title": "Apollo 12 Mission image  - Lunar surface near lunar module",
    "description": "Astronauts Charles Conrad Jr.,commander of the Apollo 12 lunar landing mission,stands at the Module Equipment Stowage Assembly MESA on the Lunar Module LM following the first Apollo 12 Extravehicular Activity EVA-1 on the lunar surface. The erectable S-band antenna is already deployed at right. The carrier for the Apollo Lunar Hand Tools ALHT is near Conrad. The images were taken during the first extravehicular activity EVA-1 of the Apollo 12 mission,on Nov. 19,1969. Original film magazine was labeled V,film type was HCEX SO-168 - Ektachrome EF,high-speed color reversal,ASA 160 taken with an 60mm lens. Sun angle was low. Approximate camera tilt was Medium oblique.",
    "origin": "https://archive.org/download/AS12-47-6989/AS12-47-6989.jpg",
    "path": "AS12-47-6989.jpg",
    "thumbnail": "AS12-47-6989_thumbnail.jpg"
}, {
    "id": 4,
    "title": "Apollo 9 Mission image - Scott during EVA",
    "description": "Excellent view of the docked Apollo 9 Command and Service Modules CSM and Lunar Module LM, with Earth in the background, during astronaut David R. Scott's stand-up Extravehicular Activity EVA, on the fourth day of the Apollo 9 Earth-orbital mission. Scott, command module pilot, is standing in the open hatch of the Command Module CM. Film magazine was E,film type was SO-368 Ektachrome with 0.460 - 0.710 micrometers film / filter transmittance response and haze filter,80mm lens.",
    "origin": "https://archive.org/download/AS09-20-3069/AS09-20-3069.jpg",
    "path": "AS09-20-3069.jpg",
    "thumbnail": "AS09-20-3069_thumbnail.jpg"
}, {
    "id": 5,
    "title": "Pre-Launch- Apollo 8 rollout",
    "description": "The Apollo 8 Spacecraft 103/Saturn 503 space vehicle on the way from the Kennedy Space Center's KSC Vehicle Assembly Building VAB to Pad A, Launch Complex 39. The Saturn V stack and its mobile launch tower are atop a huge crawler-transporter.",
    "origin": "https://archive.org/download/S68-49399/S68-49399.jpg",
    "path": "S68-49399.jpg",
    "thumbnail": "S68-49399_thumbnail.jpg"
}]

// Thumbnails for the videos are randomly selected frames from the video itself, stored in the thumbnails public folder.
// I did it manually, but if there was a way to upload new videos, we could have thumbnail generation here.
const videos = [
    {
        "id": 1,
        "title": "Elephants Dream",
        "description": "Emo and Proog are two men exploring a strange industrial world of the future.",
        "origin": "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
        "length": 654000,
        "path": "ed_1024_512kb.mp4",
        "thumbnail": "ed_1024_512kb_thumbnail.jpg"
    },
    {
        "id": 2,
        "title": "Big Buck Bunny",
        "description": "A recently awoken enormous and utterly adorable fluffy rabbit is heartlessly harassed by a flying squirrel's gang of rodents who are determined to squash his happiness.",
        "origin": "https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4",
        "length": 596000,
        "path": "BigBuckBunny_512kb.mp4",
        "thumbnail": "BigBuckBunny_512kb_thumbnail.jpg"
    },
    {
        "id": 3,
        "title": "Sintel",
        "description": "The film follows a girl named Sintel who is searching for a baby dragon she calls Scales.",
        "origin": "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
        "length": 888000,
        "path": "sintel-2048-stereo_512kb.mp4",
        "thumbnail": "sintel-2048-stereo_512kb_thumbnail.jpg"
    }
]

app.get('/api/health', (req, res) => {
    res.send('OK');
});

app.get('/api/images', (req, res) => {
    res.send(images.map(image => {
        return {
            id: image.id,
            title: image.title,
            description: image.description,
            thumbnail: image.thumbnail
        }
    }));
});

app.get('/api/images/:id', (req, res) => {
    const image = images.find(image => image.id === parseInt(req.params.id));
    if (!image) {
        res.status(404).send('The image with the given ID was not found.');
        return;
    }
    res.sendFile(__dirname + '/images/' + image.path);
});

app.get('/api/videos', (req, res) => {
    res.send(videos.map(video => {
        return {
            id: video.id,
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail
        }
    }));
});

app.get('/api/videos/:id', (req, res) => {
    // The way videos are served is different to that of the images, because the latter are downloaded as a whole
    // and the former are streamed in order to prevent downloading the whole video each time it is played on the front
    // end. Since I've not done this before, I've used the following guide as a reference:
    // https://hackernoon.com/nodejs-tutorial-how-to-build-a-video-streaming-application-in-10-minutes
    const video = videos.find(video => video.id === parseInt(req.params.id));
    if (!video) {
        res.status(404).send('The video with the given ID was not found.');
        return;
    }
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Range must be provided");
        return;
    }

    console.log("Streaming video: " + video.path + " with range: " + range);

    const videoPath = __dirname + '/videos/' + video.path;
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 10 ** 6; // 10 powered by 6 equal 1000000bytes = 1mb

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, {start, end});
    videoStream.pipe(res);
});

// The front end hardcoded the port to 8080, otherwise we'd use an environment variable.
// Purely for time saving purposes as it's not a production app.
const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));