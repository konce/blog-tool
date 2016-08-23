#! /usr/bin/env node

var program = require('commander');
program.version('0.0.1');

program
  .command('preview [dir]')
  .description('实时预览')
  .action(function (dir) {
    console.log('preview %s', dir);
  });

program.parse(process.argv);
