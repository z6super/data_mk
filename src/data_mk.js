const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
var Mock = require('mockjs')
var Random = Mock.Random

async function jsonMaker (fileName) {
  try {
    
    console.log('__dirname : ' + __dirname)
    const cwd = process.cwd()
    const _path = path.join(cwd, fileName)
  
   // const _path=path.join(__dirname,fileName)

    const packageObj = await fs.readJson(_path)
   
    const json= await parseJsonAll(packageObj)

    const split_name=fileName.split('.json')[0]

    const mk_name=split_name+'_mk.json';
    
    await fs.writeJson(mk_name, json)
    
  } catch (err) {

    console.error(err)

  }

}


function ask(){

  const promptList = []
    // 具体交互内容
    promptList.push({
      type: 'input',
      name: 'jsonFile',
      message: '请输入json路径！',
      validate (input) {
        if (!input) {
          return 'json路径不能为空！'
        }
        if (!fs.existsSync(input)) {
          return 'json不存在！'
        }
        return true
      }
    })
  

 return inquirer.prompt(promptList)

}

function toDo(){

  ask()
  .then(answers => {
    console.log(answers)
    jsonMaker(answers.jsonFile)
  })
}

function parseJsonAll(json){

   
  for(var key in json){

    //console.log(key+'===key')    //键
    
    console.log(json[key])  //值

   
    if(Array.isArray(json[key])){

     // console.log('===right')    //键

      parseArrAll(json[key])
    
    }else{
     
      parseCore(json[key])


    }
    
  
  }

  return json
    
    
}


function parseArrAll(jsonArr){

    
  for(var obj in jsonArr){

    console.log(obj+jsonArr[obj]);
   
    if(Array.isArray(jsonArr[obj])){

      console.log('isArray')

      parseArrAll(jsonArr[obj])
  
    }else{

      console.log('please parse')

      parseCore(jsonArr[obj])
    }
     
   }
  

}


function parseCore(obj){


  for(var  key in obj){

    if(key === "url"){ //修改josn中指定属性值
     
        obj[key]=Random.url();
          
       }

       if(key === "title"){ //修改josn中指定属性值
     
        obj[key]=Random.word(5);
          
       }

       
      

     }
   
     console.log(obj)//打印修改之后的json'

}

exports.dataMk=toDo;
  //toDo()

