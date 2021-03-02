import {Schema,model,models,Model} from 'mongoose'
import MarkdownIt from 'markdown-it'
import MarkdownItGithubHeadings from 'markdown-it-github-headings'
import markdownItTaskLists from 'markdown-it-task-lists'
import emoji from 'markdown-it-emoji'
import hljs from 'highlight.js'
import {Article} from '@/types/schema'

export class blogArticle {
  private _model:Model<Article>;

  public get model():Model<Article>{
    return this._model
  }

  constructor(){
    const schema=new Schema<Article>({
      // 标题
      title:{
        type:String
      },
      // 内容
      content:{
        type:String
      },
      // 分类
      category:{
        type:Schema.Types.ObjectId,
        ref:'category'
      },
      // 标签
      labels:{
        type:Array
      },
      // 浏览次数
      viewCount:{
        type:Number,
        default:0
      },
      // 是否允许评论
      commentsFlag:{
        type:Number,
        default:0
      },
      // 创建时间
      create_time:{
        type:Date,
        default:new Date()
      },
      // 修改时间
      modify_time:{
        type:Date,
        default:new Date()
      }
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    })

    // 设置虚拟属性html
    schema.virtual('html').get(function(this){
      if(this.content){
        const md=new MarkdownIt({
          html: true,
          breaks: true,
          // 高亮代码块
          highlight(str,lang){
            let code=''
            // 判断是否有添加代码语言
            if(lang && hljs.getLanguage(lang)){
              try {
                code=hljs.highlight(lang,str,true).value
              } catch (error) {

              }
            }
            if(!code){
              // 如果不是代码语言原样输出
              code=md.utils.escapeHtml(str)
            }
            // s使语言显示在右上角
            return (
              '<pre class="hljs"><div class="pre-header"><div class="pre-header-left"><div></div><div></div><div></div></div><div class="pre-header-right">' +
                  lang +
                  '</div></div><code>' +
                  code +
                  '</code></pre>'
            );
          }
        }).use(MarkdownItGithubHeadings)
        .use(markdownItTaskLists)
        .use(emoji);
        return md.render(this.content)
      }
      return ''
    })

    schema.virtual('comments',{
      ref:'comment',
      // 关联表中字段
      foreignField:'article',
      // 本表字段
      localField:'_id'
    })

    if(models.article){
      this._model=models.article
    }else{
      this._model=model<Article>('article',schema,'article')
    }
  }
}
