import { connect, connection, Connection, Model } from 'mongoose';
import {Account,Category,Comment,BSetting,PSetting,Article} from '@/types/schema'
import config from '../../server.config'
import {Auth} from './models/auth'
import {blogArticle} from './models/article'
import {blogSetting} from './models/bsetting'
import {blogCategory} from './models/category'
import {blogComment} from './models/comment'
import {Guest} from './models/guest'
import {personSetting} from './models/psetting'

interface Models {
  Auth:Model<Account>,
  blogArticle:Model<Article>,
  blogSetting:Model<BSetting>,
  blogCategory:Model<Category>,
  blogComment:Model<Comment>,
  Guest:Model<Comment>,
  personSetting:Model<PSetting>
}

// 重连最大次数
let times=3

export default class DB{
  private static instance:DB;

  private _db:Connection;

  private _models:Models;

  public static get Models(){
    if(!DB.instance){
      DB.instance=new DB()
    }
    return DB.instance._models
  }

  private constructor(){

    this._models={
      Auth:new Auth().model,
      blogArticle:new blogArticle().model,
      blogSetting:new blogSetting().model,
      blogCategory:new blogCategory().model,
      blogComment:new blogComment().model,
      Guest:new Guest().model,
      personSetting:new personSetting().model
    }

    // 连接mongoDB
    this.connectDB()

    this._db=connection;
    this._db.on('open',()=>{
      console.log('MongoDB连接成功')
      times=3
    })
    this._db.on('error',()=>{
      if(times>0){
        console.error(`MongoDB连接失败,请确认连接地址${config.mongoUrl},准备尝试重连....`)
        setTimeout(() => {
          DB.instance.connectDB()
          times--
        }, 1000);
      }else{
        console.error('MongoDB连接失败，连接次数上限，请检查设置')
        process.exit(1)
      }
    })

  }

  connectDB(){
    connect(config.mongoUrl,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    },()=>{
      // 设置默认数据
      (this._models.blogSetting as any).initData();
      // 结尾加分号防止后面括号也被识别成函数
      (this._models.blogCategory as any).initData();
    })
  }
}
