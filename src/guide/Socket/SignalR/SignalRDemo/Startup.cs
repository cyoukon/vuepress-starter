using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SignalRDemo.Hubs;

namespace SignalRDemo
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
            //services.AddControllers();

            // 这里可以添加筛选器
            // https://docs.microsoft.com/zh-cn/aspnet/core/signalr/hub-filters?view=aspnetcore-6.0
            services.AddSignalR()
            // https://docs.microsoft.com/en-us/aspnet/core/signalr/redis-backplane?view=aspnetcore-6.0
            //.AddStackExchangeRedis(connectionString, options => {
            //    options.Configuration.ChannelPrefix = "MyApp";
            //})
            ;

            services.AddCors(options =>
               options.AddPolicy("aollwAllOrigins", builder =>
                   builder.AllowAnyMethod()
                          .AllowAnyHeader()
                          .SetIsOriginAllowed(_ => true)
                          .AllowCredentials()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("aollwAllOrigins");

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/hub/chatHub");
            });
        }
    }
}
