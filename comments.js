// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create web server
const app = express();

// Add middleware to parse json data
app.use(bodyParser.json());

// Allow cross-origin requests
app.use(cors());

// Create comments array
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to create comment
app.post('/posts/:id/comments', (req, res) => {
  // Create id for comment
  const commentId = randomBytes(4).toString('hex');

  // Get comment from request body
  const { content } = req.body;

  // Get comments for specific post
  const comments = commentsByPostId[req.params.id] || [];

  // Create new comment
  const newComment = { id: commentId, content };

  // Add new comment to comments array
  comments.push(newComment);

  // Save comments array to commentsByPostId
  commentsByPostId[req.params.id] = comments;

  // Send new comment back to client
  res.status(201).send(newComment);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on port 4001');
});