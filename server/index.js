import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import connectDB from "./mongodb/connect.js"
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

// add other routes, 访问对应url获取资源
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/dalle", dalleRoutes)

// server index route
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!")
})

// 在8080端口开server页面，开启前连接数据库
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    )
  } catch (error) {
    console.log(error)
  }
}

startServer()
