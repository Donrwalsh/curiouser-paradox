# curioser-paradox

## Backend

`>nest new backend` > npm

## Frontend

`>npm init @angular frontend` > n > y > SCSS

## Train of Thought

So you start with the frontend, naturally, but the big idea is being delivered images from the backend as sort of a core competency of this whole operation so it feels silly to even mess with serving up images from the assets folder on just the frontend. So I toss on some starter modules of Header, Footer and Comic with basic components to start. Homepage is the LatestComicComponent and everything is squeezed between the Header and Footer. Right now it's just text but how it looks isn't important just yet.

So I made a NestJS backend. Easy enough to work with, there's a way to deliver static files via some straightforward configuration. Unclear if this will work with upload, but a little bit of cursory exploration suggests probably and so that's good enough for now. The thing is this is only exposing the images at particular paths matching the server filepath of the asset in question and I'm not exactly sure how to get that working from an API endpoint. I came up with a simple workaround though which has the backend mocking a data response that provides enough detail for the frontend to handle the direct reference to the asset. This is not perfect, but it is workable and may even be a reasonable way to handle this long-term. This is a lot of new teritory for me so I'm going to play around in this sandbox while I'm here.

Now that the backend can provide images to the frontend in a roundabout way, I went ahead and plugged that in by setting up the LatestComicComponent to read from a 'latest' endpoint that provides a block of data representing what a comic might look like in the database (backed by a simple model file just on the frontened since I want to avoid all the obnoxious casting as `any` nonsense). Now that the frontend has it all, I tossed it on the page and modeled it after xkcd a little bit just to start. I built a 'permanent link to this comic is at ...' hyperlink at the bottom and so I should probably support that type of URL next.

## Couldn't Have Done it Without You

- https://stackoverflow.com/questions/63429380/how-to-serve-static-images-in-nestjs
