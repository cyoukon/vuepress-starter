## 四种隔离级别

1. READ UNCOMMITED(未提交读)read uncommited

>　　　　在RERAD UNCOMMITED级别，事务中的修改，即使没有提交，对其他事务也都是可见的。事务可以读取未提交的数据，这也成为脏读（Dirty Read）。这个级别会导致很多问题，从性能上说READ UNCOMMITED 不会比其他的级别好太多，但缺乏其他级别的好多好处，除非有非常必要的理由，在实际的应用中一般很少使用READ UNCOMMITED.
>　　　　解释脏读：A用户修改了数据（存100块，账户为100）,随后B用户又读出该数据（100）,但A用户因为某些原因取消了对数据的修改（账户为0）,数据恢复原值,此时B得到的数据为100就与数据库内的账户为0数据不一样

2. READ COMMITED (提交读)read commited

>　 　　 　大多数数据库系统的默认隔离级别都是READ COMMITED （但是MYSQL不是）。READ COMMITED 满足前面提到的隔离性的简单定义：一个事务开始时，只能看到已经提交的事务所做的修改。换句话说，一个事务从开始到提交之前，所做的任何修改对其他事务都是不可见的。这个级别有时候也叫做不可重复的（nonerepeatable read），因为两次执行同样的查询，可能会得到不一样的结果。
>　 　　 　解释不可重复读：A用户读取了数据100,随后B用户读出该数据并修改（加了100）,此时A用户再读取数据时发现前后两次的值不一致

3. REPEATABLE READ (可重复读)repeatable read

>　 　　 　REPEATABLE READ (可重复读) 解决了脏读问题。该级别保证了在同一个事务中多次读取同样的记录的结果是一致的。但是，理论上，可重复读隔离级别还是无法解决另一个幻读 （PhantomRead）的问题。所谓幻读，指的是当某个事务（用户a读数据）在读取某个范围内的记录时，另外一个事务又在该范围内插入了新的记录（数据库在此范围内插入了一条数据），当之前的事务再次读 取该范围的记录时，会产生幻行（Phantom Row）。InnoDB和XtraDB 存储引擎通过多版并发控制（MVCC ,Multivesion Concurrency Control ）解决了幻读问题。
>　 　　　可重复读是Mysql 默认的事务隔离级别。

4. SERIALIZABLE(可串行化)serializable

>　 　SERIALIZABLE是最高的隔离级别。它通过强制事务串行，避免了前面说的幻读问题。简单的来说，SERIALIZABLE会在读的每一行数据上 都加上锁，所以可能导致大量的超时和锁征用问题。实际应用中也很少用到这个隔离级别，只有在非常需要确保数据的一致性而且可以接受没有并发的情况，才可考 虑用该级别。

| 隔离级别        | 脏读可能性 | 不可重复读可能性 | 幻读可能性 | 加锁读 |
| --------------- | ---------- | ---------------- | ---------- | ------ |
| READ UNCOMMITED | <font color='green'>YES</font>       | <font color='green'>YES</font>              | <font color='green'>YES</font>        | <font color='blue'>NO</font>     |
| READ COMMITED   | <font color='blue'>NO</font>         | <font color='green'>YES</font>              | <font color='green'>YES</font>        | <font color='blue'>NO</font>     |
| REPEATABLE READ | <font color='blue'>NO</font>         | <font color='blue'>NO</font>               | <font color='green'>YES</font>        | <font color='blue'>NO</font>     |
| SERIALIZABLE    | <font color='blue'>NO</font>         | <font color='blue'>NO</font>               | <font color='blue'>NO</font>         | <font color='green'>YES</font>    |



## 处理并发冲突

https://docs.microsoft.com/zh-cn/aspnet/core/data/ef-mvc/concurrency?view=aspnetcore-5.0

## 判断数据是否存在

> 限制只查一条数据，同时不选择列，提升效率

MySQL

```mysql
SELECT 1 FROM test_table WHERE id = 1 LIMIT 1
```

MSSQL

```mssql
SELECT TOP 1 1 FROM test_table WHERE id = 1
```

