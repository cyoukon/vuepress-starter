using System;
using System.Text;
using RH;

namespace SimpleQueue
{
    internal class Program
    {
        public static void Main()
        {
            SimpleSendMsg();
        }

        public static void SimpleSendMsg()
        {
            // 队列名
            string queueName = "simple_order";
            // 创建连接
            using var connection = RabbitMQHelper.GetConnection();
            // 创建信道
            using var channel = connection.CreateModel();
            // 创建队列
            channel.QueueDeclare(queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            for (var i = 0; i < 10; i++)
            {
                string message = $"Hello RabbitMQ MessageHello,{i + 1}";
                // 发送消息
                var body = Encoding.UTF8.GetBytes(message);
                channel.BasicPublish(exchange: "", routingKey: queueName, mandatory: false, basicProperties: null, body);
                Console.WriteLine($"发送消息到队列:{queueName},内容:{message}");
            }
        }
        /*
         创建队列参数解析：

         durable：是否持久化。
         
         exclusive：排他队列，只有创建它的连接(connection)能连，创建它的连接关闭，会自动删除队列。
         
         autoDelete：被消费后，消费者数量都断开时自动删除队列。
         
         arguments：创建队列的参数。
         
         发送消息参数解析：
         
         exchange：交换机，为什么能传空呢，因为RabbitMQ内置有一个默认的交换机，如果传空时，就会用默认交换机。
         
         routingKey：路由名称，这里用队列名称做路由key。
         
         mandatory：true告诉服务器至少将消息route到一个队列种，否则就将消息return给发送者；false：没有找到路由则消息丢弃。
        */
    }
}
