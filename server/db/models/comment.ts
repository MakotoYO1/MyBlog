import { Schema, model, models, Model } from 'mongoose';
import {Comment} from '@/types/schema'

import {schema} from './guest'

export class blogComment{
  private _model:Model<Comment>

  constructor(){
    if(models.comment){
      this._model=models.comment
    }else{
      schema.add({
        article:{
          type:Schema.Types.ObjectId,
          ref:'article'
        }
      })
      this._model=model<Comment>('comment',schema,'comment')
    }
  }

  public get model():Model<Comment>{
    return this._model
  }
}
