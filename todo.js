const todoInput = document.querySelector('input');
const createButton = document.querySelector('button');
const ul = document.querySelector('#todo-list');

// Create => 서버에 Todo 추가할 때
const createTodo = () => {
    const newTodo = todoInput.value;
    return axios
        .post('http://localhost:3000', newTodo, {
            headers: { 'Content-Type': 'text/plain' },
        })
        .then((res) => console.log(res));
};

// Read => 서버에 Todo 정보를 가져올 때
const readTodo = async () => {
    const res = await axios.get('http://localhost:3000');
    return res.data;
};

// Update => 서버에 Todo 정보를 수정할 때
const updateTodo = (newTodo) => {
    return axios.put('http://localhost:3000', newTodo);
};

// Delete => 서버에 Todo 정보를 삭제할 때
const deleteTodo = (id) => {
    return axios.delete('http://localhost:3000', { data: id });
};

// 화면 그려주는 함수
const renderDisplay = (data) => {
    for (let el of data) {
        const list = document.createElement('li');
        list.textContent = el.content;
        const updateInput = document.createElement('input');
        const updateButton = document.createElement('button');
        updateButton.textContent = '수정';
        updateButton.onclick = () => {
            updateTodo({
                id: el.id,
                content: updateInput.value,
            }).then(() =>
                readTodo().then((res) => {
                    removeDisplay();
                    renderDisplay(res);
                })
            );
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.onclick = () => {
            deleteTodo(el.id).then(() =>
                readTodo().then((res) => {
                    removeDisplay();
                    renderDisplay(res);
                })
            );
        };

        list.append(updateInput, updateButton, deleteButton);
        ul.append(list);
    }
};

// 화면 지우는 함수
const removeDisplay = () => {
    while (ul.children.length) {
        ul.removeChild(ul.children[0]);
    }
};

createButton.addEventListener('click', () => {
    createTodo().then(() =>
        readTodo().then((res) => {
            removeDisplay();
            renderDisplay(res);
        })
    );
});

readTodo().then((res) => renderDisplay(res));
