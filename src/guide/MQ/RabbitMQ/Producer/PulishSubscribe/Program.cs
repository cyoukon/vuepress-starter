using System;
using System.Text;
using RabbitMQ.Client;
using RH;

namespace PulishSubscribe
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SendMessageFanout();
        }

        /// <summary>
        /// 发布订阅， 扇形队列
        /// </summary>
        public static void SendMessageFanout()
        {
            //创建连接
            using (var connection = RabbitMQHelper.GetConnection())
            {
                //创建信道
                using (var channel = connection.CreateModel())
                {
                    string exchangeName = "fanout_exchange";
                    //创建交换机,fanout类型
                    channel.ExchangeDeclare(exchangeName, ExchangeType.Fanout);
                    string queueName1 = "fanout_queue1";
                    string queueName2 = "fanout_queue2";
                    string queueName3 = "fanout_queue3";
                    //创建队列
                    channel.QueueDeclare(queueName1, false, false, false);
                    channel.QueueDeclare(queueName2, false, false, false);
                    channel.QueueDeclare(queueName3, false, false, false);

                    //把创建的队列绑定交换机,routingKey不用给值，给了也没意义的
                    channel.QueueBind(queue: queueName1, exchange: exchangeName, routingKey: "");
                    channel.QueueBind(queue: queueName2, exchange: exchangeName, routingKey: "");
                    channel.QueueBind(queue: queueName3, exchange: exchangeName, routingKey: "");
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true; //消息持久化
                    //向交换机写10条消息
                    for (int i = 0; i < 10; i++)
                    {
                        string message = $"RabbitMQ Fanout {i + 1} Message";
                        var body = Encoding.UTF8.GetBytes(message);
                        channel.BasicPublish(exchangeName, routingKey: "", null, body);
                        Console.WriteLine($"发送Fanout消息:{message}");
                    }
                }
            }
        }
    }
}
