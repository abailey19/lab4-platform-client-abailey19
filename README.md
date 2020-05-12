# Anne Bailey
## CS 52, Lab 4: Redux Blog

### The lab
For this lab, I created an Redux platform that allows users to create, update, and delete blog posts with Markdown formatting. It is deployed on http://annebailey-placesblog.surge.sh.

What didn't work: I initially tried setting up all the Redux functionality at once, and mistakes I made in one area would be repeated in another.

What worked: I then decided to create a slightly more useable UI and just get fetching all posts to work. I then moved to fetching a single post, then deleting a post, and finally updating a post. This helped me implement things I learned with each CRUD action in the next one I worked on.

### Extra credit
Error handling: If an API call fails, a separate error reducer handles that error and shows an error message on the screen. (To test this, uncomment the commented line of code in fetchPosts in index.js, and uncomment the rest of the function body.) One error that the API does not return as an actual error is if the user tried to navigate to a specific post page using a post ID that doesn't exist. (The API just returns a message saying that that post does not exist.) In this case, I display a message to the screen saying that the post doesn't exist.

Input validation: If a user leaves a field empty when adding a post or updating a post, a warning message will be displayed, and the user won't be able to create or update the post until that field is filled. 

Filtering posts: A search bar allows users to filter posts by tag. 

## Lab 5: Platform API
For the second part of this lab, I build a backend for the blog using express and MongoDB. The backend code can be found here: https://github.com/dartmouth-cs52-20S/lab5-platform-api-abailey19 and is deployed to http://abailey-blog.herokuapp.com/api. I also added a comments feature, so that users can comment on each post.
