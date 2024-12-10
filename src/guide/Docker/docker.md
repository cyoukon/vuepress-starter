## Dockerfile介绍

```dockerfile
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

# 从指定源下载镜像并命名为base
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
# 设置container内部的工作目录，如果不存在这个目录，则会新建
WORKDIR /app
# 设置应用程序监听的端口
EXPOSE 80

# 设置环境变量
ENV ASPNETCORE_URLS=http://+:80

# 从指定源下载镜像并命名为build
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
# 设置工作目录
WORKDIR /src
# 把本地（宿主机）上的指定文件复制到container的指定目录
COPY ["Info.Api/Info.Api.csproj", "Info.Api/"]
# 恢复项目的依赖项和工具（如：下载需要的nuget包）
RUN dotnet restore "Info.Api/Info.Api.csproj"
# 把本地目录下的文件都复制到当前的工作目录下
COPY . .
# 重新设置工作目录
WORKDIR "/src/Info.Api"
# 编译项目，并把编译结果放到 /app/build 目录下
RUN dotnet build "Info.Api.csproj" -c Release -o /app/build

# 指定build镜像并命名为publish
FROM build AS publish
# 发布项目，输出到 /app/publish 目录下
RUN dotnet publish "Info.Api.csproj" -c Release -o /app/publish

# 指定base镜像并命名为final
FROM base AS final
# 设置工作目录
WORKDIR /app
# publish镜像中寻找 /app/publish 并将其复制到当前工作目录中
COPY --from=publish /app/publish .
# 设置应用程序的启动命令
ENTRYPOINT ["dotnet", "Info.Api.dll"]
```

## Docker命令

1. 根据当前路径下的Dockerfile编译生成名为 infoapi、tag 为 1.0 的镜像，注意后面的“.”别漏了。

   ```shell
   docker build -t infoapi:1.0 .
   ```

2. 查看本地镜像

   ```shell
   docker images
   ```

3. 运行，星号替换为上一步运行结果里的 image id

   ```shell
   docker run ***
   ```

> 下面介绍docker run 的常用参数，完整文档见[官网](https://docs.docker.com/engine/reference/commandline/run/)

- **-a stdin:** 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；

- **-d:** 后台运行容器，并返回容器ID；
- **-i:** 以交互模式运行容器，通常与 -t 同时使用；
- **-P:** 随机端口映射，容器内部端口**随机**映射到主机的端口
- **-p:** 指定端口映射，格式为：**主机(宿主)端口:容器端口**
- **-t:** 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
- **--name="nginx-lb":** 为容器指定一个名称；
- **--dns 8.8.8.8:** 指定容器使用的DNS服务器，默认和宿主一致；
- **--dns-search example.com:** 指定容器DNS搜索域名，默认和宿主一致；
- **-h "mars":** 指定容器的hostname；
- **-e username="ritchie":** 设置环境变量；
- **--env-file=[]:** 从指定文件读入环境变量；
- **--cpuset="0-2" or --cpuset="0,1,2":** 绑定容器到指定CPU运行；
- **-m :**设置容器使用内存最大值；
- **--net="bridge":** 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；
- **--link=[]:** 添加链接到另一个容器；
- **--expose=[]:** 开放一个端口或一组端口；
- **--volume , -v:** 绑定一个卷

4. 查看容器

   ```shell
   # 查看运行中的容器
   docker ps
   # 查看所有容器
   docker ps -a
   # 通过容器名模糊搜索容器
   docker ps | grep 搜索字段
   ```

5. 进入容器，星号替换为上一步看到的容器Id

   ```shell
   docker exec -it *** /bin/bash  
   # 或者
   docker exec -it *** bash
   ```

   
