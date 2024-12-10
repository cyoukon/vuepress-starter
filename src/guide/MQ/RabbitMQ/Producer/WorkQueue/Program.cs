using System;
using System.Text;
using RH;

namespace WorkQueue
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SendMessage();
        }

        /// <summary>
        /// 工作队列模式
        /// </summary>
        public static void SendMessage()
        {
            string queueName = "worker_order";//队列名
            //创建连接
            using (var connection = RabbitMQHelper.GetConnection())
            {
                //创建信道
                using (var channel = connection.CreateModel())
                {
                    //创建队列
                    channel.QueueDeclare(queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true; //消息持久化
                    for (var i = 0; i < 10; i++)
                    {
                        string message = $"Hello RabbitMQ MessageHello,{i + 1}";
                        var body = Encoding.UTF8.GetBytes(message);
                        //发送消息到rabbitmq
                        channel.BasicPublish(exchange: "", routingKey: queueName, mandatory: false, basicProperties: properties, body);
                        Console.WriteLine($"发送消息到队列:{queueName},内容:{message}");
                    }
                }
            }
        }
        /*
         * 参数durable：true，需要持久化，实际项目中肯定需要持久化的，不然重启RabbitMQ数据就会丢失了。
         */
    }
}
