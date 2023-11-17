# Train of Thought

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

- [x] Consider image sizing.

Another thing that jumps out at me is the navigation buttons. They don't really look that good and with the different icon stuff I've been messing with today (bootstrap-icons, https://www.toptal.com/designers/htmlarrows/arrows/, https://thenounproject.com/, one other that I forgot to bookmark), I feel like I can do better than what I've got here right now. Random button would be cool too.

- [x] Make navigation buttons look better.

- [x] Add random comic button.

I also swapped the order of the navigation arrows as a special request from the Product Owner.

Kicking off today with moving out all this nonsense from the README so it can focus on setup and other more legitimate README-details, which are sparse for now. Cool, with that done let's dive in on picture sizes.

I've got 3 different comics so far, and they represent two sizes for comics: square and not-square. Perhaps it's better to be accurate here, so I'll say instead that I have two comics that are of dimensions 1280 x 1280 and 1748 x 1181. It makes sense to me that I would want to handle the different sizes uniquely, so that makes me want to start with a deep dive on the square case and use that as a template.

Notes from a chat with the product owner:

- header/footer to the edge until high breakpoint then bs-container style
- image itself maxing out at at some proportion of its dimension, needs to bottom out

I came up with a simple approach for the image sizing. At the xxl breakpoint (>= 1400px) our 1280 x 1280 image looks a bit too big, so I reduced it to 80% which makes it 1024 x 1024 which looks nice. I then continued this approach and for each breakpoing step, I reduced it to 80% again and rounded to a full integer. This looks decent enough from a brief spot-check, but only for the square comics. Wide comics (based on the Peccary one, which has a lot of text) probably want to hug the edges at a smaller breakpoint, and would maybe want to step down by 90% or something less intense? Either way, I'm going to want to differentiate based on comic layout, so it makes sense to me to make that a part of the comic entity. It could be derived from the attributes of the image I suppose, but that feels sloppy and the efort incurred by expanding the entity is well justified in this case.

That was easy to add, and honestly for the wide comic it just makes sense to stick a max of 1280 width and then just set it to 100%. After the 1280 point, I want it to just reduce with the window size so that it is touching the edges on any screen beneath the native size of the image. Feels nice and I like that the experience is tailored to the specifics of the comic image itself.

I moved on to the buttons. Whatever I had originally is long gone, and what I ended up going with is using bootstrap-icons for simplicity. There's been some interactive feedback going on about color scheme and such, so I setup the project with the bootstrap primary color overridden to be the chosen pink color which is awesome! The buttons themselves are going to be SVGs long-term, but for now these icon standins are just fine. They have a primary color fill when hovered, and the navigation is all based on `<a>` tags except in the case of the random button. Which, yeah, I added a random button that takes advantage of a (fake) API call that gives a full list of all the indexes of comics in the database.

- [x] remove the mock portion of the allIndexes call.

Otherwise I went with similar media breakpoint strategies to get a proportional (step by 4px actually, but who's counting?) reduction in size that feels natural, at least with the square layout which is in my mind the default. Let's see, I used the `*ngIf ... else` approach for the dividers which I think is pretty cool. On the frontend thing, the random button selecting from that list was straightforward, but for a while at the start it didn't really feel like it was actually navigating. Thinking about it for a moment, it's because this navigation is really just changing details about this particular component and we're not really going anywhere. That means that I need to trigger a re-fetch of the comic data in question, which I did by extracting the `getComic` activities from the component so that they can be invoked by both ngOnInit as well as the random click. I do want to confirm what I need to do accessibility-wise to account for changing this (it isn't an `<a>` tag anymore) and I'm sure there's more to consider here, so maybe I can work on establishing a long-term approach for these nav buttons that is cognizant of the plan to turn them into custom SVGs if that is relevant.

- [x] Button polish: accessibility concerns?

There's another comic layout style for me to work with: tall. That's a solid todo as well:

- [x] Add the tall sample and setup styling for it.

Added some build automation through github actions that run unit tests on the frontend and backend. Fixed up the existing unit tests so they pass. Fixed up the title in routing so it no longer just says `frontend`. Used a `.distinct()` approach to remove the mocked allIndexes stuff easily. Then I decided to add a `state` attribute to the comic entity. This represents if something is published or still in draft mode. Only published comics are considered for things like navigation and latest and random and such - all things that `comics.service.ts` handles retrieval of from the database, so I added the condition that the comic must be published to be included in all those queries and added a draft comic to take it for a spin and it works just great. Did a little more cleanup on the frontend workflow file because I have grand plans to setup the deployment aspect tomorrow and I have a couple of resources that look promising.

- [x] Continue the Github actions workflow to the point of deployment upon successful completion of previous steps.

Adventures in Docker! Deployment of the app won't be on a Raspberry Pi forever, so containerization is appealing. Found a generic Dockerfile and am building with the `docker build -t frontend .` command. Note that Docker Desktop needs to be running for `>docker ...` commands to work at all. Turned that on as a startup app. Had some trouble with any and all build commands because importing the bootstrap styles to override the primary color makes the size of my styles file exceed allowed budgets, so I tweaked that setting. Interested if there's a way to sidestep this, because it kinda kills the purpose of having this budget setting - though I wasn't aware of it until now, so idk.

Lots of trouble with this one. Seems that it all boiled down to an issue with running the start command with a `.` at the end that lead to all these cryptic permission errors in the logs on the container which would immediately exit without fail. In any case, the result works locally and runs the docker image with a combo platter of the new `>npm run build:docker` and `>npm run start:docker` scripts. With this commit, I'm also going to try having github actions do the docker version of build!

That Github action was successful, btw. I'm coming in a bit late here on containerization since it's been a bit of a nonstop stream of error & trial (in order of frequency). In any case, I have the frontend and the database both running in a container, and am currently working on establishing the backend nestjs API in between the two of them. This is still pretty trivial stuff, so I'm in the swirl of finding a tutorial and determining by myself if it is out of date. Silly things get mixed in too, like I just had an issue where my container was failing on the `npm install` step because of the difference between `COPY package*.json .` and `COPY package*.json ./`. And then shortly after the command I was using to restart the whole container operation (`docker compose down && docker compose up -d`) didn't _actually_ restart in the way I wanted to and I needed to intentionally rebuild the container images with `docker compose down -v && docker compose up -d`. With NestJS running in a container, I need to route it to the database via the connection string that takes into account the container name: `mongodb://mongo:27017/mongodb://mongo:27017/`. . . And then, SUCCESS! Woo, gonna take a victory lap and then get down to polish on this.

Ok, let's go. First things first (alphabetical-wise): I don't have a top-level .gitignore so I added one for the new volume persistence stuff, but I may as well migrate out anything that should be shared across the entire project (or everything? idk the convention on this). Ok, I looked into this and changed my mind. I'll be adding the persistence stuff to a database-specific .gitignore which is more clear on what's going on.

- [ ] I need an actual entrypoint with seed data (from code) for the database. I did it by hand to start.

- [ ] As a separate task from all the stuff I'm doing right now: clean up the readme and make it accurate RE: both run methods.

Ok, so I worked my way through to app.module.ts in the backend. This is where I changed the connection string so that it could connect to the dockerized version of things, but what I really want is to have that be environment-specific so I'm going to go ahead and take a detour on this one before proceeding. `@nestjs/config` handles this nicely and so that's what I wound up going with here. I had a detour's-detour with the docker commands not fully rebuilding the API as I saw (or perhaps just thought I saw) them do before. This lets me drop the exact mongo connection string into a .env file and do that rather than mess with booleans which is how I started in on this originally. ~ From there I thought it would be cool to add an endpoint to the base app.controller that lets me review what environment values are currently active for diagnostic purposes (ties direcly back to the issue of docker not updating the way I thought it was). I'm going to keep `comics.module.ts`'s import of the ConfigModule for later use.

And now we're onto frontend, let's go. Didn't really take notes here because there's been a lot of bouncing around going on. The short of it is I need to know if I'm running locally or in a container on the backend and the frontend (I've decided a while ago but am now saying just saying it that the database should always run in a container) and so this requires messing with environment files on both the angular and nestjs side of things. So for the backend you can configure the port and the mongo connection string while with the frontend you can configure the backend host and the frontend host (for purposes of showing permalinks and such). These two approaches are fairly standard, so I'm not exactly sure what to say about them here beyond that they exist and I established them here and plan to use them moving forward. Ok, I can also say that currently I've got some naming issues with what's going on and that the concept of they will always connect to the samely located database is not reflected in the code at all.

- [ ] Clarify naming of build and run commands as well as configuration options for frontend and backend.

- [ ] Establish and properly represent how the database should and will always be run in a container.

Overall this has been quite the adventure. Ideally this would have been a separate couple of commits, but as I was working through it I think I chose to bite off a little more here and there until it made more sense to just collapse in and do all the things together. The end result is a fairly reliable starter docker-compose file with room to grow. A fantastic place to start!

Getting started on the day, the earliest TODO is a frontend one. Tackling that with the current setup of containerization that requires a build before showing updates isn't ideal, so I ended up rebuilding the restore terminals setup to return to a run-locally strategy. This was tricky because the `.env` file for the API runs the show, and so I need to manually change it to swap between the deployment strategies. I actually prefer the angular approach here and I wonder if there's a way to build something similar for the backend.

- [ ] Backend environment management such that I can deploy both styles without an environment file change?

Spending some time exploring button concepts. I really enjoy the simple svg icon that you can click on, but I concede that it doesn't necessarily present as a button to the general user's eye. It's like this: somewhere along the way I stumbled across the concept of a FAB/"floating action button" which is just an icon inside a tiny-icon-holding-button. The advantage of this is that the button is a button with all of these button-like behaviors that are ideal for what is going on here. There is only one maddening issue that I'm going to document here and then let it exit my brain for a while.

- [x] Compare app with <https://material.angular.io/components/button/examples> and figure out why when the button is focused there are two layers of fill and one expands all the way out to a square around the FAB which is unsightly. This only happens on this app and is not present in the example. I've tried a bunch of things, but nothing seems to impact this. It's gonna be something in the synthetic elements or sub-elements that bootstrap or something unique to this app is interfering with.

-=[From the Future:]=- I'm going through old todos and this one is inexplicably fixed. Not sure why, but I'm thinking it's possibly related to some of the styling stuff I'm playing with. Neat!

I am not completely sold on switching the navigation buttons around fully yet, so I'm going to play with this in a way that isn't too disruptive. I'll add a second row for these new buttons and then I can run two sets of navigation buttons simultaneously. That worked well. So now I've got two rows of buttons that (let's hedge with a should) both do the same thing. I'm seeing advantages to both and I'm still not ready to get rid of either just yet, so they'll chill for a while. Something like different buttons on some comics and not others is a cool thing to consider doing here. Anyway, I'm enjoying how fresh Angular Material feels which is probably on account of my bootstrap blinders. I have some other plans today, so this was never going to be a massive update but I am pleased with what I was able to get done.

For the commit, I'm seeing some additions to the `angular.json` file that have to do with specifying this indigo-pink.css style. I'm going to leave those because I believe it is necessary for Angular Material in general and doesn't seem to interfere with anything I have. No TODO on this one, just making a note. It also seems worthwhile to note that a fair chunk of the updates with this commit were actually performed automatically by the setup of Angular Material itself. (Specifically changes to the `index.html`, `styles.scss` and as usual `app.module.ts`)

Last thing I want to drop here is that I'm flabbergasted by what's going on with my test suites. Something I did yesterday with containerization complicated the node types across a couple of projects and I've needed to plug a few holes here and there. It's mostly fine, but for some reason all my frontend spec files (both, rather) are foreign to the IDE for some reason. Granted I haven't restarted in a while, so hopefully that's it but it's strange and I'm out of time but at least I fixed the busted unit test!

I worked on the layout for the tall version of comics. Added a few links from previous work to the links section as I clean up and prepare for some work on deploying this app on the raspberry pi that is patiently sitting next to me.

## Deployment

Making this a separate section in the interest of taking _extremely_ detailed notes on this. I like where <https://dev.to/hnrq/using-github-actions-to-deploy-a-web-page-to-raspberry-pi-46bi> starts by establishing a reachable host pi via ngninx, so I'll do that first. Oh yeah, I already did this haha. I left off at the port-forwarding setup because there was a distraction with setting up some new hardware and I forgot! I also spent a good deal of time considering and prepping for a full reinstall of the pi because I couldn't remember the password I had set it up with a month or two ago. Turns out it's trivial to reset passwords even without knowledge of the old one via the GUI. Good to know!

I'm looking at some alternative approaches and examples of the CICD flow I have in mind. There's some stuff about Github Container Registry, but really I don't need to host these containers and would rather go with some sort of direct pipeline. Suppose instead I use this to run tests and confirm a go-no-go decision leveraging Github servers, but once I decide to deploy I perform most of the actions necessary to do so on the Pi. This is duplicative, like I'll be running npm install twice but whatever with that. This is more scalable but a little tedious. I'll try it out with the frontend and take another look at feasibility then.

- [ ] Pi has the 'every docker command requires sudo' problem.

I'm trying to do a deploy by hand to see what it's like. The idea is that I'll just clone the repo and run docker compose up. That works to the point of the frontend is reachable, but nothing on the backend works correctly. Been working to untangle that and there's a lot going on here to consider. Right when I thought I had it in the bag, I got hit with a version issue: <https://www.mongodb.com/community/forums/t/core-dump-on-mongodb-5-0-on-rpi-4/115291/16>, but bumping things down was no problem and I'm taking a swing with this commit to try out this new IP address update in the docker environment since the running frontend is still trying to access localhost resources through the browser from the Pi.

I'm playing around this morning with automating more of the deployment process. I've got a folder called `server` locally with a couple of script iterations that I'll commit later on. For now, I'm going to work with github statuses because interestingly actions aren't linked to commits directly (based on what I'm reading) so this is a way to sorta synthetically achieve the same thing. So this commit here is just to try out the stamping of statuses via the additions to the workflow files.

Alrighty, so the thing that's been on my mind is automating the deployment of stable code. The full automation is possible (it's running right now!) but it requires too much manual intervention. The thing is, I don't want to open the Pi up to the internet just yet, and so using Github actions to push updates onto the device isn't going to work. This got me thinking about how I can achieve the same thing with a closed off deployment target. What I'm thinking is the Pi (or whatever the device is, I'm calling it `server`) polls github to answer two questions: 1) "Is there newer code than what I have?" and 2) "Did that code succeed all previous steps in the build process?". If the answer to both these questions is yes, then the server downloads, builds and runs that code.

With this idea in mind, I worked on two different poll scripts. The first was a shell script and I got to the point of obtaining data from an API call but then needed to sort out how to make object structure work nicely in that syntax and so I said 'nah' and went with a javascript script file instead. I played with doing a typescript approach like I've done before, but the build step is tedious and I'm not going to be taking lots of advantage of typing concepts here (that I can think of atm). Despite having been mercilessly discarded, I stuck with the shell script idea to the point of being able to work with a `.env` file which might be helpful in the future.

The script also checks the local system for the current commit SHA. I'm doing a commit now to try running the script on the Pi. Worth noting that I needed to make 2x Github personal access tokens in order to facilitate all these shenanigans. I made one for reading and then another specifically for writing the status updates. The reader is used by the poll script and the writer is used by the github action workflow.

Trying to simulate being behind the repo by checking out previous commits but I am not really able to get it to work. So I'm going to make a tiny commit that will make my prod server behind and I should be able to run stuff from there. Although, let me make sure it can run the script. Yup, no problem. And actually now that I think about it I can just go ahead and work on the success case first. Moved some stuff around and added a little bit of code that clarifies what it sees when comparing the current code with the latest code seen on the remote.

~~Shoot, it occurs to me that my thing with github workflows won't be marking something when it has failed. Hm, I'll need to figure that out.~~

I had this cool idea about using a fibonacci timeout approach (<https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e>) but I'll be exploring that later on because I can't really do much with pending right now except for the obvious way around this, which is to just do nothing on pending and wait for the next run. This won't work in awkward cases where commit A is stable but is shortly followed by the unstable commit B within that specific window where A remains stable but doesn't reach the checkpoint and therefore get pulled and run. This is a silly edge-case and not enough to prevent this from being a decent option for the time being.

Before I forget, I learned this new handy tool of something to the effect of `git stash && git pull && git pop stash` to quickly pull down changes while you have annoying lingering environmental data changes that you haven't appropriately managed. . . for example.

So tonight I spent some time with the polling script, and I'll tell ya I got things to where I believe we are sitting pretty nicely - minus this absolutely infuriating bug that I'll get into. Overall, I spent some time working on a better structure and then on establishing a path directly to the ultimate payoff which is the running of the git pull and then docker compose commands resulting in a fully deployed app. Getting to this point was easiest when the Pi was on a commit that was older than the latest, hence the empty commits and then tweaking of the server files. This almost worked, but then I botched a command that interrupted the docker compose command and so I re-ran it one more time when all of a sudden the bug appeared: The Pi is no longer able to reach the github api. For real, I have two computers right next to one another and one can visit this URL while the other can't: https://api.github.com/repos/Donrwalsh/curiouser-paradox/commits. I've tried all the different things I can think of and none of them have lead anywhere. The plan is to come back to it with fresh eyes because this is truly bewildering and it's late.

For real, I hopped on and re-ran the poll script without touching anything else and it worked without issue. Happy birthday to me!

So I'm back after a bit of time being distracted by other things. I'm working on the script and playing around with making it a bit more readable by breaking apart the multi-step commands and using some common messaging functions. I'm not sure how things work with the broken apart commands because of some silly back and forth with typos and such (any script updates incur 2x commits because I don't care to deal with copying a latest version of the script manually). This frequency of commits should drop off once the script is in a somewhat stable state.

Oh yeah, briefly I want to mention that I originally tried to make a sort of generic `exec()` function to handle all these command line things, but I couldn't figure out how to be able to run arbitrary code via a callback into the `stdout` portion of the exec. Granted, I tried to solve this first thing before I was totally awake so maybe I missed something simple, but I'm happy with what I have currently for now.

I learned that `stderr` seems to be warnings, at least it is in the case of the git pull command that tells me I need to specify how to reconcile divergenet branches. I don't really care about that warning, but it's helpful that it's hitting the stderr part of the code which I hadn't hit until now. Let me see if I can work with this locally somehow. The absent `let` that I added on line 19 of poll.js gives me an error on the pi but not on my local. Interesting.

Success! Somewhere along the way with my durdles today, I ran the script such that it took down only the frontend. After the successful run, the frontend is up and has the current potato toggle all from the script. This is very exciting! I'm going to commit these notes and undo the potato toggle and then I'm going to watch it run again...

Hang on, Potato toggle is actually backwards? Whew. It was cached or something. I confirmed that the code on the pi has potato toggle off, and when I'm looking at current deployed code (correctly) I do see that the actual title shows. In that case, I'll change something else to confirm the successful run. Meh, I'll just use a potato toggle.

Hm, my script failed on the docker compose up command. Smells like a synchronicity issue. Interesting to think about how if this script fails past the git pull part that there's no clean way to redeploy outside of a manual hop-on to the server and running a command. For this particular issue, I'd like to redeploy everything if I see that I've obtained the latest code. Hm. Maybe the deploy portion of this belongs in a separate script.

Ok, I'm going to think in the space of what's left to do with this script. I'm intending to use the script in a hands-off way, so the way I'm running it through the terminal these days is not going to be the intended implementation. That's a lot of words to say I want to log this to a file, and so I'm interested in getting timestamps on every log I make. Found a really nice stackoverflow post that describes a clean and simple way to do what I want to do. Running the script to output to file on a Windows machine doesn't work through bash for an annoying reason, but it appears to work just fine in a CMD prompt.

Ok, so I want this to run as a CRON job so let's see what it takes to make that happen. Blegh, this was so much harder than it had any right to be. Let's start with the doozie that is the 500 errors which cropped up again. Turns out I wasn't actually authenticating with octokit and I was facing down the unauth'd rate limit (60/hr). Dang, that's a huge load off (assuming that the 500 errors I'm seeing are what happens when you run out of requests) and the 5,000 requests/hr they give to those who are auth'd is insanely high and this script will need to expand quite a bit before that limit is at risk of being hit. This is EXCELLENT because I really don't want to discard the run-every-minute idea right now. Last thing on this: Due to how I'm using `process.env.~` in the script, any import failures here won't show up. Further complicated by the fact that this key is never exposed through running the script and this sort of thing is kinda guaranteed to happen. This is a good lesson to keep in mind for the future because it's a fairly simple mistake to make that can and will cause super annoying issues.

Let's see, I modified the `poll.js` file on the server to have a node shebang line, but I'll be removing that since I don't think it's necessary. Good to consider that though. Another thing, for a while at the start, the issue was that `poll.js` wasn't executable! Due to the pi not having an email program involved (and even giving me some guff when I tried to install it!) it would seem that errors in executing the script weren't being shown at all. Run `grep CRON /var/log/syslog` shows attempts to run commands, but it'll say `(No MTA installed, discarding output)` rather than output anything useful in this log about the error experienced. That's obnoxious. Anyway, I'm seeing that the `poll.js` on my local is already executable, so perhaps this issue is something I should account for on the server.

- [ ] `poll.js` not executable on server. Will this happen again?

~These notes came later~ so, poll.js is _not_ executable on my local. So that better explains what's going on, Windows must care less about this. Ok, good to know.

I'm adding 'log.txt' to the `.gitignore` because that's where I'm piping the output from the script via cron. Here's the cronjob that I came up with:

`* *    * * *   syndicate    cd ~/curiouser-paradox/server/ && sudo /usr/bin/node ~/curiouser-paradox/server/poll.js &>> log.txt`

I'm running the script as syndicate because that's the user I established the repo on this server with. Unsure on this, seems like using root would be a bad idea but whatever for now. I'm unclear if that `&>>` is necessary since I was trying it out before I understood why the cron job was failing (executability of the script) but it works, so I'll leave it in I suppose.

- [ ] How to include logic that handles starting up docker containers when the script sees that they are down or missing?

- [x] Clean up the rate limit output that's in the script.

- [x] Correct how not all of the logs have a `${RESET}` at the end which results in colors bleeding between logs.

Shoot. I checked the log this morning and I'm still getting periodic 500 errors. One thing that I didn't think about is because I looped the rate limit information into the initial kick-off message, I see nothing when that API call has an error, so I don't get the timestamps of the failures. I can infer from the gaps, but yeah I'm not sure what good that'll do for now.

So let's think about this. I'm in a state currently where two devices are performing the same action but receiving different results. While I think about this I'm going to commit the change that decouples the beginning announcement and the rate-limit call. I'm also going to add a basic try-catch to the initial API call in case I'm missing some useful information from the exception output.

I spent some time working on a 'gallery' for all the comics that have been published. I chose to use bootstrap cards after exploring Angular Material cards and finding them pretty basic in comparison. I don't really know how this should look overall, but I think this is a good starting point. Pagination is a consideration, so too is the fact that I'm just using the full images and not actual thumbnails.

- [ ] /all pagination

- [ ] /all thumbnails

Other than those two, it has mostly just been a bit of wrangling with the frontend to get it to do what I want. I had started with a bunch of unnecesarily precise pixel values that I ended up turning into as-close-to raw percentages as possible. Even the percentages are awkward, but the end result is pretty: 5px or more of margin for every image and some casual styling but I'm really not sure what the dummy text should be replaced with.

Keeping it in right now, but I think it's awkward that I still have the `.env` file exposed to git for the backend. This upcoming commit includes a detail that was necessary to configure my local properly, so it seems premature to wholly omit it right now, so:

- [x] Adopt a standardized approach for the backend .env file

I changed the structure of the ComicDTO to be more generic rather than calling out `specificComic` or whatever it was. I updated all the API responses to match this new direction.

Oops, those changes I made to the `.env` make the deployed version not work so I'll do that now.

Last night before bed, I noticed that the random button wasn't working. Easy fix, just needed to update the logic that gets the list of indexes (to facilitate a random selection) to adhere to the new ComicDTO structure.

I don't recall if I mentioned this, but there was a small problem with sharing common colors across the frontend app. Over on `main-comic.component.scss` I was pulling in the entire main `styles.scss` file which awkwardly also happens to include all of bootstrap! I don't think this was actually a problem now, but when I started in on this ~20min ago I could've sworn this awkwardness prevented me from using Angular Material and Bootstrap together in the same component. That's not the case, as far as I can tell, so I'm not sure how I had gotten that impression. Nevertheless, this new approach is cleaner with all the color values existing in a dedicated scss file that can be pulled in wherever (including the primary `styles.scss` for bootstrap color overrides and such). I also slid out the two core scss files into a dedicated folder so I can scale that without muddying up the src folder.

- [x] Shoot, it occurs to me that my thing with github workflows won't be marking something when it has failed. Hm, I'll need to figure that out.

Pulled this one down. I've been reading a bit about github workflows and this is something that looks straightforward. The thing I noticed though is that all the github status logic is in the frontend workflow, and well it doesn't really make sense to keep them separate since with the CI/CD situation I have going right now I really want the github status to be based on the result of all apps - if one app fails tests, the commit should fail and the deploy shouldn't go through. So yeah, I'm going to work on a monolith workflow file and see if I can still accomplish some parallel running of tests which was honestly the only reason I wanted them separate in the first place (to the best of my recollection).

I'm watching the github actions run off my last commit, and I'm pleased to see that the Angular and NestJS tests are being run in parallel. Score! I feel like this is doing what I want it to do right now, so I'm going to go ahead and mark this task as a success for now, but naturally I expect to continue returning to this as the project grows.

It occurs to me that I don't need to import bootstrap at the `angular.json` level because I am importing it in my primary styles file in order to override colors. Unclear if this optimization actually gains anything, but I'm going to do it as a demonstration of niftiness anyway.

Working through https://docs.nestjs.com/security/authentication and setting things up with plaintext passwords to start. Can't read in a .env value without some effort, so I'll make that a todo:

- [x] put JWT secret in .env and read it as described in https://stackoverflow.com/questions/55673424/nestjs-unable-to-read-env-variables-in-module-files-but-able-in-service-files and https://stackoverflow.com/questions/54361685/nestjs-typeorm-configuration-using-env-files/54364907#54364907.

Cool, so I have the thing working in an _extremely_ basic form. I have the above problem to solve, but then also there's the passwords to consider:

- [x] passwords in database rather than js code

- [x] also, no plaintext passwords (nestjs docs suggest bcrypt)

Got some tests to clean up here too. Hm. Default imports aren't working. `import { UsersService } from 'src/users/users.service';` gives me the following error: Cannot find module 'src/users/users.service' from 'auth/auth.controller.spec.ts'. I'd like to fix this at the source, but for now a relative path seems to sidestep this issue. Might just be an IDE setting, but I recall having issues with this in NestJS before. Seems worth a deep-dive. Actually, does the same problem apply to non-test files? Did a quick smoke test and didn't have any issues, so it would seem tests only. WHOA actually an absolute import in the service causes the test to fail. That is hilarious.

- [x] Why don't absolute imports work for NestJS tests?

I am perplexed. The current state of `app.controller.spec.ts` should not be passing to my eyes. I'm doing nothing to override `AuthGuard` which should be guarding the endpoint from unauth requests, but the test doesn't seem to care. Confirmed after several restarts and swagger calls that the endpoint will throw a 401 without a JWT included in the request, so yeah, I'm perplexed. My best guess is that the test is bypassing the guard for me, but that's not what's happened in my experience previously, and also. . . isn't that a bad idea? My brain is running out of steam here, and it's almost dinner time so I will make this a task and take a closer look at a later time.

- [ ] What's the deal with the app.controller test seemingly not caring about my AuthGuard?

Enforce default 'absolute' imports across all typescript files: `"typescript.preferences.importModuleSpecifier": "non-relative",` in vsCode settings.json and now I'm gonna go through everything in the NestJS project and update them to be non-relative because I like consistency. In order to make this easier I added an additional VScode configuration to the settings that auto adds imports on save: `"editor.codeActionsOnSave": { "source.addMissingImports": "always" },` which I'm digging right now, but I'm a bit hesitant on how this is going to work long-term so I'll keep an eye on it. Unclear if this will have an effect on Angular, but that'll be another thing to watch out for. For right now, I'm enjoying how all the imports are standard and that I shouldn't have to worry about improperly formed imports for now (or ever again?) Oh yeah, and based on the link that I added below, the culprit is how the starter files are generated from creating a new nest project. Curious.

- [ ] `poll.js` runs while previous runs haven't completed. I'm not sure if this is a problem, but it'd be a fun thing to solve regardless.

I woke up this morning with a hankering to secure the database (and then I pivoted to authentication for users on the frontend first rather than adding a password to the database, but that is still on my mind). I'll start by pulling the initial set of 2 users out of the code and putting them into a simple Users table in the database. Only thing I changed here is the source of the user data, next step will be to attend to the implementation so it is proper.

Did some reading about bcrypt last night and today, and it's quite interesting. The question on my mind is how many saltRounds should I be going with? The answer to this question has to do with risk tolerance, because no amount of saltRounds is going to make things completely secure. So it's a balancing act between security and time spent hashing. Following the suggestion from a resource that I've since lost, I implemented a counter that describes how long hashing takes for saltRounds between 10-20. I added this as an actual endpoint (it was console logs first) because I'm actually most interested in seeing the performance numbers on the Pi - which is to say the actual device that will be handling the hashing long-term. In addition to this, I'm probably going to aim for something a bit higher than the standard recommendation because of the nature of how I'm using it here.

The hashPass endpoint worked well, but I disliked the static 10-20 test rounds, so I updated it slightly to also take in a saltRound value and report back just one time. So I can still achieve the same output with 10x calls if I want to, and more importantly I can play some more with specific values without having to wait several minutes thanks to the topend taking quite a while on the Pi.

Switching gears for whatever reason onto the JWT secret. This is currently hardcoded in the auth.module and that's no good. I had some bookmarks that explained (poorly, IMO) how to pull this secret value from the env, but as the parenthetical above suggests, I did not find success with this. Not to worry! The README for `nestjs/jwt` lays it out quite nicely in the `secretOrKeyProvider` function for retrieving dynamic values. Right now I don't really care about anything except just providing the secret value that is ripped from the env file, but I definitely noticed the ability to have more control with this. I'm going to add a breadcrumb comment right next to it so I don't completely forget that thread. Oh yeah, and I was able to verify that the correct `JWT_SECRET` value is being pulled in because when I change it to something new (and pithy, I might add) the produced JWT is not recognized as valid by the Pi's version of the code which stil has the old value.

Looking to get into this next: https://blog.angular-university.io/angular-jwt-authentication/. https://stackoverflow.com/questions/65458062/angular-httpclient-property-sharereplay-does-not-exist-on-type-observable was helpful in recreating the AuthService code correctly. `shareReplay()` is new to me, but looks very helpful. Got distracted a little bit by toasts, so I made a todo.

- [ ] I like the idea of a ToastService as described by https://betterprogramming.pub/how-to-create-a-toast-service-using-angular-13-and-bootstrap-5-494e5c66627 and in code at https://github.com/svierk/angular-bootstrap-toast-service/tree/main

So I've got a login component that takes a username and password and lobs it off to the auth endpoint that I created. Not much happens after that, but the response from the backend is interpreted as either a success or failure appropriately and so there's some obvious steps forward from here.

I'm gonna skip the addition of expires_at on the JWT response, because I'm not sure I see the usefulness of it just yet. And so the way I'm going about it is to write the JWT that is received from the backend into localStorage and I've created a basic interceptor that will (when it is present) add that JWT onto all outgoing HTTP requests. So there's still a lot that needs to happen here:

- [ ] navigate to a secure landing page (dashboard) on success

- [ ] seems like it might be important to have the expiration details as part of the jwt that is stored.

- [ ] handle token expiry

- [ ] failed login notification (toast, or something else)

- [ ] visual indicator when logged in, and perhaps even more where it gives you the option to navigate around a variety of authGuarded locations. (includes logout)

- [ ] remove the temporary 'Try it out' button when the full and accurate form of logging in is available.

Woke up this morning thinking about JWT-based authentication and did some reading about refresh tokens. Found this https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token particularly useful.

Dang, this is ending up being a pretty big undertaking. I am planning on working off a single interceptor that is smart enough to know when to append the bearer token and then also will recognize if the access_token is expired and then quickly dispatch an attempt to refresh the token, but that then introduces an async requirement that really threw everything for a loop.

Alrighty, I got it working. Ultimately the interceptor was fairly simple. The async http calls not firing was a big hassle, but once that was solved things fell nicely into place. There needs to be a logout option that wipes the refresh token from the database. Cool, I made that. So at this point, the roundtrip operation of {logging in and receiving 2x tokens > then http interceptor handles application of access_token to the request > UNLESS access_token is expired, then interceptor handles refreshing the access_token before handling the application of access_token to the request > user can logout to invalidate existing refreshToken} seems to work great! I imagine there are some issues with error handling and such because of how hyper-focused I was on getting the core functionality in place, but for now this is a great win.

- [x] `password` should be `passwordHash` in the database

- [ ] Just do an overall pass looking for consistency in this pile of work from today.

It occurred to me last night that if I use the same secret for both access and refresh tokens that I am really just creating a super-powerful access_token and naming it a refresh token haha. So I worked today first off on separating those to have a different secret. This caused some confusion when refresh tokens were still being accepted after I had taken care of (what I thought was) introducing purpose-specific secrets. It's working now, which is great!

- [ ] Note that if the app starts up without the JWT signing secrets, it won't complain until it tries to sign/verify something at which point, nothing will work

- [ ] Consistent language of 'Sign In' over 'Login' ('Sign Out' over 'Logout' too)

After a very minor amount of consideration, I'm going to go with kebab-case as a standard for my URLs.

- [ ] Consider moving the hash-time endpoint out of the Auth Controller and into ~something else~

- [ ] Consider doing something fancy with the Comic Responses types. One per endpoint is a bit much.

- [ ] 404 page has the random button

- [ ] Using a generic approach to CoreComicResponseDTO works like a charm for custom types, but not for Number which is bewildering.

- [ ] 500 error on specific comic when providing a non-number id.

- [ ] Have poll.js run Docker command if it sees that the containers aren't running (problematic in the case of intervening run)

- [ ] what to do when signing out on a page that would prefer to reload the page (all/gallery is an example)

- [ ] On the all/gallery page, specify if a comic is published or not

- [x] Automatic deploy woes: failed to solve: node:18: failed to do request: Head "https://registry-1.docker.io/v2/library/node/manifests/18": dial tcp: lookup registry-1.docker.io on 192.168.1.1:53: dial udp 192.168.1.1:53: connect: network is unreachable

^ this happened again, so I added 2x nameservers to the Pi's `/etc/resolv.conf` to see if it fixes it. Last commit went through just fine, so I'm going to mark it as complete for now but keep an eye on it (It's super easy to notice)

- [ ] poll.js should not take down the database

Working on doing some password reset stuff, and it has become apparent that I have a huge problem with refresh tokens. Any refresh token that is generated with the valid secret for the environment will always pass the check, and that's not what I want. So I need to fix it and I have an idea that I want to vet:

- [x] Introduce a 'last-signed-in' value into the database and use it in the generation and validation of refreshTokens. (marked as complete, but didn't actually do what this task says. Issue was that the length of the refreshToken was pushing the unique characters out of consideration)

Cool, so the password reset endpoint works and the frontend is pretty bad about it ~ silently succeeding and such. It also remembers the values input in the password reset form after signing out and signing back in (to confirm the reset working properly, which it does, and that's awesome). Anyway:

- [ ] Introduce some sort of mechanism to indicate if the form submission was successful or not.

- [ ] Have the password reset form forget data when signing out (which doesn't actually kill the component);

- [ ] It might be worth cycling refreshTokens when resetting a password.

I'm listening to this Udemy course on Angular like a podcast, pausing whenever something comes up that I'm not familiar with. First thing that really caught my eye is the @ViewChild() decorator which I don't believe I've ever used. So I tinkered with it on the main-admin component (password reset form) and then decided that I actually want to retain some of this work, so I spun up a 'play' component that is kinda guarded behind signing in and so I can durdle with stuff like this and keep it around for reference.

- [ ] Consider making 'play' a module rather than a sub-component of admin, if there are enough reasons to do so.

- [x] Also, the password reset form should be its own dedicated component. It is a bit sloppy as it is right now, being part of the main admin component.

^ Doing this next and leveraging ng-content for the title because it's cool

Well, that was an absolute TRIP. I decided to sit down and work on the TODO from above where I make it so refreshTokens are limited in some capacity to handle that odd behavior that I saw where I would refresh the token and then the previous token would still work (this was because I missed updating the database with the newly generated token), but the new token would ALSO work. This was confusing to me, and I came up with all sorts of theories that made sense for a little bit, but it wasn't until messing with things today that it clicked: See, I added a 'lastSignedIn' timestamp into the database temporarily and appended that to the end of the refreshToken and then hashed that -> no change, same problems. Ok, easy enough, let's add it to the front of the string -> no change. This broke my brain, but also made it immediately obvious that the full text of the refreshToken was NOT being considered because if it were, then one of those two approaches should have yielded the desired results. Did some research and it looks like bcrypt caps out at 72 characters, and so the solution that came to mind immediately is to just reverse the refreshToken and hash that. Boom, now it all works exactly the way I want it to without having to store additional data. Fun problem to solve! Oh yeah, I also added code that updates the database with the newly generated refreshToken when that happens. Only reason this wasn't causing issues is because of the stuff discussed above.

I am putting some thought into how to upload images as part of this app. There's a common approach for uploading images showcased [here](https://stackoverflow.com/questions/66199633/how-to-access-image-from-uploaded-on-nestjs-server) and [here](https://levelup.gitconnected.com/the-easiest-way-to-upload-your-files-to-nestjs-70a70b95f856) and that seems all well and good. The images get added to the `backend/public` folder that's on the Docker image itself, which is not ideal. But it [seems](https://stackoverflow.com/questions/42877801/how-to-sync-code-between-container-and-host-using-docker-compose) [to](https://stackoverflow.com/questions/18878216/docker-how-to-live-sync-host-folder-with-container-folder) [be](https://docs.docker.com/storage/volumes/) [possible](https://docs.docker.com/compose/file-watch/). Musn't forget image minification either: https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser, this to: https://imagekit.io/blog/image-compression-techniques-in-javascript/

ngx-toastr is great!

- [ ] configure it

Moved some physical hardware around which somehow resulted in the Pi getting a new ip address (and perhaps finally adhering to the static ip I had set aside for it) which requires a change of the in-code angular environment details. Would love that in a .env somewhere, and I'm pretty sure I have that as a todo elsewhere in this doc.

- [x] Single field-match validator that takes in a boolean declaring if they should or shouldn't match.

Spent some time starting the new comic form. Went a little deep on the indexes input and landed on what feels like a much cleaner forms approach that I'd like to bring over to the password reset form. I'm also interested in checking my field-match validators to see if I can handle them better, because comparing them to the one I'm using in the new comic component, they feel very much like overkill.

I went ahead and made some updates to the password reset form. I removed the 'submitted' tracker and just went with a more generic isDirty check and then mark all the fields as dirty upon submission attempt. Furthermore, I got rid of the awkward function call that handled all the different validation checks and applications and went with a basic `.valid` (or `.invalid`) and `.dirty` check and then turned it into a generic function that just performs the same check based on the fieldName. Pretty pleased with that one, and then I can also use that as the check to see if I should be showing any errors! Awesome. Also, I went ahead and combined the two field-match validators into a single validator that takes in a boolean which toggles the type of comparison that is being checked for. I'm pretty pleased with that one, not gonna lie. I was even able to get rid of the awkward exit condition checking the other field by preventing the event from emitting.

# Couldn't Have Done it Without You

- https://www.markdownguide.org/extended-syntax/
- https://stackoverflow.com/questions/63429380/how-to-serve-static-images-in-nestjs
- https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet
- https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
- https://stackoverflow.com/questions/47344571/how-to-draw-checkbox-or-tick-mark-in-github-markdown-table
- https://stackoverflow.com/questions/42104629/angular-2-checking-for-server-errors-from-subscribe
- https://stackoverflow.com/questions/4837673/how-to-execute-mongo-commands-through-shell-scripts
- https://stackoverflow.com/questions/65806112/pipe-output-from-mongosh-mongodb-shell-to-output-file-windows
- https://stackoverflow.com/questions/39635474/make-smaller-button-in-bootstrap
- https://thenounproject.com/
- https://stackoverflow.com/questions/38792005/how-to-change-the-bootstrap-primary-color
- https://stackoverflow.com/questions/65359474/angular-unit-test-stuck-on-github-action-ci
- https://jasonwatmore.com/angular-15-16-free-course-8-dockerize-app-with-nginx
- https://stackoverflow.com/questions/29535015/error-cannot-start-container-stat-bin-sh-no-such-file-or-directory
- https://stackoverflow.com/questions/37634483/default-docker-entrypoint
- https://stackoverflow.com/questions/38882654/docker-entrypoint-running-bash-script-gets-permission-denied
- https://www.mongodb.com/compatibility/docker
- https://www.tomray.dev/nestjs-docker-production
- https://stackoverflow.com/questions/66042897/docker-build-fails-at-npm-install
- https://stackoverflow.com/questions/42040317/cannot-find-module-for-a-node-js-app-running-in-a-docker-compose-environment
- https://stackoverflow.com/questions/61083094/connecting-to-mongo-docker-container-from-mongo-compass-on-local-machine
- https://github.com/docker/awesome-compose/blob/master/react-express-mongodb/compose.yaml
- https://stackoverflow.com/questions/60924576/cors-is-somehow-stopping-my-angular-and-nestjs-apps-from-communicating
- https://pallavbh23.medium.com/setting-up-docker-and-docker-compose-for-nest-js-and-mongodb-1cd972d97ef7
- https://medium.com/@parvej.code/how-to-setup-nestjs-project-with-mongodb-as-the-database-in-docker-84db8963d26
- https://stackoverflow.com/questions/63122399/connecting-using-mongodb-compass-to-docker-mongo-image
- https://stackoverflow.com/questions/41427405/navigate-to-another-page-with-a-button-in-angular-2
- https://stackoverflow.com/questions/76239590/how-to-move-mat-icon-button-focus-effect
- https://stackoverflow.com/questions/53741232/angular-material-button-remove-autofocus
- https://material.angular.io/components/button/examples
- https://www.w3docs.com/snippets/javascript/colors-in-javascript-console.html
- https://stackoverflow.com/questions/29653989/git-commands-in-nodejs
- https://stackoverflow.com/questions/72596035/how-to-associate-status-of-a-github-action-workflow-with-a-commit-or-pr
- https://docs.github.com/en/rest/commits/statuses?apiVersion=2022-11-28
- https://stackoverflow.com/questions/949314/how-do-i-get-the-hash-for-the-current-commit-in-git
- https://stackoverflow.com/questions/36546860/require-nodejs-child-process-with-typescript-systemjs-and-electron
- https://stackoverflow.com/questions/12008120/console-log-timestamps-in-chrome
- https://stackoverflow.com/questions/65953381/how-to-use-env-with-es6-module-with-node-js-and-express-application
- https://www.endorlabs.com/blog/how-to-get-the-most-out-of-github-api-rate-limits
- https://askubuntu.com/questions/1277883/cron-is-running-executing-jobs-but-wont-output-to-a-log-file
- https://stackoverflow.com/questions/36882991/how-to-view-a-cron-job-running-currently
- https://stackoverflow.com/questions/6207573/how-to-append-output-to-the-end-of-a-text-file
- https://stackoverflow.com/questions/8899737/crontab-run-in-directory
- https://stackoverflow.com/questions/12008120/console-log-timestamps-in-chrome
- https://www.liquidlight.co.uk/blog/use-and-import-rules-in-scss/
- https://stackoverflow.com/questions/71430668/how-to-run-a-github-actions-job-on-workflow-failure
- https://stackoverflow.com/questions/60453924/running-a-github-actions-step-only-if-previous-step-has-run
- https://medium.com/tradeling/how-to-achieve-parallel-execution-using-github-actions-d534404702fb
- https://docs.nestjs.com/security/authentication
- https://stackoverflow.com/questions/55848238/nestjs-unit-test-mock-method-guard
- https://stackoverflow.com/questions/52926371/vscode-typescript-add-all-missing-imports-shortcut
- https://codahale.com/how-to-safely-store-a-password/
- https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
- https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
- https://stackoverflow.com/questions/48294197/angular-5-http-interceptors-error-when-injecting-service
- https://stackoverflow.com/questions/45345354/how-use-async-service-into-angular-httpclient-interceptor
- https://medium.com/@an.sajinsatheesan/refresh-token-interceptor-angular-10-d876d01561be
- https://stackoverflow.com/questions/57833669/how-to-get-jwt-token-from-headers-in-controller
- https://www.bezkoder.com/logout-when-token-expired-angular-14/
- https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
- https://jasonwatmore.com/post/2021/09/24/angular-http-interceptor-to-set-auth-header-for-api-requests-if-user-logged-in
- https://stackoverflow.com/questions/69359599/best-way-to-check-jwt-token-expire-status-if-stored-in-localstorage
- https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X#apioperation
- https://aalonso.dev/blog/how-to-generate-generics-dtos-with-nestjsswagger-422g
- https://stackoverflow.com/questions/47580528/error-response-from-daemon-get-https-registry-1-docker-io-v2-dial-tcp-look
- https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
- https://www.npmjs.com/package/ngx-toastr
- https://stackoverflow.com/questions/62915060/nullinjectorerror-no-provider-for-injectiontoken-toastconfig-in-jasmine-spec-f
- https://stackoverflow.com/questions/72472011/subscribenext-null-undefined-error-error-any-void-complete
