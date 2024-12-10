# 创建一个本地kubernetes集群步骤 - Windows
https://github.com/JimmyCoding92/JimmyCodingExamples/tree/main/Container

[Kubernetes架构：Pod, Node, Deployment, ReplicaSet](https://www.bilibili.com/video/BV1eU4y1j7Uj)

## 1. 激活hyper-v

https://docs.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v

## 2. 安装docker desktop

https://docs.docker.com/desktop/windows/install/

## 3. 选择一下三者其一的工具来创建kubernetes集群

- docker desktop: https://docs.docker.com/desktop/kubernetes/
- minikube: https://minikube.sigs.k8s.io/docs/start/
- kind: https://kind.sigs.k8s.io/docs/user/quick-start/

## 4. 安装kubectl工具

- https://kubernetes.io/zh/docs/tasks/tools/

## 5. 开始你的kubernetes集群操作

常见指令：

- kubectl get nodes
- kubectl get pods -A

## 6. 部署配置文件介绍

Deployment

```yaml
# 版本定义
apiVersion: apps/v1
# 部署类型
kind: Deployment
# 元数据
metadata:
  # 名字
  name: nginx-deployment
  # 这里可以定义任何键值对，是资源的标签
  labels:
    app: nginx
# 配置、规格
spec:
  # 这个Deployment在集群中的份数
  replicas: 3
  # 选择器
  selector:
    # 这一块整体意思是 有app: nginx标签的的，保证在集群中有3份
    matchLabels:
      app: nginx
  # 下面是真正定义pod内部的地方，内容类似docker-compose.yml
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Service

```yaml
# 版本定义
apiVersion: v1
# 部署类型
kind: Service
# 元数据
metadata:
  # 名字
  name: sql-server
# 配置、规格
spec:
  # 选择器，所有带app: sql标签的pod都会运行在这个service之下
  selector:
    app: sql
  ports:
    - protocol: TCP
      # Service本身的端口
      port: 1433
      # 目标端口，即service所管理的pod的端口
      targetPort: 1433
```

ConfigMap

- 存储配置信息
- 通过下面这个文件可以找到上面定义的Service

```yaml
apiVersion: v1
kind: ConfigMap
metdata:
  name: myapp-configmap
data:
db_server: "sql-server"
db_port: "1433"
database: "userDb"
```

Secret

- 存储机密信息，这个文件<font color='red'>**需要base64编码**</font>

```yaml
apiVersion: v1
kind: Secret
metdata:
  name: sql-secret
type: Opaque
data:
  sql-username: root
  sql-password: 313131
```

## 7. 实验性部署

[myapp-configmap.yaml](https://github.com/JimmyCoding92/JimmyCodingExamples/blob/main/Container/KubernetesApplication/myapp-configmap.yaml)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-configmap
data:
  db_server: "sql-service"
  db_port: "1433"
  database: "userDb"
```

[myapp.yaml](https://github.com/JimmyCoding92/JimmyCodingExamples/blob/main/Container/KubernetesApplication/myapp.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: jimmycoding92/jimmy-coding-example-app:v1
        ports:
        - containerPort: 80
        env:
        - name: DbServer
          valueFrom:
            configMapKeyRef:
              name: myapp-configmap
              key: db_server
        - name: DbPort
          valueFrom: 
            configMapKeyRef:
              name: myapp-configmap
              key: db_port
        - name: DbUser
          valueFrom: 
            secretKeyRef:
              name: sql-secret
              key: sql-username
        - name: Password
          valueFrom: 
            secretKeyRef:
              name: sql-secret
              key: sql-password
        - name: Database
          valueFrom: 
            configMapKeyRef:
              name: myapp-configmap
              key: database
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  type: LoadBalancer  
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30000
```

[sql-configmap.yaml](https://github.com/JimmyCoding92/JimmyCodingExamples/blob/main/Container/KubernetesApplication/sql-configmap.yaml)

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: sql-configmap
data:
  accept_eula: "Y"
  mssql_pid: "Express"
```

[sql-secret.yaml](https://github.com/JimmyCoding92/JimmyCodingExamples/blob/main/Container/KubernetesApplication/sql-secret.yaml)

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: sql-secret
type: Opaque
data:
    sql-username: U0E=
    sql-password: MUhhcHB5UEBzc3dvcmQ=
```

[sql.yaml](https://github.com/JimmyCoding92/JimmyCodingExamples/blob/main/Container/KubernetesApplication/sql.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sql-deployment
  labels:
    app: sql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sql
  template:
    metadata:
      labels:
        app: sql
    spec:
      containers:
      - name: sql
        image: mcr.microsoft.com/mssql/server:2017-latest-ubuntu
        ports:
        - containerPort: 1433
        env:
        - name: ACCEPT_EULA
          valueFrom:
            configMapKeyRef:
              name: sql-configmap
              key: accept_eula
        - name: SA_PASSWORD
          valueFrom: 
            secretKeyRef:
              name: sql-secret
              key: sql-password
        - name: MSSQL_PID
          valueFrom: 
            configMapKeyRef:
              name: sql-configmap
              key: mssql_pid
---
apiVersion: v1
kind: Service
metadata:
  name: sql-service
spec:
  selector:
    app: sql
  ports:
    - protocol: TCP
      port: 1433
      targetPort: 1433
```

