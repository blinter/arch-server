import express, { Request, Application, Response } from 'express'

const app: Application = express()

const PORT = 4500;
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('hi, mother fucker.........')
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Servidor em execução https://localhost:${PORT}`);
});