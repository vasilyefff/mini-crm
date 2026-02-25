import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ====================
// Данные (пока просто в памяти)
// ====================

// Клиенты
let clients = [
	{ id: 1, name: "Test client" },
	{ id: 2, name: "Another client" },
];

// Сделки
let deals = [];

// ====================
// Роуты для клиентов
// ====================

// Получить всех клиентов
app.get("/clients", (req, res) => {
	res.json(clients);
});

// Добавить клиента
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

// Удалить клиента
app.delete("/clients/:id", (req, res) => {
	const id = Number(req.params.id);
	clients = clients.filter(client => client.id !== id);
	res.status(204).end();
});

// ====================
// Роуты для сделок
// ====================

// Получить все сделки
app.get("/deals", (req, res) => {
	res.json(deals);
});

// Добавить сделку
app.post("/deals", (req, res) => {
	const { title, amount, clientId } = req.body;

	if (!title || !amount || !clientId) {
		return res
			.status(400)
			.json({ message: "Title, amount and clientId required" });
	}

	const newDeal = {
		id: Date.now(),
		title,
		amount: Number(amount),
		status: "new",
		clientId: Number(clientId),
	};

	deals.push(newDeal);

	res.status(201).json(newDeal);
});

// Удалить сделку
app.delete("/deals/:id", (req, res) => {
	const id = Number(req.params.id);
	deals = deals.filter(deal => deal.id !== id);
	res.status(204).end();
});

// ====================
// Запуск сервера
// ====================

app.listen(4000, () => {
	console.log("Server started on port 4000");
});