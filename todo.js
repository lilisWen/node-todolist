var fs = require('fs')
var path = require('path')
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]
const dbpath = path.join(__dirname, 'db')

function save() {
    fs.writeFileSync(dbpath, JSON.stringify(list)) //存储数据到数据库
}

function fetch() {
    const listContent = fs.readFileSync(dbpath).toString()
    let list
    try {
        list = JSON.parse(listContent) || []
    } catch (err) {
        list = []
    } //从db中读取数据
    return list
}

function display(list) {
    for (let i = 0; i < list.length; i++) {
        const mark = list[i][1] ? '[X]' : '[_]'
        console.log(`${mark} 任务：${list[i][0]}`)
    }
}

function addTask(list, content) {
    list.push([content, false])
}

function removeTask(list, n) {
    list.splice(n - 1, 1)
}

function markTaskDone(list, n) {
    list[n - 1][1] = true
}

function editTask(list, n, newContent) {
    list[n - 1][0] = newContent
}
try {
    fs.statSync(dbpath)
} catch {
    fs.writeFileSync(dbpath, '[]')
}
const n = content
let list = fetch()
switch (verb) {
    case 'add':
        addTask(list, content);
        break;
    case 'list':
        break;
    case 'delete':
        removeTask(list, content)
        break;
    case 'done':
        markTaskDone(list, content)
        break;
    case 'edit':
        editTask(list, content, content2)
        break;
    default:
        console.log('我不知道你想干什么')
        break;
}
if (verb !== 'list') {
    save(list)
}
display(list)