import express from "express";
import { Post } from "../models/post.js";

const router = express.Router();

// Creating posts
router.post("/", async (req, res) => {
  try {
    const post = new Post({
      email: req.body.email,
      name: req.body.name,
      country: req.body.country,
      phone: req.body.phone,
      sex: req.body.sex,
      food: req.body.food,
      ingredients: req.body.ingredients,
      imageUrl: req.body.imageUrl,
    });
    await post.save();

    res.status(201).send({
      message: "Post recipes successfully.",
      post: post,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single post by id
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email,
        name: req.body.name,
        food: req.body.food,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        country: req.body.country,
        phone: req.body.phone,
        sex: req.body.sex,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete post id
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});


//star react
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    if (post.likedBy.includes(req.body.userId)) {
      return res.status(400).send("You have already liked this post");
    }

    post.likes += 1;
    post.likedBy.push(req.body.userId);
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;