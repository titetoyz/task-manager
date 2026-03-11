using Microsoft.AspNetCore.Mvc;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    static List<TaskItem> tasks = new()
    {
        new TaskItem { Id = 1, Title = "Első task", Status = "Todo" },
        new TaskItem { Id = 2, Title = "Második task", Status = "Done" }
    };

    // GET /api/tasks
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(tasks);
    }

    // POST /api/tasks
    [HttpPost]
    public IActionResult Create(TaskItem task)
    {
        tasks.Add(task);
        return Ok(task);
    }

    // PUT /api/tasks/1
    [HttpPut("{id}")]
    public IActionResult Update(int id, TaskItem updatedTask)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
            return NotFound();

        task.Title = updatedTask.Title;
        task.Status = updatedTask.Status;

        return Ok(task);
    }

    // DELETE /api/tasks/1
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
            return NotFound();

        tasks.Remove(task);

        return Ok();
    }
}

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }
}