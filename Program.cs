var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<BotA.Configuration.BotSettings>(builder.Configuration.GetSection("BotSettings"));

builder.Services.AddHttpClient<BotA.Services.MarketLookupService>();
builder.Services.AddHttpClient<BotA.Services.PolymarketApiService>();

builder.Services.AddSingleton<BotA.Services.Eip712SignerService>();
builder.Services.AddSingleton<BotA.Services.RiskManager>();
builder.Services.AddSingleton<BotA.Services.BotControlService>();
builder.Services.AddSingleton<BotA.Services.TradeStore>();
builder.Services.AddHostedService<BotA.Workers.BotWorker>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve static files for the dashboard
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Fallback route for SPA - serve index.html for non-API routes
app.MapFallback(async context =>
{
    // Don't handle API routes or files that should return 404
    var path = context.Request.Path.Value;
    if (path?.StartsWith("/api/", StringComparison.OrdinalIgnoreCase) ?? false)
    {
        context.Response.StatusCode = 404;
        return;
    }

    var webRootPath = app.Environment.WebRootPath ?? Path.Combine(app.Environment.ContentRootPath, "wwwroot");
    var indexPath = Path.Combine(webRootPath, "index.html");
    
    if (File.Exists(indexPath))
    {
        context.Response.ContentType = "text/html";
        await context.Response.SendFileAsync(indexPath);
    }
    else
    {
        context.Response.StatusCode = 404;
    }
});

app.Run();
