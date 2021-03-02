import {Document} from 'mongoose'

//  身份信息
export interface Account extends Document {
  _id:string;
  // 用户名
  name:string;
  // 密码
  pwd:string;
  // 创建时间
  create_time:Date;
  // 修改时间
  modify_time:Date;
}

// 博客基本设置
export interface BSetting extends Document {
  _id:string;
  // 博客名称
  blogName:string;
  // 简介
  blogIntro:string;
  // 博客logo
  blogLogo:string;
  // 备案信息
  recordInfo?:string;
  // 首页的每页展示文章条数
  articlePageSize:number;
  // 是否允许文章评论
  enableComments:boolean;
  // 评论及留言每页条数
  commentPageSize:number;
  // 是否开启百度统计功能
  enableStatistics?:boolean;
  // 百度统计key
  statisticsKey?:string;
}

// 个人信息设置
export interface PSetting extends Document {
  _id:string;
  // 昵称
  name:string;
  // 头像
  avatar:string;
  // 自我介绍
  introduction:string;
  // github地址
  github:string;
  // 邮箱
  email:string;
  // 微信
  wx:string;
  // 创建时间
  create_time:Date;
  // 修改时间
  modify_time:Date;
}


// 分类信息
export interface Category extends Document {
  _id:string;
  // 分类名称
  cname:string;
  // 分类图片
  img:string;
  // 排序值
  sequence:number;
  // 创建时间
  create_time:Date;
  // 修改时间
  modify_time:Date;
}

// 文章信息
export interface Article extends Document {
  _id:string;
  // 标题
  title:string;
  // 内容
  content:string;
  // 编译为html后的内容
  html:string;
  // 分类
  category:Category;
  // 标签
  labels:Array<string>;
  // 浏览次数
  viewCount:number;
  // 是否允许评论
  commentsFlag:number;
  // 创建时间
  create_time:Date;
  // 修改时间
  modify_time:Date;
}

// 评论信息
export interface Comment extends Document {
  _id:string;
  // 评论文章
  article:Article;
  // 评论人昵称
  username:string;
  // 评论人邮箱
  email?:string;
  // 评论内容
  content:string;
  // 创建时间
  create_time:Date;
}
