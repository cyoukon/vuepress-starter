using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RH;

namespace WorkQueue
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Task.Run(ReceiveMessage);
            Task.Run(ReceiveMessage);
            Console.ReadLine();
        }

        public static void ReceiveMessage()
        {
            string queueName = "worker_order";
            var connection = RabbitMQHelper.GetConnection();
            {
                //创建信道
                var channel = connection.CreateModel();
                {
                    var consumer = new EventingBasicConsumer(channel);
                    //prefetchCount:1来告知RabbitMQ,不要同时给一个消费者推送多于 N 个消息，也确保了消费速度和性能
                    channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);
                    int i = 1;
                    var guid = Guid.NewGuid();
                    consumer.Received += (model, ea) =>
                    {
                        //处理业务
                        var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                        Console.WriteLine($"{i},消费者:{guid},队列{queueName}消费消息:{message}");
                        channel.BasicAck(ea.DeliveryTag, false); //消息ack确认，告诉mq这条队列处理完，可以从mq删除了　　　　　　　　　　　　　　　
                        //Thread.Sleep(1000);                        
                        i++;
                    };
                    channel.BasicConsume(queueName, autoAck: false, consumer);
                }
            }
        }
        /*
         BasicQos参数解析：

         prefetchSize：每条消息大小，一般设为0，表示不限制。
         
         prefetchCount：1，作用限流，告诉RabbitMQ不要同时给一个消费者推送多于N个消息，
         消费者会把N条消息缓存到本地一条条消费，如果不设，RabbitMQ会进可能快的把消息推到客户端，导致客户端内存升高。
         设置合理可以不用频繁从RabbitMQ 获取能提升消费速度和性能，设的太多的话则会增大本地内存，需要根据机器性能合理设置，官方建议设为30。
         
         global:是否为全局设置。
         
         这些限流设置针对消费者autoAck：false时才有效，如果是自动Ack的，限流不生效。
        */
    }
}
