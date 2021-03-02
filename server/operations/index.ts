import DB from '../db/db'
const {blogSetting} =DB.Models

export async function getSettings(){
  const settings=await blogSetting.findOne()
  return {
    settings
  }
}
