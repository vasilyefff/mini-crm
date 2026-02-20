import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/clients", (req, res) => {
	res.json([
		{ id: 1, name: "Test client" },
		{ id: 2, name: "Another client" }
	]);
});

app.listen(4000, () => {
	console.log("Server started on port 4000");
});