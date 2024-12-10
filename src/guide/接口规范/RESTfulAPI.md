# 简介

## 1. 为什么要使用RESTful架构？

- REST 是 Representational State Transfer的缩写，如果一个架构符合REST原则，就称它为RESTful架构

- RESTful 架构可以充分的利用 HTTP 协议的各种功能，是 HTTP 协议的最佳实践

- RESTful API 是一种软件架构风格、设计风格，可以让软件更加清晰，更简洁，更有层次，可维护性更好

## 2. API 请求设计

| HTTP动词  | 宾语 URL | 说明 |
| ---- | ----- | -------------- |
| GET  | /zoos | 列出所有动物园 |
|POST|/zoos|新建一个动物园|
|GET|/zoos/:id|获取某个指定动物园的信息|
|PUT|/zoos/:id|更新某个指定动物园的全部信息|
|PATCH|/zoos/:id|更新某个指定动物园的部分信息|
|DELETE|/zoos/:id|删除某个动物园|
|GET|/zoos/:id/animals|列出某个指定动物园的所有动物|
|DELETE|/zoos/:id/animals/:id|删除某个指定动物园的指定动物|

> 请求 = 动词 + 宾语
>
> - 动词 使用五种 HTTP 方法，对应 CRUD 操作。
>
> - 宾语 URL 应该全部使用名词复数，可以有例外，比如搜索可以使用更加直观的 search 。
>
> - 过滤信息（Filtering） 如果记录数量很多，API应该提供参数，过滤返回结果。 ?limit=10 指定返回记录的数量 ?offset=10 指定返回记录的开始位置。

## 3. API 响应设计

> 使用 HTTP 的状态码
>
> - 客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。
> - 五大类状态码，总共100多种，覆盖了绝大部分可能遇到的情况。每一种状态码都有约定的解释，客户端只需查看状态码，就可以判断出发生了什么情况。API 不需要1xx状态码。

>1xx 相关信息
>
>2xx 操作成功
>
>3xx 重定向
>
>4xx 客户端错误
>
>5xx 服务器错误

## 4. 服务器回应数据

```json
    POST /articles
    Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJI......
    content-type: application/json
     
    {
        "title":"舟夜书所见"
        "content":"月黑见渔灯,孤光一点萤。微微风簇浪,散作满河星。"
    }
    201 Created
    {
        "id":"123e4567-e89b-12d3-a456-426655440000"
        "title":"舟夜书所见"
        "content":"月黑见渔灯,孤光一点萤。微微风簇浪,散作满河星。"
        "create_time":""
    }
```

- 客户端请求时，要明确告诉服务器，接受 JSON 格式，请求的 HTTP 头的 ACCEPT 属性要设成 application/json

- 服务端返回的数据，不应该是纯文本，而应该是一个 JSON 对象。服务器回应的 HTTP 头的 Content-Type 属性要设为 application/json

- 错误处理 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将 error 作为键名，出错信息作为键值即可。 {error: "Invalid API key"}

- 认证 RESTful API 应该是无状态，每个请求应该带有一些认证凭证。推荐使用 JWT 认证，并且使用 SSL

- Hypermedia 即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么

# API 请求

## 1. HTTP 动词

```
GET：   读取（Read）
POST：  新建（Create）
PUT：   更新（Update）
PATCH： 更新（Update），通常是部分更新
DELETE：删除（Delete）
```

## 2. URL（宾语）必须是名词

宾语就是 API 的 URL，是 HTTP 动词作用的对象。它应该是名词，不能是动词。比如，/articles这个 URL 就是正确的，而下面的 URL 不是名词，所以都是错误的。

```
/getAllCars
/createNewCar
/deleteAllRedCars
```

既然 URL 是名词，为了统一起见，建议都使用复数。

## 3. 举个例子

```
GET    /zoos：列出所有动物园
POST   /zoos：新建一个动物园
GET    /zoos/ID：获取某个指定动物园的信息
PUT    /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH  /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：删除某个动物园
GET    /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```

## 4. 过滤信息（Filtering）

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

下面是一些常见的参数。

```
?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
```

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

## 5. 不符合 CRUD 情况的 RESTful API

在实际资源操作中，总会有一些不符合 CRUD（Create-Read-Update-Delete） 的情况，一般有几种处理方法。

1. 使用 POST，为需要的动作增加一个 endpoint，使用 POST 来执行动作，比如: POST /resend 重新发送邮件。

2. 增加控制参数，添加动作相关的参数，通过修改参数来控制动作。比如一个博客网站，会有把写好的文章“发布”的功能，可以用上面的 POST /articles/{:id}/publish 方法，也可以在文章中增加 published:boolean 字段，发布的时候就是更新该字段 PUT /articles/{:id}?published=true

3. 把动作转换成资源，把动作转换成可以执行 CRUD 操作的资源， github 就是用了这种方法。
>比如“喜欢”一个 gist，就增加一个 /gists/:id/star 子资源，然后对其进行操作：“喜欢”使用PUT /gists/:id/star，“取消喜欢”使用 DELETE /gists/:id/star。
>另外一个例子是 Fork，这也是一个动作，但是在 gist 下面增加 forks资源，就能把动作变成 CRUD 兼容的：POST /gists/:id/forks 可以执行用户 fork 的动作。

## 6. 动词覆盖，应对服务器不支持 HTTP 的情况

有些客户端只能使用GET和POST这两种方法。服务器必须接受POST模拟其他三个方法（PUT、PATCH、DELETE）。

这时，客户端发出的 HTTP 请求，要加上X-HTTP-Method-Override属性，告诉服务器应该使用哪一个动词，覆盖POST方法。

# API 响应

## 1. 概述

客户端的每一次请求，服务器都必须给出回应。回应包括 HTTP 状态码和数据两部分。

HTTP 状态码就是一个三位数，分成五个类别。

```
1xx：相关信息
2xx：操作成功
3xx：重定向
4xx：客户端错误
5xx：服务器错误
```

这五大类总共包含100多种状态码，覆盖了绝大部分可能遇到的情况。每一种状态码都有标准的（或者约定的）解释，客户端只需查看状态码，就可以判断出发生了什么情况，所以服务器应该返回尽可能精确的状态码。

## 2. 状态码

**1xx 状态码**

API 不需要1xx状态码，下面介绍其他四类状态码的精确含义。

**2xx 状态码**

200状态码表示操作成功，但是不同的方法可以返回更精确的状态码。

```
GET:    200 OK
POST:   201 Created
PUT:    200 OK
PATCH:  200 OK
DELETE: 204 No Content
```

上面代码中，POST返回201状态码，表示生成了新的资源；DELETE返回204状态码，表示资源已经不存在。

**3xx 状态码**

API 用不到301状态码（永久重定向）和302状态码（暂时重定向，307也是这个含义），因为它们可以由应用级别返回，浏览器会直接跳转，API 级别可以不考虑这两种情况。

API 主要是用303 See Other，表示参考另一个 URL。它与302和307的含义一样，也是"暂时重定向"，区别在于302和307用于GET请求，而303用于POST、PUT和DELETE请求。收到303以后，浏览器不会自动跳转，而会让用户自己决定下一步怎么办。下面是一个例子。

```
HTTP/1.1 303 See Other
Location: /api/orders/12345
```

**4xx 状态码**

4xx 状态码表示客户端错误，主要有下面几种：

```
400 Bad Request：服务器不理解客户端的请求，未做任何处理。
401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。
403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。
404 Not Found：所请求的资源不存在，或不可用。
405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。
410 Gone：所请求的资源已从这个地址转移，不再可用。
415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。
422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。
429 Too Many Requests：客户端的请求次数超过限额。
```

**5xx 状态码**

5xx状态码表示服务端错误。一般来说，API 不会向用户透露服务器的详细信息，所以只要两个状态码就够了。

```
500 Internal Server Error：客户端请求有效，服务器处理时发生了意外。
503 Service Unavailable：服务器无法处理请求，一般用于网站维护状态。
```

## 3. 返回数据

**3.1 不要返回纯本文**

API 返回的数据格式，不应该是纯文本，而应该是一个 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的Content-Type属性要设为application/json。

客户端请求时，也要明确告诉服务器，可以接受 JSON 格式，即请求的 HTTP 头的ACCEPT属性也要设成application/json。

**3.2 不要包装数据**

response 的 body直接就是数据，不要做多余的包装。错误实例：

```json
{"success":true, "data":{"id":1, "name":"周伯通"} }
```

针对不同操作，服务器向用户返回的结果应该符合以下规范。

```
GET    /collection：返回资源对象的列表（数组）
GET    /collection/resource：返回单个资源对象
POST   /collection：返回新生成的资源对象
PUT    /collection/resource：返回完整的资源对象
PATCH  /collection/resource：返回完整的资源对象
DELETE /collection/resource：返回一个空文档
```

**3.3 发生错误时，不要返回 200 状态码**

有一种不恰当的做法是，即使发生错误，也返回200状态码，把错误信息放在数据体里面，就像下面这样。

```json
{"status": "failure", "data": { "error": "Expected at least two items in list."} }
```

正确的做法是，状态码反映发生的错误，具体的错误信息放在数据体里面返回。下面是一个例子。

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
  "error": "Invalid payoad.",
  "detail": {
    "surname": "This field is required."
  }
}
```

# JWT 认证

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案，本文介绍它的原理和用法。
## 1. 跨域认证的问题

互联网服务离不开用户认证。一般流程是下面这样。

1. 用户向服务器发送用户名和密码。

2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。

3. 服务器向用户返回一个 session_id，写入用户的 Cookie。

4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。

5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

这种模式的问题在于，扩展性（scaling）不好。单机当然没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求 session 数据共享，每台服务器都能够读取 session。

举例来说，A 网站和 B 网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，请问怎么实现？

一种解决方案是 session 数据持久化，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。

另一种方案是服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

## 2. JWT 的原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样。

```json
{
 "姓名": "张三",
 "角色": "管理员",
 "到期时间": "2018年7月1日0点0分"
}
```

以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名（详见后文）。

服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

## 3. JWT 的数据结构

实际的 JWT 大概就像下面这样。

![img](RESTfulAPI.assets/f6c6c1ccab28c589d07a9bb60a079ee8.jpg)

它是一个很长的字符串，中间用点（.）分隔成三个部分。注意，JWT 内部是没有换行的，这里只是为了便于展示，将它写成了几行。

JWT 的三个部分依次如下。

```
Header（头部）
Payload（负载）
Signature（签名）
```

写成一行，就是下面的样子。

Header.Payload.Signature

![img](RESTfulAPI.assets/6db843bf335555168fd69f5d58592356.jpg)



下面依次介绍这三个部分。

**3.1 Header**

Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，alg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT。

最后，将上面的 JSON 对象使用 Base64URL 算法（详见后文）转成字符串。

**3.2 Payload**

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

```
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```

除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

**3.3 Signature**

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。

**3.4 Base64URL**

前面提到，Header 和 Payload 串型化的算法是 Base64URL。这个算法跟 Base64 算法基本类似，但有一些小的不同。

JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

## 4. JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面。

Authorization: Bearer

另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

## 5. JWT 的几个特点

（1）JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

（2）JWT 不加密的情况下，不能将秘密数据写入 JWT。

（3）JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

（4）JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

（5）JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

（6）为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

## 6. 实现

该页面列举了各种语言的 JWT 实现，https://jwt.io/libraries