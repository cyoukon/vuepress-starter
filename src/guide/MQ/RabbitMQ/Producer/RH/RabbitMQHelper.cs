using RabbitMQ.Client;

namespace RH
{
    /// <summary>
    /// RabbitMQ帮助类
    /// </summary>
    public class RabbitMQHelper
    {
        private static ConnectionFactory factory;
        private static readonly object lockObj = new();
        /// <summary>
        /// 获取单个RabbitMQ连接
        /// </summary>
        /// <returns></returns>
        public static IConnection GetConnection()
        {
            if (factory == null)
            {
                lock (lockObj)
                {
                    if (factory == null)
                    {
                        //factory = new ConnectionFactory
                        //{
                        //    Uri = new System.Uri("amqp://admin:123456@127.0.0.1:15672/develop")
                        //};
                        factory = new ConnectionFactory
                        {
                            // ip
                            HostName = "192.168.16.200",
                            // 端口
                            Port = 5672,
                            // 账号
                            UserName = "admin",
                            // 密码
                            Password = "123456",
                            // 虚拟主机
                            VirtualHost = "develop" 
                        };
                    }
                }
            }
            return factory.CreateConnection();
        }
    }
}
