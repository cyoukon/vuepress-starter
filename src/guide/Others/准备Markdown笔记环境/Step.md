1. 官网下载Typora，并按照教程，激活为学习版，实测1.0.3版可以成功激活。

2. 准备图床

   - 考虑到网络以及便利性等因素，使用`gitee `图床，Typora原生不支持`gitee `图床，需要安装插件

   - 在下面地址生成一个`gitee `私人令牌，只需要开启`project`权限即可

     `https://gitee.com/profile/personal_access_tokens/new`

   - 安装NodeJS后，执行下面命令
   
     ```bash
     # 安装PicGo-Core
     npm install picgo -g
     # 安装 gitee 插件
     picgo install gitee
     # 安装图片命名格式化插件（非必要）
     picgo install super-prefix
     ```
   
   - 修改`picgo`配置文件
   
     路径：`C:\Users\用户名\.picgo\config.json`
   
     配置文件如下，将下面中文部分修改为自己实际内容即可
   
     ```json
     {
       "picBed": {
         "uploader": "gitee",
         "current": "gitee",
         "gitee": {
           "owner": "gitee用户名",
           "repo": "用户放置图片的仓库",
           "token": "私人令牌",
           "path": "仓库下的路径，如果直接放根目录则留空",
           "message": "提交信息"
         }
       },
       "picgoPlugins": {
         "picgo-plugin-gitee": true,
         "picgo-plugin-super-prefix": true
       },
       "picgo-plugin-super-prefix": {
         "fileFormat": "YYYYMMDDHHmmss"
       }
     }
     ```
   
   - 修改Typora设置
   
     ![image-20211224151311862](https://gitee.com/cyoukon/Resources/raw/master/images/20211224151327.png)

   - 上传命令为`picgo upload`，配置完后点击验证，如果验证失败，可能是因为主题中没有中文字体的原因，下载合适的主题更换即可
   
     ![image-20211224151806814](https://gitee.com/cyoukon/Resources/raw/master/images/20211224151814.png)