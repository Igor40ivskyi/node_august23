import express, { Request, Response } from "express";

const users = [
  {
    name: "Andriy",
    age: 30,
    gender: "male",
  },
  {
    name: "Vasya",
    age: 22,
    gender: "male",
  },
  {
    name: "Ann",
    age: 13,
    gender: "female",
  },
  {
    name: "Monica",
    age: 25,
    gender: "female",
  },
  {
    name: "Ivan",
    age: 40,
    gender: "male",
  },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req: Request, res: Response) => {
  console.log("HELLO FROM APP GET /");
  res.status(200).json(users);
});

app.get("/users/:userId", (req: Request, res: Response) => {
  console.log(req.params);
  const { userId } = req.params;
  res.status(200).json(users[+userId]);
});

app.post("/users", (req: Request, res: Response) => {
  users.push(req.body);

  res.status(201).json({
    message: "User created!",
  });
});

app.put("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log(users);

  users[+userId] = req.body;

  console.log(users);

  res.status(201).json({
    message: "User updated!",
    data: users[+userId],
  });
});

app.delete("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;

  users.splice(+userId, 1);

  res.status(200).json({
    message: "User deleted!",
  });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
