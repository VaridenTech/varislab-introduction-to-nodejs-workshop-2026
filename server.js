import http from 'node:http'

const buildHtml = (todos) => {
  const items = todos.map(todo => {
    const mark = todo.done ? '✅' : '⬜'
    return `<li>${mark} ${todo.text}</li>`
  }).join('')

  return `
    <h1>รายการสิ่งที่ต้องทำ</h1>
    <ul>${items}</ul>
  `
}

export const start = (todos, port) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(buildHtml(todos))
  })

  server.listen(port, () => {
    console.log(`เปิดดูได้ที่ http://localhost:${port}`)
  })
}