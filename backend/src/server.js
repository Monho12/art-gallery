import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import artRoutes from './routes/artRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json())
app.use(rateLimiter)

app.use(artRoutes);
app.use(userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on PORT:", PORT);
    });
});


