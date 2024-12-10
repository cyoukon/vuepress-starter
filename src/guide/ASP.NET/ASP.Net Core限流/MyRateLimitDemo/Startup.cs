using AspNetCoreRateLimit;
using AspNetCoreRateLimit.Redis;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MyRateLimitDemo.DemoOptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyRateLimitDemo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyRateLimitDemo", Version = "v1" });
            });

            #region 限流相关
            // configure ip rate limiting middleware
            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
            services.Configure<IpRateLimitPolicies>(Configuration.GetSection("IpRateLimitPolicies"));

            // configure client rate limiting middleware
            services.Configure<ClientRateLimitOptions>(Configuration.GetSection("IpRateLimiting")); // 通用配置采用IP限制相同配置
            services.Configure<ClientRateLimitPolicies>(Configuration.GetSection("ClientRateLimitPolicies"));

            services.Configure<MyRateLimitOptions>(Configuration.GetSection(nameof(MyRateLimitOptions)));
            var rateLimitOptions = Configuration.GetSection(nameof(MyRateLimitOptions)).Get<MyRateLimitOptions>();

            // 存储计数和限流规则（内存中存储）
            //services.AddMemoryCache();

            // 存储计数和限流规则（分布式缓存中存储）
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = rateLimitOptions.RedisConnectionString;
                // 存储键前缀
                options.InstanceName = rateLimitOptions.InstanceName;
                //options.ConfigurationOptions = new StackExchange.Redis.ConfigurationOptions();
            });

            // 注入IP计数器
            services.AddSingleton<IIpPolicyStore, DistributedCacheIpPolicyStore>();
            services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
            // 注入客户端ID计数器
            services.AddSingleton<IClientPolicyStore, DistributedCacheClientPolicyStore>();

            // 注入规则存储
            services.AddSingleton<IRateLimitCounterStore, DistributedCacheRateLimitCounterStore>();

            // 配置（解析器、计数器密钥生成器）
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyRateLimitDemo v1"));
            }

            #region 限流相关
            // 启用IP限制速率
            app.UseIpRateLimiting();
            // 启用客户端ID限制速率
            app.UseClientRateLimiting();
            #endregion

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
