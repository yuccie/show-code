#! /usr/bin/env node

import { program } from 'commander'

import handleVueTemplate from '../lib/vue-cli.js'

program
  .command('create')
  .description('初始化脚手架')
  .version('1.0.0')
  .action(function (argv, opts, cmd) {
    // argv 使整个process上的对象
    // opts 是当前脚本的参数，比如 ./dume crate vue -> ['create', 'vue'] 是个数组
    // cmd
    const { args } = opts || []
    // console.log('djch argv', argv.args, opts.args, cmd)
    const [actionName, frameName] = args || []

    if (actionName === 'create') {
      switch (frameName) {
        case 'vue':
          handleVueTemplate()
          // 弹出vue相关的模版选项
          break
      }
    }
    // console.log('djch ', opts, cmd)
  })
  .parse(process.argv)