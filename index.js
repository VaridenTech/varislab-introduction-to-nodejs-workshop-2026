#!/usr/bin/env node

import { readTodos, saveTodos, addTodo, markDone, removeTodo } from './src/todos.js';
import { start } from './server.js';

const [command, arg] = process.argv.slice(2);

const todos = await readTodos();

switch (command) {
    case 'add':
        await saveTodos(addTodo(todos, arg));
        console.log('add', arg);
        break;
    case 'list':
        todos.forEach(todo => {
            console.log(todo.id, todo.done ? '✅' : '⬜', todo.text)
        });
        break;
    case 'done':
        await saveTodos(markDone(todos, Number(arg)));
        console.log('done', arg);
        break;
    case 'remove':
        await saveTodos(removeTodo(todos, Number(arg)));
        console.log('remove', arg);
        break;
    case 'web':
        console.log('web', arg);
        start(todos, Number(arg) || 3000);
        break;
    default:
        console.log('unknown command');
}