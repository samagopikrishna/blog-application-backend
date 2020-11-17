const express = require("express");
const Author = require("../models/Author");
const Post = require("../models/Post");

const AuthorRouter = express.Router();

AuthorRouter.get("/", async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).json({ authors });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
})
  .get("/:id", async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      const authorPosts = await Post.find({ author: req.params.id });
      // var details = {author,authorPosts}
      res.status(200).json({ author: author, authorPosts: authorPosts });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })
  .post("/", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await new Author({
        name
      }).save();
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = AuthorRouter;
