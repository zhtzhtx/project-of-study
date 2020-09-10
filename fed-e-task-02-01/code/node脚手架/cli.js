#!/usr/bin/env node

const inquirer = require("inquirer");
const path = require("path")
const fs = require("fs")
const ejs = require("ejs")

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
]).then(anwsers => {
    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()
    // // 将模板下的文件全部转换到目标目录
    // fs.readdir(tmplDir, (err, files) => {
    //     if (err) throw err
    //     files.forEach(file => {
    //         // 通过模板引擎渲染文件
    //         ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
    //             if (err) throw err
    //             fs.writeFileSync(path.join(destDir,file),result)
    //         })
    //     })
    // })
    readdir(tmplDir, destDir, anwsers)
})
// 读取模板下的所有文件
function readdir(dirPath, targetPath, options) {
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err
        // 通过模板引擎渲染文件
        files.forEach(file => {
            fs.stat(path.join(dirPath, file), (err, result) => {
                if (err) throw err
                // 判断是否为文件夹
                if (result.isDirectory()) {
                    fs.mkdirSync(path.join(targetPath, file), { recursive: true })
                    readdir(path.join(dirPath, file), path.join(targetPath, file), options)
                } else {
                    ejs.renderFile(path.join(dirPath, file), options, (err, result) => {
                        if (err) throw err
                        fs.writeFileSync(path.join(targetPath, file), result)
                    })
                }
            })
        })
    })
}
