using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RH;

namespace SimpleConsumer
{
    internal class Program
    {
        public static void Main()
        {
            SimpleConsumer();
        }

        public static void SimpleConsumer()
        {
            string queueName = "simple_order";
            var connection = RabbitMQHelper.GetConnection();
            //创建信道
            var channel = connection.CreateModel();
            //创建队列
            channel.QueueDeclare(queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            var consumer = new EventingBasicConsumer(channel);
            int i = 1;
            consumer.Received += (model, ea) =>
            {
                //消费者业务处理
                var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                Console.WriteLine($"{i},队列{queueName}消费消息:{message}");
                i++;
            };
            channel.BasicConsume(queueName, true, consumer);

            Console.ReadLine();
        }
        /*
         消费者只需要知道队列名就可以消费了，不需要Exchange和routingKey。

         注：消费者这里有一个创建队列，它本身不需要，是预防消费端程序先执行，没有队列会报错。
        */
    }
}
