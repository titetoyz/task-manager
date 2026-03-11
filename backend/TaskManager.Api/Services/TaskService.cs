using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManager.Api.Models;
using TaskManager.Api.Settings;

namespace TaskManager.Api.Services;

public class TaskService
{
    private readonly IMongoCollection<TaskItem> _tasksCollection;

    public TaskService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

        _tasksCollection = mongoDatabase.GetCollection<TaskItem>(
            mongoDbSettings.Value.TasksCollectionName);
    }

    public async Task<List<TaskItem>> GetAsync() =>
        await _tasksCollection.Find(_ => true).ToListAsync();

    public async Task<TaskItem?> GetAsync(string id) =>
        await _tasksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(TaskItem newTask) =>
        await _tasksCollection.InsertOneAsync(newTask);

    public async Task UpdateAsync(string id, TaskItem updatedTask) =>
        await _tasksCollection.ReplaceOneAsync(x => x.Id == id, updatedTask);

    public async Task RemoveAsync(string id) =>
        await _tasksCollection.DeleteOneAsync(x => x.Id == id);
}