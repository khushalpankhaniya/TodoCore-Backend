import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./models/connection.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again later"
});


connectDB();
const app = express();
const port = 3000;

app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
export default app;