import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import connectMongoDB from "./database/db";
import router from "./routes/user";

const app = express();

const port = process.env.PORT || 8000;


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(express.json());
app.use("/v1",router)
app.use(errorHandler);

connectMongoDB()
    .then(() => {
        console.log("Connnected to mongodb successfully");
    }).catch((err) => {console.log(err)});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});