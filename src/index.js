import express from "express";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('App listening');
});

export default app;