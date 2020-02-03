1. How we get new Post from Post Create Component to Post List Component. Till now we get the chain of property and event binding.
we are emitting new post and passing it to parent component and then we are passing it down to post list component.
But in complex applications, This becomes cubersome because of chain of binding.
solution: Use service and it is able to centraize some tasks and provide easy access to data within different components without property and event binding.

2. but this is not the cleanest way of doing that,

I'm a fan of copying this to avoid unwanted manipulation of the posts in any component which is fetching

our posts.

So a better way is to use an event-driven approach where we actively push the information about new

posts being available to the components which are interested

and for that we could use the event emitter but the event emitter is really meant to be used in conjunction

with that @output decorator,

instead I'll use a feature provided by another package which is not part of angular but a core dependency,

the rxjs.from the beginning.

Rxjs is all about observables and this is a concept which can be a bit more complex to grasp,

it's essentially about objects that help us pass data around
----------------------------------------
server side prograaming:
1.Notice backend code and frontend code should be totally decoupled. it can be same model but different model also. May be u have different additonal fields on model at server side rather than what is present at client side.
example: usermodel ,on backend you might store some extra information which you dont want to pass to client.
2. at server side , we strict to de-facto of node which is js file rather than ts based model.
3. Notice you can inject component in services too and not only in components

-----------------
Cors:
1. We have a seperated server and client .Once is on localhost:4200 and one is on localhost:3000 . Now client and sever want to talk to each
other .but we want to expose our server api to all possible client, so we need to disable this default mechanism which comes because of security issues.and this is done by setting the right header on the server side response. it has to be done at server side code.
so let's go there to the app.js file and there I will simply add one additional middleware. Now this middleware

of course has to run before we handle the response sending here because there after the response is

already sent,

we can't manipulate it any more and we want to manipulate the response because we need to add headers

to it.
to it.

So app use, no filters added, so no path filters added because I want to do this for all incoming requests

and then I get my default function as an argument here which gets the requests, the response and this

next function it can call and in there,

the goal is to call next at the end because request should be able to continue to the next middleware

but before we do that, I want to manipulate the request or the response to be precise.
-----------------------------------------------------------------
Database:
1. We need to persist data on app reload ,so db is needed.
2. Why dostt we directly connect angular to mongodb by surpassing node express app.? It is technically possible.
But it is highly inscure and secure authentication is not possible. We need credential for login into DB and if we do same in
angular front end, it can be seen in browser as native JS.
So directly connecting angular and DB is not a good idea . Instead we will send an http request to node and node has all credentials details which users cant read
because it resides on server

Setting up Mongodb: 2 options are there
1. Download mongodb from mongodb.com and install
2. Cloud solution : Free sandbox is available which is cloud hosted mongodb , free to use for small applications like ours.
   -sign up on mongodb cloud service
   - login to account and create a organisation &  project on that account.
   - Build a new cluster
   - select free tier and M0 sandbox which is free
   - select db access link and add new user root and pwd
   - Add ip whitelist : only IP from that list will be able to access db

   you could use normal mongodb client package for connecting to db
   npm install --save mongodb (see mongodb docs : getting started ->select nodejs as language)
   but we will not use this mongodb driver for connecting db.
   we will use moongoose -- third party package. Notice moongoose uses schemas which mongodb driver does not use.
   so install npm install --save mongoose
   ----------------------------
   Undestanding mongoose schemas and models
   - Post model object at backend has id as well which will be created by mongoose automaticaly for us.
   --------
   Connect node app to mongodb server
   - go to cloud hosted server -click connect - connect to application & copy the code
   ------------------------------
   Routing
   -----------
   1. Routes are simple Js objects which defines for which url which part of app should be presented. see app-routing-module.ts
   2. client vs server side routing:
   we have routes at front end now and we also have routes at backend in app.js
   These both routes are really not connected ,because they are running on diff. server.
   ow important, these routes here in the angular router are only known by

angular which is a client side application,

so which is a javascript driven application running in the browser.

This means and this will become important when we later deploy this, that the server doesn't know these routes,

neither our backend here nor any server that might serve our angular app
and I will show you which implications this has and how we make the server aware of this fact later

when we deploy this.
It's also important to note that if you were to host your angular app on the same server as your node

app, there will be a couple of things to keep in mind which you will see

but one important thing is that you must not use routes you defined in angular like this /create

route here, that you must not use them in your backend too because what would happen then is that the server

would parse and understand them because you defined them there

and it would not parse the page onto angular to also have a look at that, instead it would do what it

does and

this is probably not that it returns the index.html file.
So this is very abstract, we'll come back to this when we deploy our app

but it's important to understand the difference between client side routing which is all about reading

the url and re-rendering parts of the page and server side routing which is all about handling incoming

requests and sending back something different.

In one case, the server side routing, you really exchange data, you are sending requests and responses, in

the client side case,

you're not doing that, you are reading the url and you're re-rendering the page.
------------------------------
Deployment of App:           |
------------------------------
Option 1: Two seperated Apps : Angular App + Node Express App in different serverss or ports
Option 2: Combined App: We have Node Rest API which has special route which renders Angular App also.
Right now we have option1 with Frontend on localhost:4200 and Backend on localhost:3000 . This is mostly used deployment option.
On backend we always need a host which is capable of running Node Js code but front end we dont need such thing. only static host
which can server html,css and js is enough.

Notice for combined app, no need of CORs headers are required because same its same domain and there is nothing like cross domain
things in combined app. but ur server should be able to run node js script on server. 
---------
---------
Deploying Rest API:
-------------------------------------------------------------------------------
So now if we reload the app and therefore we are not logged in, we can see that we get no buttons down

there

and that's correct

and as soon as I do login here and I go back, we actually also don't see them.

Now this can be quite challenging to identify, what's the issue here?

The problem is in the post list component, we're setting up our listener, right,

and this of course means whenever we push that authentication information, this will be updated here.

But the problem is the post list component is only loaded after we logged in because we navigated to it,

so ngOnInit only runs after we have authenticated ourselves.

So this of course means there is no new information being pushed after the post list component has been

created and we don't fetch the current information here,

we just push new information.

Now there are a couple of ways of solving this, one is for example to use a different type of subject.

There is a subject which automatically should yield you the previous value but I will use a very straightforward

way instead. Here in auth service,

I will simply add a new private property, isAuthenticated which I'll set to false initially and I will

set it to true in the same place where I push that information,

so here I will set this isAuthenticated equal to true or at least I want to do that if we have a token

because that's a check

I should add anyways, only if we have a valid token, only then I want to set this to true and only then

I want to change the status.

So I will first of all check if we have that token because we could have gotten a response which contains

no token,

so only if that is the case I want to set this

but if it is the case, well then I will use this isAuthenticated and set this to true and push that

information to the other components.

Now since we have this authenticated property in this component now, I can add a new method here at the top,

getAuthStatus or maybe getIsAuth and there I will return

this is authenticated

and now we can call this method to find out whether the user is authenticated. In the post list

component,

I will do that.

I will register this listener because this will become important once we connect the logout button

which will be in here and therefore we are on the page when the auth status changes

but for now when we first visit the page, I will have set this user is authenticated by reaching out

to the auth service and calling getIsAuth there.

And now with that, if we reload and I login

and I go back to my messages, now we correctly see the buttons.

So now this is also working in this case.

Now we're still not there yet,

we need to connect the logout button and we also have another issue. If we are not authenticated, we can still

create a new post by manually entering the URL, I can enter /create here and boom, I'm on the

creation page,

I also want to prevent this.

So still some work to do.
---------------------------
Missing things:
1. Image upload
2. Error Handling
3. Autorization : Conencting right post to right user
4 . deployment

----------------------------------------------------------------------------------------------------------
-------------------------------------------------
Authorization: Connect Right users to right posts
-------------------------------------------------
1. We dont want to allow every user to edit or delete every post. The user who created the post should be only able to edit or delete the post.
2. So We want to store the infomration which user created the post in my DB.
3. Two options are there-
   a) Store list of posts in user object
   b) Store users or precisely user(who created the post) in Post object
And we will match if userId of user who sending the request matches the user ID of the post.
Lets implement b)
Change the POST method of posts.js to add creater property. But how to get that ID, because we are not passing that ID but it is part of
token.SO  we can fetch that user id from that token i.e token can be decoded.Note that jwt.verify() method in check-auth returns decoded token.
so set that data on req. and capture posts routers.
so we can store userId as part of our Post.
------
Lets deny request for deleting and editing a post on backend if it is made by user who did not created that post.

----------------
Lets look at frontend side
Till now , everyuser can click delete (eventhough he did not created post , though it dont delete post but click possible).
so in post list component , we should only show buttons (Delete) for them who authenticated + creater of post. That means we need to get that user Id
at front end as well.
so from backend (/login) , also return userId along with token and expiry.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
Error Handling: Section 10
--------------------------
Place 1: Just sign up and see spineer does not go away and Error on console even though signup is successfull.
Solution: Go to createUser() in auth service and see we handling response but not error.
Also we have set isLoading =true in signup component just before sending req. and so spinner always there.
solution is : return obserables in auth service and dont subscribe in this component rather subscribe in signup component.

If you signup with credential which are taken -- error , see on console.
If you sign up with credential which are not taken - successful sign up with no error on console.
similarly if you enter invalid password.. spineer should go away with error on console.
-----
Go to angular material -pop up and modals for error dialogue
Let use global error handler for general error handling using dialogue.Lets add error.interceptor.ts at global level.
Every http req will have this error interceptor now attached to it.







--------------------------
Optimizations: Section 11
--------------------------
----------------------------------------------
Deploying App or shipping your App: Section 12
----------------------------------------------
Till now , we had Frontend App using Angular + Backend Powered by Express/NodeJs.
There are 2 options to deploy:
1. Deploy two seperated Apps (FrontEnd and Backend in NodeJS/Express)
FrontEnd: localhost:4200 and Backend: localhost:3000
2. Deploy one combined App(FrontEnd+Backend combined) - 1 app. We have NodeJS Rest API which renders Angular App also on a special route of Rest API.

Lets consider option 1.
We need to start 2 process.
- Angular app is just static app and it just requires static host(because Angular app does not execute server side code) capable of serving HTML,CSS, JS. Example: AWS S3, Firebase hosting etc. We just send HTTP req. via browser (HTML+Css+Js), so only static host needed.
- On Backend side , we need some host capable of executing NodeJs code . e.g AWS EC2, EBS etc. NodeJs code is not something everyhost can execute.
So both are in different domains (port : 4200 and port 3000) and they are not connected. So we always need cors headers settings at Backend because both app is in different domain. But if we have combined app, we can omit cors setting because one combined app(with one port).

In option 2: we need a host which can exeucte NodeJs code + can serve angular app as well.
Option 1:    CORS headers required
option 2: NO CORS headers required
---------
lets move server.js in backend folder so that all backend things are in single folder backend.
Also copy package.json to backend and keep in both project and remove all ng related scripts from it.

lets see Angular part now.
Go to AWS-> Elastic Bean stalk  --> create new app -> name: node-angular
create enviornment ->webservr->NodeAngular-env and Platfrom ->Nodejs and upload code option
select all files from backend folder and simply Zip them all and upload Zip file.->create enviorment.
Configire more options-> Low cost/free tier+pick latest node js version and nginx and add Enviornemtn properties e.g Jwt key
npm install --save bcryptjs and replace bcrypt with bcryptjs if it fails in EBS. and in users.js in backnd import bcryptjs only.
Zip again all backend files and upload in ebs aws service.
now if you access app in browser u get bad gateway error: , so change modify software and select node command : node server.js
because it by default looks for app.js

Access app : hostname/api/posts -still error because mongodb can be accessed only by local Ip.
Go to IP whitelist and add one more iP of node server in AWs.
Go to dashboard - show logs in EBs and see IP with log events with key EIP somewhere. and add same in whitelist in mongodb.
restart app server from actions in aws ebs dashboard.
so now express API is running in EBs.
---------------------------
Deploying the frontend -> lets build it using angular cli. i.e take all angular code and ts code and compiling that to bunch of js and html files.
because angular is browser side framewrok.
run ng build --prod
Dont forget to change backend url in angular app with the host backend of aws everyplace. (that is optimization part ,making url configuration at one place).
Now go to dist folder -- these are the files we want to deploy to aws static host.
ebs- is for dynamic content
aws s3 - is for static content - its a static cloud storage service and can be used as static host.

aws->s3->create new bucket 
name:mean-angular-node
got to bucket and upload select all files from dist folder here.
bucket is just a file storage and by default it is not accessible by other people.
click permissions -bucket policy 
see docs of aws on bucket policies examples : Grant read only permission to anonymous user
copy and paste in s3 policy and replace bucket name,.
click properties ->static website hosting -> use this bucket to host the website.
give index.html in both index and error document.
Error document -index.html required because 
This second part is required for your Angular routes to work because if the user enters something, like

yourdomain/auth/login, that would by default be first parsed by your server.

The server doesn't know that route though

and there also is no sub-folder named auth or login,

so it would throw an error. By adding index.html as an error document,

it will then forward that error to the index.html file and will execute that file

and since that file contains your Angular app which knows its routes, the Angular router can then parse

the URL and the Angular router will understand it and render the correct component.

So this is absolutely required to ensure that your routes keep on working.

So hit save then and now the static website hosting is enabled,
click url in static website hosting to access app.
-----------------------
Lets use integrated apporach to deploy our app rather 2 seperated app.

lets build angular app under backend folder itself. change outputpath: backend/angular in angular.json.


In the last lectures, we deployed our app by deploying it as two separated apps, back-end and Angular app,

we can also deploy it as one app though. For that,

let's first of all make sure that we build our Angular app as a folder into our back-end folder, so that

we just deploy the entire content of the back-end folder as one single app. For that we can go to the

angular.json file which is used by the CLI to configure our project

and there, we can change the output path for when we are building our application,

we can do that here under output path.

Let's change this to back-end Angular,

you can name this whatever you want.

Now with that, if you run ng build --prod, it should build that Angular app into a sub-folder

of your back-end folder, so into that Angular sub-folder that should be created there.

Of course make sure to choose a folder which doesn't exist yet,

so using controllers would not be ideal because you would delete your existing code.

Now once it's done, you have that new Angular folder here which contains the compiled application

and now we just need to adjust our code here to serve that application successfully.

It would be an idea to serve our Angular app

if we're getting a request which is just targeting slash nothing.

So if we have requests targeting API posts or users, we forward them to these routes,

if we have a request targeting anything else actually, then I want to handle that with Angular

----
change in app.js 
use: app.use(""); // we want to handle it by angular

let's say, that setting is especially important by the way because you want to ensure that the Angular

router can take over and if you only forward requests targeting slash to the Angular app, then you

would not be able to handle the cases where the user directly enters /auth/

for example and you don't want to manually set up all these paths here to map them to a Angular

page,

instead you always want to return that Angular index.html file,

so this file, you always want to return that if it is a route you are not recognizing otherwise,

so if it's not one of your API routes basically.

That also means that you must not use a path you have defined here in your Angular app with the Angular

router because it will never reach the Angular router because it would be handled by the back-end first,

that's important to keep in mind. All other requests should be handled though and therefore, we simply

don't need a filter here.

Instead whenever we reach this part here which we don't if we make it into one of these routes, then

I want to return the Angular app.

So here I defined my well-known function with request, response,

next, here I want to send back a file,

the index.html file.

app.use((req,resp,next)=>{
  resp.sendFile(path.join(_dirname,"angular","index.html"));
})

So here I can call send file and here, I just want to select that index.html file

and here we have to define an absolute path which I'll do with the help of the path package here.

So I will create a path by using path join here and I'll join the Angular folder with the index.html

file there,

this should forward that file for any request not targeting any of our API routes and we can test this

locally by running npm start, npm run start server.

This will spin up the Node server and we can test it by opening a new tab and visiting http://www.localhost:3000

because that is our local testing domain of the Node express app and now that we're serving everything

from one server,

this is the way to test it

and here it's not working because I forgot something, we need to start with dirname which is the absolute

path to this folder which is important to have a valid path in the first place.

So add this and then let it reload and now reload that page and

we now got an empty page here and the reason for that is that

we do get back our Angular application, as you can tell if you reload with the network tab opened.

You do get that index.html file with the app root element but all the scripts are not loaded

correctly because we need to do one other thing,

we need to allow static access to the Angular folder, just as we did it for images earlier in the course.

So we can copy that line for accessing images

but here important,

we actually want to forward requests going to just slash

nothing because we're going to serve Angular for any other route. So we don't want to make any assumptions

about the route, it should fake as if it were serving that from the root folder

but then it should be reaching out to the Angular folder.

app.use("/",express.static(path.join(_dirname,"angular")));

Additionally we have to join dirname and Angular and

we should also do that on images by the way. Here for Angular,

this is absolutely required though,

otherwise this request here can't reach or the requests sent by the index.html file I should say

can't reach the Javascript files and so on it needs.

So now if you save that with that updated static route here,

if you reload the page, now you see the Angular app here too,

so now this seems to work.

So now this is the solution which we can deploy. Here

we can also quickly test if we can login and so on,

let's test that all locally.

Let's create a new post

with an image and

that is working and let's delete the post so that we don't have it in the database.

Now we can deploy that solution, so let's quit our local testing server

and let's instead again package that all up.

Now keep in mind this contains our Angular app and that's important,

you always need to rebuild the app before shipping a new version to the server

and then we can go back to our Elastic Beanstalk application and upload the new version, includes Angular.

Choose that file from the back-end folder, that archive.zip file and deploy that version which now does

include Angular and these updated settings regarding our routing or how we load Angular. This also means

that we will be able to shut down S3 and not use it anymore.

So let's wait for this to redeploy

and now that it's done, let's click that link and here, it does load the Angular app as it should.

And now let's test it here too,

let's login, let's create a new post, testing this,

let's pick an image

and add some content

and now if I save this, this also works as before,

also if we edit it without editing it or edit it with editing it or if we logout and login with a

different user, then we also still see this but we can't edit it

but now we can add our new content here of course. Just as we could do it locally

but now again on the server but now in one combined application and we can also still delete this of course.

So now everything is working as it was working throughout the course but now we deployed it and it's up to

you whether you choose that combined solution or the split up one.

Now you typically take the one with two apps

if you also plan to use your API with other client-side applications, like let's say a mobile application and

you might lean towards the integrated approach with one app only if you have, well only that one app,

if you've got no other clients connecting to it and if you therefore want to have everything run on one server.

Keep in mind, you can now also remove these headers here.

If I comment them out in the app.js file and I redeploy this,

so let's compress that all again and let's again go back to our console here,

to the Elastic Beanstalk console and let's choose that new archive.zip file,

if I now deploy this, you will see the Angular app will still continue to work and this is only the

case if you have that integrated approach because now everything is running on the same server,

it would not work if you had different servers. This of course also means no one else can access your

API

and if that's important for you and you only got one client app that should connect to it, that would

be another argument for using that integrated one app only approach. Both is absolutely fine,

you see both in action and that is why it was important to me to show you both.

So let's just wait for this to finish,

let's reload that

and there you can see if I do login again,

this still works as before, we got no cors errors, the image was just missing because I redeployed the

entire folder which contains the image folder

and now again, we got a working application.
-------------------------------------------------------------------------------------------------------

Remaining:
---------
Optimizations:
Image Upload
Pagination:


