using System;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RH;

namespace Topics
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Task.Run(() => DirectConsumer("topic_queue1"));
            Task.Run(() => DirectConsumer("topic_queue2"));
            Console.ReadLine();
        }

        public static void DirectConsumer(string queueName)
        {
            var connection = RabbitMQHelper.GetConnection();
            {
                //创建信道
                var channel = connection.CreateModel();
                {
                    var consumer = new EventingBasicConsumer(channel);
                    ///prefetchCount:1来告知RabbitMQ,不要同时给一个消费者推送多于 N 个消息，也确保了消费速度和性能
                    ///global：是否设为全局的
                    ///prefetchSize:单条消息大小，通常设0，表示不做限制
                    //是autoAck=false才会有效
                    channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: true);
                    int i = 1;
                    consumer.Received += (model, ea) =>
                    {
                        //处理业务
                        var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                        Console.WriteLine($"{i},队列{queueName}消费消息:{message}");
                        channel.BasicAck(ea.DeliveryTag, false); //消息ack确认，告诉mq这条队列处理完，可以从mq删除了
                        i++;
                    };
                    channel.BasicConsume(queueName, autoAck: false, consumer);
                }
            }
        }
    }
}
