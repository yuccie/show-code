#! /usr/bin/env node
import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'

// 定义问题数组
const questions = [
    {
        type: 'input',
        name: 'title',
        message: '请输入文章标题：',
        validate: val => {
            if (!val.trim()) return '必填，请输入文章标题';
            return true
        }
    },
    {
        type: 'input',
        name: 'tags',
        message: '请输入文章tags，逗号分割：',
        validate: val => {
            if (!val.trim()) return '必填，请输入文章tags';
            return true
        }
    },
    {
        type: 'input',
        name: 'summary',
        message: '请输入文章概要：',
        default: answers => answers.title ? answers.title : '不该显示的概要'
    },
];

const handleAnswers = (answers) => {
    const pwd = process.cwd()
    fs.readdir(pwd, (err, files) => {
        if (err) {
            console.error('无法读取目录:', err);
            return;
        }

        const fileNames = files.filter(file => {
            const filePath = path.join(pwd, file);
            return fs.statSync(filePath).isFile() && /^\d+_.+\.md$/.test(file)
        })

        // 获取最后一个文件的序号，需要正则过滤
        const lastFileIndex = +fileNames[fileNames.length - 1].split('_')?.[0] + 1
        const { title, tags, summary } = answers

        const newFileName = `${lastFileIndex}_${title}.md`
        const absoultePath = path.join(pwd, newFileName)
        const fileContent = `
            ---
            title: ${title}
            date: ${new Date()}
            lastmod: ${new Date().toLocaleDateString()}
            tags: [${tags.split(',').map(item => item.trim())}]
            draft: false
            summary: ${summary}
            layout: PostSimple
            bibliography: references-data.bib
            canonicalUrl: https://dume.vercel.app/${absoultePath.split('/data/')[1]}
            ---
        `

        // fileContent.trim().replace(/^\s+/gm, '') 去除两端的空白，然后取消每行的缩进
        fs.writeFile(newFileName, fileContent.trim().replace(/^\s+/gm, ''), (err) => {
            if (err) {
                console.error('无法创建文件:', err);
                return;
            }
            console.log('文件已成功创建并写入内容。');
        });
    })
}

// 使用 inquirer.prompt() 方法提问
inquirer.prompt(questions)
    .then(answers => {
        handleAnswers(answers)
        console.log('djch answers', answers)

    })
    .catch(error => {
        console.error('发生错误：', error);
    });
