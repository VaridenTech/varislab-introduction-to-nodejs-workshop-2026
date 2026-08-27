import fs from 'fs/promises';

const DB_PATH = new URL('../db.json', import.meta.url).pathname;

export const readTodos = async () => {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export const saveTodos = async (todos) => {
    await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2));
}

// Modify the todos
const nextId = (todos) => {
    if (todos.length === 0) return 1;

    return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const addTodo = (todos, text) => {
    const todo = { id: nextId(todos), text, done: false };
    return [...todos, todo];
}

export const markDone = (todos, id) => {
    return todos.map(todo => todo.id === id ? { ...todo, done: true } : todo);
}

export const removeTodo = (todos, id) => {
    return todos.filter(todo => todo.id !== id);
}