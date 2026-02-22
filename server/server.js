import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let clients = [
	{ id: 1, name: "Test client" },
	{ id: 2, name: "Another client" }
];

app.get("/clients", (req, res) => {
	res.json(clients);
});

app.post("/clients", (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ message: "Name is required" });
	}

	const newClient = {
		id: Date.now(),
		name,
	};

	clients.push(newClient);
	res.status(201).json(newClient);
});

app.delete("/clients/:id", (req, res) => {
	const id = Number(req.params.id);
	clients = clients.filter(client => client.id !== id);
	res.status(204).end();
});

app.listen(4000, () => {
	console.log("Server started on port 4000");
});