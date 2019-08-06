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
2. Why dont we directly connect angular to mongodb by surpassing node express app.? It is technically possible.
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
