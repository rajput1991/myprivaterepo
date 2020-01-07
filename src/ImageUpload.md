----------------------------------------------
Uploading Image and Preview options in MEAN APP
----------------------------------------------
Till now in our app, we created new post but its content is limited to text only. Lets implement something more than text only like Image upload.
So now every post will have a image as well, which end user should be able to upload from their end.
-------------------------------
To implement this , we need to have a button which can open File Picker on click And  On click of save post button , we should be able to save image on server and we will store a path to the image so that we know where it is stored in DB Because we won't store image itself in DB as it would be inefficient.
