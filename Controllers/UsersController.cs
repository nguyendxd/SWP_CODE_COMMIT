using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SWP_SU4.DataDB;

namespace SWP_SU4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DiamondShopContext _context;

        public UsersController(DiamondShopContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{name}")]

        public async Task<ActionResult<IEnumerable<User>>> GetUserName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("User name mustn't blank");
            }
            var user = await _context.Users
                .Where(x => x.Username.Contains(name))
                .ToListAsync();
            if (user == null || user.Count == 0)
            {
                return NotFound();
            }
            return Ok(user);
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (user == null)
            {
                return BadRequest("User musn't blank");
            }
            if (user.UserId != null && !CheckUserValid.UserNameisValid(user.Username)) 
            {
                return BadRequest("User name cannot contains special Character");
            }
            if (UserNameExist(user.Username))
            {
                return BadRequest($"User {user.Username} are ready exist");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool UserNameExist(string name)
        {
            return _context.Users.Any(u => u.Username == name);
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
        public static class CheckUserValid
        {
            private static readonly Regex ValidUserName = new Regex("^[a-zA-Z0-9]*$", RegexOptions.Compiled); // Chứa chữ thường, chữ hoa và chữ số

            public static bool UserNameisValid(string productName)
            {
                return ValidUserName.IsMatch(productName);
            }
        }
    }
}
