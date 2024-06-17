import express, { Request, Response } from 'express';
import { getBotResponse } from './chatbot/otro';

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/chat', (req: Request, res: Response) => {
  const { message } = req.body;
  const response = getBotResponse(message);
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
