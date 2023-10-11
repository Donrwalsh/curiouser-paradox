# curioser-paradox

## Backend

`>nest new backend` > npm

## Database

MongoDB server running as a service on my Windows machine. Default configuration, local for now so completely open (i.e. no creds required to access). Lots to do here, but for now the exact snapshot of the database will be represented as json files in the repo by way of manual effort.

## Frontend

`>npm init @angular frontend` > n > y > SCSS

## Train of Thought

So you start with the frontend, naturally, but the big idea is being delivered images from the backend as sort of a core competency of this whole operation so it feels silly to even mess with serving up images from the assets folder on just the frontend. So I toss on some starter modules of Header, Footer and Comic with basic components to start. Homepage is the LatestComicComponent and everything is squeezed between the Header and Footer. Right now it's just text but how it looks isn't important just yet.

So I made a NestJS backend. Easy enough to work with, there's a way to deliver static files via some straightforward configuration. Unclear if this will work with upload, but a little bit of cursory exploration suggests probably and so that's good enough for now. The thing is this is only exposing the images at particular paths matching the server filepath of the asset in question and I'm not exactly sure how to get that working from an API endpoint. I came up with a simple workaround though which has the backend mocking a data response that provides enough detail for the frontend to handle the direct reference to the asset. This is not perfect, but it is workable and may even be a reasonable way to handle this long-term. This is a lot of new teritory for me so I'm going to play around in this sandbox while I'm here.

Now that the backend can provide images to the frontend in a roundabout way, I went ahead and plugged that in by setting up the LatestComicComponent to read from a 'latest' endpoint that provides a block of data representing what a comic might look like in the database (backed by a simple model file just on the frontened since I want to avoid all the obnoxious casting as `any` nonsense). Now that the frontend has it all, I tossed it on the page and modeled it after xkcd a little bit just to start. I built a 'permanent link to this comic is at ...' hyperlink at the bottom and so I should probably support that type of URL next.

That's what I'm going to work on, but something is funky about the way I'm putting together my comic components. I'm going to need to duplicate a lot of content on this 'specific-comic-component' or whatever and yet nothing springs to mind immediately here, so I'll just go ahead and do the naive approach to get something that's functional. I made the frontend component but then got lost in the sauce on the backend.

I'm reaching my end time for the evening, so let's wrap up. I spent some time putting together the database to hold onto the comics data and then used a simple mongoose connection to pull the data into the API to ultimately make available to the frontend. That last bit isn't complete yet, so first:

- [x] Complete the full-circle database -> backend -> frontend data flow for the single data item in use right now.

There's a weird issue that I can't sort out on the backend. When I try to use the get specific comic route for an index that doesn't exist, it outright throws a 404 and so is somehow failing the try-catch block I added to handle this sort of thing. Perhaps I'm missing an await somewhere? I'll look into it with fresh eyes.

- [x] Bug with specific comic route when path is invalid.

Otherwise things are going well. I'm still pulling the basics together, but I'm feeling good about the structure and overall progress of the day!

Started the day off with working on the first checkbox above. The full circle bit was pretty easy to get in place and all it really took was pulling out the mock data and plugging stuff in together. Now a user can access the first comic in two different ways (because it is also the latest comic). I am thinking about the navigation between comics too, so that'll be coming up soon to work on.

Did a little bit of prep work cleaning up the subscribe call to actually handle error responses. With a little bit of thought about this, I decided that the 'not_found' comic is really a frontend construct and therefore doesn't need to exist in the database. That's helpful too, because it being in the database is sorta awkward for retrieval operations I have planned, and not having to deal with an omission on nearly every sort is going to be convenient. The current 404 image is a stand-in that nicely demonstrates the extent of my artistic competencies.

That handles the two todos I had identified yesterday, so what's next? The two things that quickly come to mind are unit tests and a restore terminals setup. Ooh, actually the latter will involve reminding myself how to interact with the database so I think I'll set up all 3 with this. I'm thinking too a set of 3x split terminals each of them split between the primary app-runner and a secondary terminal for tests or commands or what have you. That sounds fun, I'm going to do that next.

## Couldn't Have Done it Without You

- https://stackoverflow.com/questions/63429380/how-to-serve-static-images-in-nestjs
- https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet
- https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
- https://stackoverflow.com/questions/47344571/how-to-draw-checkbox-or-tick-mark-in-github-markdown-table
- https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe
