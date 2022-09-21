## Running the app

### Prerequisites

Building the front-end requires docker and docker-compose.
The docker image uses host network type, so ports 8080 and 3000 should be free.

### Running the back-end

```
cd seenthis_backend
node .
```

### Running the front-end

```
cd seenthis
docker-compose up
```

You should be all set!

## Design decisions

I used NextJs as the front-end framework of choice, as I have the most experience with it. NextJs allows for very easy API pages that would've made this code challenge all too easy, on top of the spec requiring a separate back-end, so that was implemented in plain Node.

I spent a not insignificant amount of time unsure of how I want the webapp to look like. Wanting to keep it simple, but stylish, I took a lot of inspiration from my personal website, with the gallery-like grid layout. Hovering over the grid tiles exposes an animated title and description, which not only looks and feels great, but also shows off some neat accessibility tricks, specifically for mobile or touch input users.

One drawback of the gallery approach, especially in the code challenge with given requirements, is the need for thumbnails. In this case, where the number of images and videos does not change, the thumbnails we're made with a simple python script to extract a random frame, or crop the images to a smaller size. If it were a production application, these scripts could be brought into the API to generate thumbnails as new content is uploaded to the server.

Thumbnails allow for only a small file to be downloaded to enable the gallery preview. Once the image is selected, the full-size picture is requested from the API. Likewise with the videos, a small image is used as a thumbnail, and only streamed in chunks when a user clicks and opens it.

So, while not part of the spec, I felt a gallery was the best looking and functional approach, although I did try a simple text list of media initially.


Video playback feature was poorly described in the spec, and given that I had spent a handful of hours on this already, I decided to leave it out.

More nuanced design decisions are documented in the code, as comments.


## Conclusion

This was quite a fun little challenge, which forced me to explore new areas I hadn't worked with before, such as video streaming from an API. While serving images, json, or entire video files is trivial, streaming videos in chunks is something I had not done before, although it turned out to be almost as trivial, so I'm glad I had the chance to explore it.

Docker is also something I had a brief exchange with in the past, and while the docker setup in this challenge is nothing to write home about, I do intend to explore it a fair bit deeper in my personal projects.
