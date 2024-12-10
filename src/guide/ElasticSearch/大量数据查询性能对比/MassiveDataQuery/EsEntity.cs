using Nest;
using System;

namespace MassiveDataQuery
{
    internal class EsEntity
    {
        /// <summary>
        /// ID
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 聚合数据的开始时间
        /// </summary>
        [Date]
        public DateTime AggStartTime { get; set; }
        /// <summary>
        /// 聚合数据的结束时间
        /// </summary>
        [Date]
        public DateTime AggEndTime { get; set; }
        /// <summary>
        /// 记录的创建时间
        /// </summary>
        //[Date]
        //public DateTime CreateTime { get; set; }
        /// <summary>
        /// BOTID
        /// </summary>
        [Keyword]
        public string BotRecordId { get; set; }
        /// <summary>
        /// 租户ID
        /// </summary>
        [Keyword]
        public string TenantID { get; set; }
        /// <summary>
        /// 这一时间段的对话流量
        /// </summary>
        [Number(NumberType.Long)]
        public long ConversationTraffic { get; set; }
    }
}
