using Contact_API.BO;
using ContactAPI.BO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace Contact_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly ILogger<ContactController> _logger;
        public ContactController(DBContext context, ILogger<ContactController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("allContacts")]
        public ActionResult<IEnumerable<Contact>> GetContacts()
        {
            _logger.LogInformation("All contacts fetched");
            return _context.Contacts.ToList();
        }
        [HttpGet("getContactNames")]
        public ActionResult<IEnumerable<RequiredData>> GetContactNames()
        {
            _logger.LogInformation("All contacts name details fetched");
            return _context.Contacts.Select(x => new RequiredData
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName
            }).ToList();
        }

        [HttpPost("newContact")]
        public async Task<ActionResult<Contact>> NewContact(Contact contact)
        {
            _logger.LogInformation("Add new contact action start");
            try
            {
                if (_context.Contacts.Any(e => e.Email.ToLower() == contact.Email.ToLower()))
                    return Ok(CommonResponse("200", "Email ID already exists for another contact"));
                if (_context.Contacts.Any(e => e.PhoneNumber == contact.PhoneNumber))
                    return Ok(CommonResponse("200", "Phone Number already exists for another contact"));
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                _logger.LogInformation("New contact added");
                return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Add new contact action failed. !");
                return Ok(CommonResponse("200", "Contact insert action failed !"));
            }

        }

        [HttpGet("getContact/{id}")]
        public async Task<ActionResult<Contact>> GetContact(long id)
        {
            _logger.LogInformation("Get contact action start");
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                _logger.LogInformation("Get contact action failed");
                return Ok(CommonResponse("200", "Contact not found ! "));
            }
            _logger.LogInformation("Contact found");
            return contact;
        }

        [HttpPut("updateContact/{id}")]
        public async Task<IActionResult> UpdateContact(long id, Contact contact)
        {
            _logger.LogInformation("Update contact action start");
            if (id != contact.Id)
            {
                _logger.LogInformation("Update contact action failed !");
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Contact details updated");
                return Ok(CommonResponse("200", "Contact details updated."));
            }
            catch (DbUpdateConcurrencyException)
            {
                _logger.LogInformation("Update contact action failed !");
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }
        [HttpDelete("deleteContact/{id}")]
        public async Task<IActionResult> DeleteContact(long id)
        {
            _logger.LogInformation("Delete contact action start");
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                _logger.LogInformation("Contact not found");
                return Ok(CommonResponse("200", "Contact not found ! "));
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Contact deleted");
            return Ok(CommonResponse("200", "Contact deleted successfully"));
        }
        private bool ContactExists(long id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
        private ContactResponse CommonResponse(string code, string message)
        {
            var res = new ContactResponse();
            res.Code = code;
            res.Message = message;
            return res;
        }
    }
}
