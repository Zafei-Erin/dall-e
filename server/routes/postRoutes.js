import express from "express"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"
import Post from "./../mongodb/models/post.js"

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// get all posts
router.route("/").get(async (req, res) => {
  try {
    // 从数据库拉取
    const posts = await Post.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: flase, message: error })
  }
})

// create a post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body
    // 传送到cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo)
    // 保存到数据库
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    })

    // 将数据返回给前端
    res.status(200).json({ success: true, data: newPost })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

export default router
