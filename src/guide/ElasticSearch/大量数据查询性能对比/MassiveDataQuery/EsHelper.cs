using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenFu;
using Nest;

namespace MassiveDataQuery
{
    internal class EsHelper
    {
        private readonly ElasticClient elasticClient;
        private readonly string index = "query_test";

        public EsHelper(string EsUrl)
        {
            var node = new Uri(EsUrl);
            elasticClient = new ElasticClient();
        }

        public async Task<bool> CreateIndexAsync<T>(string indexName,
                                                    int numberOfShards = 1,
                                                    int numberOfReplicas = 1) where T : class
        {
            var existsIndex = await elasticClient.Indices.GetAsync(indexName);
            if (existsIndex.IsValid)
            {
                return true;
            }

            var result = await elasticClient.Indices.CreateAsync(
                indexName,
                d => d.Settings(s => s.NumberOfShards(numberOfShards).NumberOfReplicas(numberOfReplicas))
                      .Map<T>(m => m.AutoMap())
                );
            return result.IsValid && result.Acknowledged;
        }

        public async Task CreateSeedDataAsync(int count)
        {
            var isok = await CreateIndexAsync<EsEntity>(index);
            var currentCount = await elasticClient.CountAsync(new Func<CountDescriptor<EsEntity>, ICountRequest>(s => s.Index(index)));
            var newCount = count - currentCount.Count;
            if (newCount <= 0)
            {
                return;
            }

            var data = A.ListOf<EsEntity>((int)newCount);
            var max = data.Max(d => d.AggStartTime);
            var max1 = data.Max(d => d.AggEndTime);
            var min = data.Min(d => d.AggStartTime);
            var min1 = data.Min(d => d.AggEndTime);
            Console.WriteLine($"AggStartTime max:{max}  min:{min}");
            Console.WriteLine($"AggEndTime max:{max1}  min:{min1}");
            foreach (var entity in data)
            {
                entity.ID = Guid.NewGuid().ToString();
            }

            var bulkAllObservable = elasticClient.BulkAll(data, b => b
                .Index(index)
                .BackOffTime("30s")
                .BackOffRetries(2)
                .RefreshOnCompleted()
                .MaxDegreeOfParallelism(Environment.ProcessorCount)
                .Size(1000)
            )
            .Wait(TimeSpan.FromMinutes(15), next =>
            {
                // do something e.g. write number of pages to console
                Console.WriteLine($"next.Page:{next.Page}; next.Retries{next.Retries}");
            });
        }

        public async Task<List<EsEntity>> Scroll一万SearchAsync()
        {
            var esData = new List<EsEntity>();
            var scrollSize = 10000;
            var searchResp = await elasticClient.SearchAsync<EsEntity>(
                s => s.Index(index)
                      .Size(scrollSize)
                      .Scroll("20s")
                      .Query(
                         q => q.DateRange(r => r.Field(f => f.AggStartTime).GreaterThanOrEquals(new DateTime(1900, 1, 1)))
                              && q.DateRange(r => r.Field(f => f.AggEndTime).LessThanOrEquals(DateTime.Now))
                         ));
            esData.AddRange(searchResp.Documents);
            while (searchResp.Documents?.Count == scrollSize)
            {
                var scrollId = searchResp.ScrollId;
                searchResp = await elasticClient.ScrollAsync<EsEntity>("20s", scrollId);
                esData.AddRange(searchResp.Documents);
            }
            return esData;
        }

        public async Task<List<EsEntity>> Scroll一千SearchAsync()
        {
            var esData = new List<EsEntity>();
            var scrollSize = 1000;
            var searchResp = await elasticClient.SearchAsync<EsEntity>(
                s => s.Index(index)
                      .Size(scrollSize)
                      .Scroll("20s")
                      .Query(
                         q => q.DateRange(r => r.Field(f => f.AggStartTime).GreaterThanOrEquals(new DateTime(1900, 1, 1)))
                              && q.DateRange(r => r.Field(f => f.AggEndTime).LessThanOrEquals(DateTime.Now))
                         ));
            esData.AddRange(searchResp.Documents);
            while (searchResp.Documents?.Count == scrollSize)
            {
                var scrollId = searchResp.ScrollId;
                searchResp = await elasticClient.ScrollAsync<EsEntity>("20s", scrollId);
                esData.AddRange(searchResp.Documents);
            }
            return esData;
        }

        public async Task<List<EsEntity>> SearchAfterAsync()
        {
            var esData = new List<EsEntity>();
            var scrollSize = 10000;
            var searchResp = await elasticClient.SearchAsync<EsEntity>(
                s => s.Index(index)
                      .Size(scrollSize)
                      .Query(
                         q => q.DateRange(r => r.Field(f => f.AggStartTime).GreaterThanOrEquals(new DateTime(1900, 1, 1)))
                              && q.DateRange(r => r.Field(f => f.AggEndTime).LessThanOrEquals(DateTime.Now))
                       )
                      .Sort(srt => srt
                        .Ascending(p => p.AggStartTime)
                        .Ascending(p => p.AggEndTime)
                      )
                  );
            esData.AddRange(searchResp.Documents);
            while (searchResp.Documents?.Count == scrollSize)
            {
                searchResp = await elasticClient.SearchAsync<EsEntity>(
                    s => s.Index(index)
                          .Size(scrollSize)
                          .Sort(srt => srt
                            .Ascending(p => p.AggStartTime)
                            .Ascending(p => p.AggEndTime)
                          )
                          .SearchAfter(esData.Last().AggStartTime, esData.Last().AggEndTime)
                          .Query(
                             q => q.DateRange(r => r.Field(f => f.AggStartTime).GreaterThanOrEquals(new DateTime(1900, 1, 1)))
                                  && q.DateRange(r => r.Field(f => f.AggEndTime).LessThanOrEquals(DateTime.Now))
                             ));
                esData.AddRange(searchResp.Documents);
            }
            return esData;
        }
    }
}
