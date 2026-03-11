using Microsoft.AspNetCore.Mvc;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(new[]
        {
            new { Id = 1, Title = "Első task", Status = "Todo" },
            new { Id = 2, Title = "Második task", Status = "Done" }
        });
    }
}