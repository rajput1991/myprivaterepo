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


