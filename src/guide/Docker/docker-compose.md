## docker-compose文件介绍

```yaml
# docker-compose的版本
version: '3.1'
services:
  #服务名称
  mssql:
    #容器名称
    container_name: mssql
    #镜像名称
    image: mcr.microsoft.com/mssql/server:2019-latest
    #总是重启后启动
    restart: "no"
    #端口映射（映射端口:真正的service端口)
    ports:
      - 1433:1433
    #挂载
    volumes:
      - ./data:/var/lib/rabbitmq
    #环境变量
    environment:
      - ACCEPT_EULA=Y
      #SA用户密码
      - SA_PASSWORD=MSSQL!123
```







## docker-compose中定义重试策略

| <font color='red'>restart policies</font> | <font color='red'>comment</font>                             |
| ----------------------------------------- | ------------------------------------------------------------ |
| **“no”**                                  | Never attempt to restart a container even if it crashes or stops altogether |
| **always**                                | If the container stops for any reasons whatsoever, always attempt to restart it |
| **on-failure**                            | Only attempt to restart the container if it failed because of an error code |
| **unless-stopped**                        | Always restart the container unless we (the developers) stop it explicitly. |

> Note here that the “no” restart policy explicitly has opening and closing quotes. This is because in a YAML file, a plain *no* is interpreted as *false*. Hence, to avoid the confusion, if we use the **no restart policy**, we have to always specify it as “no”.