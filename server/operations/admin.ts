import moment from 'moment';
import mongoose from 'mongoose';
import DB from '../db/db';
import { otherCategory } from '../db/models/category';
import { Article, PSetting } from '@/types/schema';

const {
  blogArticle,
  blogCategory,
  blogComment,
  blogSetting,
  Guest,
  personSetting
} = DB.Models;


// blogSetting
// 修改
export async function editBSetting(params){
  // 只存在默认添加的setting，因此find查找不用设置查询条件
  const settings=await blogSetting.findOneAndUpdate({},params,{new:true})
  return {
    settings
  }
}

// personSetting
// 保存
export async function savePSetting(params){
  const exists=await personSetting.exists({})
  const time=new Date()
  if(!exists){
    // 不存在新建
    const ps:PSetting={
      ...params,
      create_time:time,
      modify_time:time
    }
    const settings=await new personSetting(ps).save()
    return {
      settings
    }
  }else{
    params.modify_time=time
    const settings=await personSetting.findOneAndUpdate({},params,{new:true})
    return {
      settings
    }
  }
}

//  blogCategory
// 新建
export async function newCategory(params) {
  const time = new Date();
  const category = new blogCategory({
    cname: params.cname,
    img: params.img,
    sequence: params.sequence,
    create_time: time,
    modify_time: time
  });
  const res = await category.save();
  return {
    category: res
  };
}

// 删除
export async function deleteCategory(ids: string[] | string) {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }
  // 删除掉分类后将其分类归于未分类中
  const res = await Promise.all([
    blogCategory.deleteMany({ _id: { $in: ids } }).exec(),
    blogArticle
      .updateMany(
        { category: { $in: (ids as any) } },
        { category: (otherCategory as any)._id.toHexString() }
      )
      .exec()
  ]);
  return {
    res
  }
}

// 编辑
export async function editCategory(id, params) {
  params.modify_time = new Date();
  const res = await blogCategory.findByIdAndUpdate(id, params, {
    new: true
  });
  return {
    category: res
  };
}

// 获取全部
export async function getCategories() {
  // 以sequence为升序返回
  const res = await blogCategory.find({}, {}, { sort: 'sequence' });
  return res;
}


// article
// 查
export async function getArticle(params){
  const match:any={}
  const {
    title,
    content,
    category,
    labels,
    hasComments,
    create_time,
    modify_time
  }=params
  // title支持模糊全局匹配
  title && (match.title={$regex:title,$options:'gi'});
  content && (match.content={$regex:content,$options:'gi'});
  // labels匹配在对应labels数组中符合的
  labels && (match.labels={$regex:labels,$options:'gi'});
  category && (match.category=mongoose.Types.ObjectId(category));

  if(Array.isArray(create_time)&&create_time.length===2&&create_time[0]&&create_time[1]){
    const s=new Date(create_time[0])
    const e=new Date(create_time[1])
    match.create_time={$gte:s,$lt:e}
  }

  if(Array.isArray(modify_time)&&modify_time.length===2&&modify_time[0]&&modify_time[1]){
    const s=new Date(modify_time[0])
    const e=new Date(modify_time[1])
    match.modify_time={$gte:s,$lt:e}
  }

  if(hasComments){
    match.comments={['$gt']:[]}
  }else{
    match.comments={['$lt']:[]}
  }
  const page=parseInt(params.page)
  const pageSize=parseInt(params.pageSize)
  const aggregate=[
    {
      $lookup:{
        from:'category',
        foreignField:'_id',
        localField:'category',
        as:'categories'
      }
    },
    {
      $lookup:{
        from:'comment',
        foreignField:'article',
        localField:'_id',
        as:'comments'
      }
    },
    {
      $addFields:{
        commentsCount:{$size:'$comments'}
      }
    },
    {
      $match:match
    },
    {
      $project:{
        // 以下不需要展示
        content:0,
        'categories.img':0
      }
    }
  ]

  const data=await Promise.all([blogArticle.aggregate(aggregate).skip((page-1)*pageSize).limit(pageSize).exec(),blogArticle.aggregate(aggregate).count('total').exec()])
  return {
    list:data[0],
    // 添加总数
    count:data[1].length===0?0:data[1][0].total
  }
}

// 通过id查找article
export async function getArticleById(id){
  const article=await blogArticle.findById(id)
  return article
}

// 新建
export async function newArticle(params){
  const time=new Date()
  const article:Article=await new blogArticle({
    create_time:time,
    modify_time:time,
    ...params
  }).save()
  return {
    article
  }
}

// 编辑
export async function editArticle(id,params){
  params.modify_time=new Date()
  const article=await blogArticle.findByIdAndUpdate(id,params,{new:true})
  return {
    article
  }
}

// 删除
export async function deleteArticle(id){
  const result=await Promise.all([blogArticle.findByIdAndDelete(id).exec(),blogComment.deleteMany({article:id}).exec()])

  return {
    result
  }
}

// 评论
export async function getComment(params){
  const match:any={}
  const {
    username,
    content,
    email,
    create_time
  }=params

  username&&(match.username={$regex:username,$options:'gi'});
  content&&(match.content={$regex:content,$options:'gi'});
  email&&(match.email={$regex:email,$options:'gi'})
  if(Array.isArray(create_time)&&create_time.length===2&&create_time[0]&&create_time[1]){
    const s=new Date(create_time[0])
    const e=new Date(create_time[1])
    match.create_time={$gte:s,$lt:e}
  }

  const page=parseInt(params.page)
  const pageSize=parseInt(params.pageSize)
  const aggregate=[
    {
      $lookup:{
        from:'article',
        foreignField:'_id',
        localField:'article',
        as:'articles'
      }
    },
    {
      $lookup:{
        from:'category',
        foreignField:'_id',
        localField:'articles.category',
        as:'categories'
      }
    },
    {
      $match:match
    },
    {
      $project:{
        'articles.content':0,
        'categories.img':0
      }
    }
  ]

  const data=await Promise.all([
    blogComment.aggregate(aggregate).skip((page-1)*pageSize).limit(pageSize).exec(),
    blogComment.aggregate(aggregate).count('total').exec()
  ])
  return {
    comments:data[0],
    count:data[1].length===0?0:data[1][0].total
  }
}

// 删除
export async function deleteComment(ids:string[]|string){
  if(!Array.isArray(ids)){
    ids=[ids]
  }
  const result=await blogComment.deleteMany({_id:{$in:ids}})
  return {
    result
  }
}

// 访客留言
export async function getGuest(params){
  const {
    username,
    content,
    email,
    create_time
  }=params

  const query:any={}
  username&&(query.username={$regex:username,$options:'gi'});
  email&&(query.email={$regex:email,$options:'gi'});
  content&&(query.content={$regex:content,$options:'gi'});
  if(Array.isArray(create_time)&&create_time.length===2&&create_time[0]&&create_time[1]){
    const s=new Date(create_time[0])
    const e=new Date(create_time[1])
    query.create_time={$gte:s,$lt:e}
  }

  const page=parseInt(params.page||1)
  const pageSize=parseInt(params.pageSize||10)
  const options:any={}
  options.skip=(page-1)*pageSize
  options.limit=pageSize
  // 时间降序排序
  options.sort='-create_time'

  const data=await Promise.all([
    Guest.find(query,{},options).exec(),
    Guest.countDocuments(query).exec()
  ])
  return {
    guests:data[0],
    count:data[1]
  }
}

// 删除
export async function deleteGuest(ids:Array<string>|string){
  if(!Array.isArray(ids)){
    ids=[ids]
  }
  const result=await Guest.deleteMany({_id:{$in:ids}})
  return {
    result
  }
}

function executeDate(days,options){
  if(options==='start'){
    return moment().subtract(days,'days').startOf('day').toDate()
  }
  if(options==='end'){
    return moment().subtract(days,'days').endOf('day').toDate()
  }
}

// 统计访客
export async function countGuest(){
  const today=await Guest.countDocuments({
    create_time:{
      $gte:executeDate(0,'start'),
      $lt:moment().toDate()
    }
  })
  const yesterday=await Guest.countDocuments({
    create_time:{
      $gte:executeDate(1,'start'),
      $lt:executeDate(1,'end')
    }
  })
  const week=await Guest.countDocuments({
    create_time:{
      $gte:executeDate(7,'start'),
      $lt:moment().toDate()
    }
  })
  const month=await Guest.countDocuments({
    create_time:{
      $gte:executeDate(30,'start'),
      $lt:moment().toDate()
    }
  })
  const total=await Guest.estimatedDocumentCount()

  return {
    today,yesterday,week,month,total
  }
}

// 统计评论
export async function countComment(){
  const today=await blogComment.countDocuments({
    create_time:{
      $gte:executeDate(0,'start'),
      $lt:moment().toDate()
    }
  })
  const yesterday=await blogComment.countDocuments({
    create_time:{
      $gte:executeDate(1,'start'),
      $lt:executeDate(1,'end')
    }
  })
  const week=await blogComment.countDocuments({
    create_time:{
      $gte:executeDate(7,'start'),
      $lt:moment().toDate()
    }
  })
  const month=await blogComment.countDocuments({
    create_time:{
      $gte:executeDate(30,'start'),
      $lt:moment().toDate()
    }
  })
  const total=await blogComment.estimatedDocumentCount()

  return {
    today,yesterday,week,month,total
  }
}

// 统计文章
export async function countArticle(){
  const today=await blogArticle.countDocuments({
    create_time:{
      $gte:executeDate(0,'start'),
      $lt:moment().toDate()
    }
  })
  const yesterday=await blogArticle.countDocuments({
    create_time:{
      $gte:executeDate(1,'start'),
      $lt:executeDate(1,'end')
    }
  })
  const week=await blogArticle.countDocuments({
    create_time:{
      $gte:executeDate(7,'start'),
      $lt:moment().toDate()
    }
  })
  const month=await blogArticle.countDocuments({
    create_time:{
      $gte:executeDate(30,'start'),
      $lt:moment().toDate()
    }
  })
  const total=await blogArticle.estimatedDocumentCount()

  return {
    today,yesterday,week,month,total
  }
}


// 统计分类
export async function countCategory(){
  const counts=await blogCategory.aggregate([
    {
      $lookup:{
        from:'article',
        foreignField:'category',
        localField:'_id',
        as:'articles'
      }
    },
    {
      $project:{
        articles_count:{
          $size:'$articles'
        }
      }
    },
    {
      $sort:{articles_count:-1}
    }
  ])
  return counts
}
