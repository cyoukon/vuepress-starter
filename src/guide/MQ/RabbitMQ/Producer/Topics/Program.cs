using System;
using System.Text;
using RabbitMQ.Client;
using RH;

namespace Topics
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SendMessageTopic();
        }

        public static void SendMessageTopic()
        {
            //创建连接
            using (var connection = RabbitMQHelper.GetConnection())
            {
                //创建信道
                using (var channel = connection.CreateModel())
                {
                    //声明交换机对象,fanout类型
                    string exchangeName = "topic_exchange";
                    channel.ExchangeDeclare(exchangeName, ExchangeType.Topic);
                    //队列名
                    string queueName1 = "topic_queue1";
                    string queueName2 = "topic_queue2";
                    //路由名
                    string routingKey1 = "*.orange.*";
                    string routingKey2 = "*.*.rabbit";
                    string routingKey3 = "lazy.#";
                    channel.QueueDeclare(queueName1, true, false, false);
                    channel.QueueDeclare(queueName2, true, false, false);

                    //把创建的队列绑定交换机,routingKey指定routingKey
                    channel.QueueBind(queue: queueName1, exchange: exchangeName, routingKey: routingKey1);
                    channel.QueueBind(queue: queueName2, exchange: exchangeName, routingKey: routingKey2);
                    channel.QueueBind(queue: queueName2, exchange: exchangeName, routingKey: routingKey3);
                    //向交换机写10条消息
                    for (int i = 0; i < 10; i++)
                    {
                        string message = $"RabbitMQ Direct {i + 1} Message";
                        var body = Encoding.UTF8.GetBytes(message);
                        channel.BasicPublish(exchangeName, routingKey: "aaa.orange.rabbit", null, body);
                        channel.BasicPublish(exchangeName, routingKey: "lazy.aa.rabbit", null, body);
                        Console.WriteLine($"发送Topic消息:{message}");
                    }
                }
            }
        }
        /*
         * 这里演示了 routingKey为aaa.orange.rabbit，和lazy.aa.rabbit的情况，第一个匹配到Q1和Q2，第二个匹配到Q2，所以应该Q1是10条，Q2有20条，
         */
    }
}
