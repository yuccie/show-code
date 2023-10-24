import inquirer from 'inquirer'
import simpleGet from 'simple-get'

export default function handleVueTemplate() {
    const vueQuestions = [
        {
            type: 'list',
            name: 'vueVersion',
            choices: ['vue3', 'vue2'],
            message: '选择vue版本',
        },
        {
            type: 'list',
            name: 'compileType',
            choices: ['vite', 'webpack'],
            message: '选择编译工具',
        },
        {
            type: 'list',
            name: 'installType',
            choices: ['npm', 'pnpm', 'yarn'],
            message: '选择安装工具',
        },
    ]

    inquirer
        .prompt(vueQuestions)
        .then((answsers) => {
            console.log('djch answsers', answsers)
            simpleGet('./', () => {
                console.log('ddd')
            })
        })
        .catch((err) => console.log('djch err', err))
}