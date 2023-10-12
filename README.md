# curiouser-paradox

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

Spent more time than necessary with the Mongo portion of my Restore Terminals setup. Can't use `use <db>` commands in a shell script being piped into mongosh because it will suppress all output that follows that command. In any case, I wound up here because I want to run a handful of commands as part of establishing the terminal that handles database interaction. Right now it is outputting the collections and a count of comics but can be expanded to do more as necessary.

Otherwise, I now have the workspace file built with basic Restore Terminal functionality which I've added to the repo. I played around a little bit with adding some buttons for navigation. What I landed on is nice for me, but it's probably too small to be used as the general button suite. I'll use what I made here for now and may retain it for a small screen version of the site later on. As it exists currently, the buttons just always show on the specific-comic component - hang on, I had a thing for this:

- [x] Sort out the comic component problem. Lots of this content I'm working on needs to be shared in some sort of main component that delegates out the details of if it is specific or latest.

Ok anyway, the buttons don't do anything right now except show up. The logic of knowing how there's a next comic is perplexing, so I'll need to stew on how I'm going to resolve that before tomorrow when I handle it:

- [x] Add navigation button functionality.

Oh my god I had a typo in the repo name >\_<. Anyway, I added swagger to the backend because my idea for navigation is to have the specific-comic API call (and latest, I guess) contain the necessary information for navigation. Just prev/next because first and last are implicit either by way of being a static index forever or being the comic with the highest index out of all of them.

I'm adding a bunch of hard-coded `http://localhost:4200` that will need to change later, but I'm not too concerned right now. I added to the API response for any singular comic a pair of attributes that describe the next and previous comics in terms of index which is enough to route and that's exactly what I need. As for the first and last buttons, the logic of whether or not to show them matches with the step-by-1 buttons and so that's handled. As for where these buttons route to, both are special cases which won't ever change (there is a very minor assumption here that index 0 will always be the first comic. This to me is acceptable, but a fix would be to have the getLatest calls simply return the comic with the lowest index) and so their routing is known by the frontend without input from the backend.

Ah yeah, I did a small thing prior to this where I created a single component (MainComic) to handle all comic rendering responsibilities - which is to say I removed the 2 separate components I had charged with this previously. I had imagined there would still be some differentiation between the two components based on the slight differences between latest/specific. In fact, it was much simpler because I can just piggy-back on the code that reads the id param from the URL to determine which comic to show. Interestingly, this only works because I happen to be passing around the route param as a string until the API casts it into a number (causing 500 errors if I route to a path that isn't an integer). This is awkward but I'm not exactly sure where the best point is for the conversion to take place. I know this will cause problems because somewhere else I had a check for truthiness that failed when the id is `0` the number, but here it succeeds because `0` the string is truthy. Neat.

I slapped a header and footer on the site. Using just some basic bootstrap stuff to get something on the page to start and then go from there. In the process of adding the header, I noticed that what was on my app didn't match what I saw on the example, so I dug a bit deeper and it was a version difference. My browser likes to default to returning v4.0 bootstrap docs and I'm using 5.3.0 or whatever. I got that changed, but along the way I modified the way in which I was pulling in bootstrap. Originally I had some lines in the `index.html` that pulled down the bootstrap css and minified js but that's not very angular-ish is it? Instead, I'm pulling in the bootstrap package itself and I also grabbed bootstrap-icons to try it out while I was there. I like this approach a lot better and am curious if it's new? Or maybe I've been sticking with an outdated approach for a while now - not without precedent.

As is tradition, let's think a bit about what comes next. Probably the most important is to attend to the size of the comics themselves. Right now I used an inline style granting a width of `35%` which makes the comic roughly the size I think it should be on half of my giant screen. Any other screen size and it looks bad in some way, so let's sort that out. (Interestingly, the newly added `container` class convention across most of the elements on the page handles the upper bound of this, but smaller screens still suffer)

- [ ] Consider image sizing.

Another thing that jumps out at me is the navigation buttons. They don't really look that good and with the different icon stuff I've been messing with today (bootstrap-icons, https://www.toptal.com/designers/htmlarrows/arrows/, https://thenounproject.com/, one other that I forgot to bookmark), I feel like I can do better than what I've got here right now. Random button would be cool too.

- [ ] Make navigation buttons look better.

- [ ] Add random comic button.

## Couldn't Have Done it Without You

- https://stackoverflow.com/questions/63429380/how-to-serve-static-images-in-nestjs
- https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet
- https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
- https://stackoverflow.com/questions/47344571/how-to-draw-checkbox-or-tick-mark-in-github-markdown-table
- https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe
- https://stackoverflow.com/questions/4837673/how-to-execute-mongo-commands-through-shell-scripts
- https://stackoverflow.com/questions/65806112/pipe-output-from-mongosh-mongodb-shell-to-output-file-windows
- https://stackoverflow.com/questions/39635474/make-smaller-button-in-bootstrap
- https://thenounproject.com/
