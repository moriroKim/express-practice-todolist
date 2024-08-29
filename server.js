const express = require('express');
const cors = require('cors');

let todo = [
    { id: 1, content: '더미데이터' },
    { id: 2, content: '터미네이터' },
];
const app = express();

app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    })
);

app.use(express.json());
app.use(express.text());

app.options('/', (req, res) => {
    return res.send('요청 보내세요.');
});

app.get('/', (req, res) => {
    return res.json(todo);
});

app.post('/', (req, res) => {
    console.log(req.body);
    const newTodo = { id: Number(new Date()), content: req.body };
    todo.push(newTodo);
    return res.send('Todo가 추가됐습니다.');
});

app.put('/', (req, res) => {
    const newTodo = req.body;
    todo = todo.map((el) => {
        if (el.id === newTodo.id) {
            return newTodo;
        } else {
            return el;
        }
    });
    return res.send('Todo가 수정됐습니다.');
});

app.delete('/', (req, res) => {
    console.log(req.body);
    const id = Number(req.body);
    todo = todo.filter((el) => el.id !== id);
    return res.send('Todo가 삭제됐습니다.');
});

app.listen(3000, () => {
    console.log('서버가 열렸어요!');
});
