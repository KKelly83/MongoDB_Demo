import express from "express";
import cors from "cors";
import data from "./api/data.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/employee", data);

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});