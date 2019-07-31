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