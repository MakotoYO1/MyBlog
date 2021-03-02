import DB from '../db/db'
const {Auth} =DB.Models

// 初始账号默认为admin，123，后续自己修改
create({name:'admin',pwd:'123'}).then(res=>{
  console.log('初始账号创建成功:')
  console.log(res)
}).catch(err=>{
  console.log('已存在后台账户：',{name:'admin',pwd:'123'})
})


// 判断是否存在auth
export async function exist(){
  // 存在返回true，否则为false
  const exists=await Auth.exists({})
  return {
    exists
  }
}

// 建立新的auth
export async function create(params){
  const {exists} =await exist()
  if(exists){
    throw new Error('已存在，无法再创建')
  }
  const time=new Date()
  const account=await new Auth({
    name:params.name,
    pwd:params.pwd,
    create_time:time,
    modify_time:time
  }).save()
  return {
    account
  }
}


// 查找
export async function find(params){
  const account=await Auth.findOne({
    name:params.name,
    pwd:params.pwd
  })
  return {
    account
  }
}

// 修改
export async function update(params){
  const account_old=await Auth.findOne({
    name:params.oldname,
    pwd:params.oldpwd
  })
  if(!account_old){
    return {
      code:-1,
      message:'原信息有误'
    }
  }
  await Auth.findOneAndUpdate({
    name:params.oldname,
    pwd:params.oldpwd
  },{
    name:params.newname,
    pwd:params.newpwd
  })
  return {
    code:0
  }
}
