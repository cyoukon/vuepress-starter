**[Redis中文教程](https://redis.com.cn/tutorial.html)**

# 简介

Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如 [字符串（strings）](http://www.redis.cn/topics/data-types-intro.html#strings)， [散列（hashes）](http://www.redis.cn/topics/data-types-intro.html#hashes)， [列表（lists）](http://www.redis.cn/topics/data-types-intro.html#lists)， [集合（sets）](http://www.redis.cn/topics/data-types-intro.html#sets)， [有序集合（sorted sets）](http://www.redis.cn/topics/data-types-intro.html#sorted-sets) 与范围查询， [bitmaps](http://www.redis.cn/topics/data-types-intro.html#bitmaps)， [hyperloglogs](http://www.redis.cn/topics/data-types-intro.html#hyperloglogs) 和 [地理空间（geospatial）](http://www.redis.cn/commands/geoadd.html) 索引半径查询。 Redis 内置了 [复制（replication）](http://www.redis.cn/topics/replication.html)，[LUA脚本（Lua scripting）](http://www.redis.cn/commands/eval.html)， [LRU驱动事件（LRU eviction）](http://www.redis.cn/topics/lru-cache.html)，[事务（transactions）](http://www.redis.cn/topics/transactions.html) 和不同级别的 [磁盘持久化（persistence）](http://www.redis.cn/topics/persistence.html)， 并通过 [Redis哨兵（Sentinel）](http://www.redis.cn/topics/sentinel.html)和自动 [分区（Cluster）](http://www.redis.cn/topics/cluster-tutorial.html)提供高可用性（high availability）。

# Redis 数据类型介绍

| 类型                   | 简介                                                         | 特性                                                         | 场景                                                         |
| :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 字符串（string）       | 二进制安全                                                   | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M | ---                                                          |
| 哈希（hash）           | 键值对集合,即编程语言中的Map类型                             | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值 | 存储、读取、修改用户属性                                     |
| 列表（list）           | 链表(双向链表)                                               | 增删快,提供了操作某一段元素的API                             | 1,最新消息排行等功能(比如朋友圈的时间线) 2,消息队列          |
| 集合（set）            | 哈希表实现,元素不重复                                        | 1、添加、删除,查找的复杂度都是O(1) 2、为集合提供了求交集、并集、差集等操作 | 1、共同好友 2、利用唯一性,统计访问网站的所有独立ip 3、好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| 有序集合（sorted set） | 将Set中的元素增加一个权重参数score,元素按score有序排列       | 数据插入集合时,已经进行天然排序                              | 1、排行榜 2、带权重的消息队列                                |
| 位图 ( Bitmaps )       | 是一串连续的二进制数组（0和1），可以通过偏移量（offset）定位元素 | 存储上限为`2^32 `，即512M                                    | 用户签到记录，如用`11010101`表示用户10天内的签到情况         |
| streams                | 5.0 推出的数据类型                                           | 支持多播的可持久化的消息队列，用于实现发布订阅功能           | 轻量级消息队列，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。 |