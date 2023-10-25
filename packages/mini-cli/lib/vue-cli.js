import inquirer from 'inquirer'
// import simpleGet from 'simple-get'
import { simpleGit } from 'simple-git';

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
        .then(async (answsers) => {
            // console.log('djch answsers', answsers)
            const remote = 'https://github.com/bencodezen/vue-enterprise-boilerplate.git';
            // console.log('djch ', Object.keys(simpleGet), simpleGet.get.toString())
            // https://github.com/bencodezen/vue-enterprise-boilerplate.git
            // simpleGet.get(remote, function (err, res) {
            //     if (err) {
            //         console.error(err)
            //         throw err
            //     }
            //     // console.log('ddd', res) // 200
            //     // res.pipe(process.stdout) // `res` is a stream
            // })


            const options = {
                baseDir: process.cwd(),
                binary: 'git',
                maxConcurrentProcesses: 6,
                trimmed: false,
             };
             
             // when setting all options in a single object
             const git = simpleGit(options);
             try {
                console.log(1, process.cwd())
                // process.cwd() bin目录同级，git clone 的参数2也是相对该目录
                await git.clone(remote, './test1/');
                console.log(2)
             } catch (e) {
                /* handle all errors here */
                console.log('djch e', e)
             }

        })
        .catch((err) => console.log('djch err', err))
}