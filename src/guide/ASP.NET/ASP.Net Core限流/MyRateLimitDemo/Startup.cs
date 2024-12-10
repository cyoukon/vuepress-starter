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

            #region �������
            // configure ip rate limiting middleware
            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
            services.Configure<IpRateLimitPolicies>(Configuration.GetSection("IpRateLimitPolicies"));

            // configure client rate limiting middleware
            services.Configure<ClientRateLimitOptions>(Configuration.GetSection("IpRateLimiting")); // ͨ�����ò���IP������ͬ����
            services.Configure<ClientRateLimitPolicies>(Configuration.GetSection("ClientRateLimitPolicies"));

            services.Configure<MyRateLimitOptions>(Configuration.GetSection(nameof(MyRateLimitOptions)));
            var rateLimitOptions = Configuration.GetSection(nameof(MyRateLimitOptions)).Get<MyRateLimitOptions>();

            // �洢���������������ڴ��д洢��
            //services.AddMemoryCache();

            // �洢�������������򣨷ֲ�ʽ�����д洢��
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = rateLimitOptions.RedisConnectionString;
                // �洢��ǰ׺
                options.InstanceName = rateLimitOptions.InstanceName;
                //options.ConfigurationOptions = new StackExchange.Redis.ConfigurationOptions();
            });

            // ע��IP������
            services.AddSingleton<IIpPolicyStore, DistributedCacheIpPolicyStore>();
            services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
            // ע��ͻ���ID������
            services.AddSingleton<IClientPolicyStore, DistributedCacheClientPolicyStore>();

            // ע�����洢
            services.AddSingleton<IRateLimitCounterStore, DistributedCacheRateLimitCounterStore>();

            // ���ã�����������������Կ��������
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

            #region �������
            // ����IP��������
            app.UseIpRateLimiting();
            // ���ÿͻ���ID��������
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
