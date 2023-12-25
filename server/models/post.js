import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0, 
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export const Post = mongoose.model("Post", postSchema);