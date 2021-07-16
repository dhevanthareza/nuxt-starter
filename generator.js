const inquirer = require('inquirer')
const CURR_DIR = process.cwd()
const fs = require('fs')
// const listInput = require('inquirer-list-input');
const QUESTIONS = [
  {
    name: 'titleName',
    type: 'input',
    message: 'Input Title Name?(Untuk judul Module ini, ex: Module Name)'
  },
  {
    name: 'apiUrl',
    type: 'input',
    message:
      'Input url api?(url yang diakses module untuk akses api, ex: management/module-url)'
  },
  {
    name: 'ModuleName',
    type: 'input',
    message:
      'Input Module Name? (digunakan untuk nama file(untuk file api) dan variabel, ex: ModuleName)'
  },
  {
    name: 'viewDir',
    type: 'input',
    message:
      'Input view dir? (akan membuat folder view sesuai dir yang diinputkan, ex: management/user)'
  }
]
// inquirer.registerPrompt('list-input', listInput);
inquirer.prompt(QUESTIONS).then((answers) => {
  let { apiUrl, ModuleName, titleName, repositoryName, viewDir } = answers
  repositoryName = `${repositoryName}`
  console.log('CREATING DIR')
  fs.mkdirSync(`${CURR_DIR}/pages/app/${viewDir}`)

  console.log('GENERATING API FILE')
  let createApiContent = fs.readFileSync(
    `${__dirname}/templates/api.js`,
    'utf8'
  )
  createApiContent = createApiContent.replace(/ModuleName/g, ModuleName)
  createApiContent = createApiContent.replace(/api-url/g, apiUrl)
  fs.writeFileSync(`${CURR_DIR}/api/${ModuleName}.js`, createApiContent, 'utf8')

  console.log('GENERATING VIEW INDEX')
  let viewContent = fs.readFileSync(`${__dirname}/templates/index.vue`, 'utf8')
  viewContent = viewContent.replace(/ModuleName/g, ModuleName)
  viewContent = viewContent.replace(/titleName/g, titleName)
  fs.writeFileSync(
    `${CURR_DIR}/pages/app/${viewDir}/index.vue`,
    viewContent,
    'utf8'
  )

  console.log('GENERATING VIEW CREATE')
  let createViewContent = fs.readFileSync(
    `${__dirname}/templates/create-comp.vue`,
    'utf8'
  )
  createViewContent = createViewContent.replace(/ModuleName/g, ModuleName)
  createViewContent = createViewContent.replace(/titleName/g, titleName)
  fs.writeFileSync(
    `${CURR_DIR}/pages/app/${viewDir}/create-comp.vue`,
    createViewContent,
    'utf8'
  )
})
