using System;
using System.Text;
using RabbitMQ.Client;
using RH;

namespace Route
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SendMessageDirect();
        }

        /// <summary>
        /// 路由模式，点到点直连队列
        /// </summary>
        public static void SendMessageDirect()
        {
            //创建连接
            using (var connection = RabbitMQHelper.GetConnection())
            {
                //创建信道
                using (var channel = connection.CreateModel())
                {
                    //声明交换机对象,Direct类型
                    string exchangeName = "direct_exchange";
                    channel.ExchangeDeclare(exchangeName, ExchangeType.Direct);
                    //创建队列
                    string queueName1 = "direct_errorlog";
                    string queueName2 = "direct_alllog";
                    channel.QueueDeclare(queueName1, true, false, false);
                    channel.QueueDeclare(queueName2, true, false, false);

                    //把创建的队列绑定交换机,direct_errorlog队列只绑定routingKey:error
                    channel.QueueBind(queue: queueName1, exchange: exchangeName, routingKey: "error");
                    //direct_alllog队列绑定routingKey:error,info
                    channel.QueueBind(queue: queueName2, exchange: exchangeName, routingKey: "info");
                    channel.QueueBind(queue: queueName2, exchange: exchangeName, routingKey: "error");
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true; //消息持久化
                    //向交换机写10条错误日志和10条Info日志
                    for (int i = 0; i < 10; i++)
                    {
                        string message = $"RabbitMQ Direct {i + 1} error Message";
                        var body = Encoding.UTF8.GetBytes(message);
                        channel.BasicPublish(exchangeName, routingKey: "error", properties, body);
                        Console.WriteLine($"发送Direct消息error:{message}");

                        string message2 = $"RabbitMQ Direct {i + 1} info Message";
                        var body2 = Encoding.UTF8.GetBytes(message);
                        channel.BasicPublish(exchangeName, routingKey: "info", properties, body2);
                        Console.WriteLine($"info:{message2}");

                    }
                }
            }
        }
    }
}
