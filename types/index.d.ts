export interface MyBlogConfig {
  host:string;
  port:number;
  // mongo链接
  mongoUrl:string;
  // jwt密钥
  jwtSecret:string;
}

export interface Resp{
  // 响应code
  code:0|-1|-2;
  // 响应data
  data?:any;
  // 响应message
  message?:string;
}
