import inquirer from 'inquirer'
import { simpleGit } from 'simple-git';
import createLogger from 'progress-estimator'
import path from 'path'
import { isDirectoryEmpty, isFolderExists } from '../utils/index.js'

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
    const cwd = process.cwd()

    inquirer
        .prompt(vueQuestions)
        .then(async (answsers) => {
            // console.log('djch answsers', answsers)
            const remote = 'https://github.com/bencodezen/vue-enterprise-boilerplate.git';


            const logger = createLogger({
                storagePath: path.join(cwd, '.progress-estimator'),
                // https://github.com/sindresorhus/cli-spinners/blob/HEAD/spinners.json 自定义spinner
                spinner: {
                    "interval": 80,
                    "frames": [
                        "[    ]",
                        "[=   ]",
                        "[==  ]",
                        "[=== ]",
                        "[====]",
                        "[ ===]",
                        "[  ==]",
                        "[   =]",
                        "[    ]",
                        "[   =]",
                        "[  ==]",
                        "[ ===]",
                        "[====]",
                        "[=== ]",
                        "[==  ]",
                        "[=   ]"
                    ]
                },
            });
            const options = {
                baseDir: cwd,
                binary: 'git',
                maxConcurrentProcesses: 6,
                trimmed: false,
            };

            // when setting all options in a single object
            const git = simpleGit(options);
            try {
                // console.log(1, process.cwd())
                const targetDir = path.join(cwd, './test/')
                if (!isFolderExists(targetDir) || isDirectoryEmpty(targetDir)) {
                    // process.cwd() bin目录同级，git clone 的参数2也是相对该目录
                    await logger(git.clone(remote, targetDir), '拼命加载中，不要慌...')
                    console.log(2)
                } else {
                    console.log('当前目录不为空')
                }
            } catch (e) {
                /* handle all errors here */
                console.log('djch e', e)
            }

        })
        .catch((err) => console.log('djch err', err))
}