using Microsoft.AspNetCore.Mvc;
using Phone_Book_Backend.Extensions;
using PhoneBook.Exceptions;
using PhoneBook.Models.Data.Models;
using PhoneBook.Models.Dtos.Models;
using PhoneBook.Models.Service.Models;
using PhoneBook.Service.ContactService;
using PhoneBook.Service.IService;
using PhoneBook.Service.ServiceImp;

namespace Phone_Book_Backend.Controllers
{
    [ApiController]
    [Route("api/contact/")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService contactService;

        private readonly ILogger<ContactController> logger;

        public ContactController(IContactService contactService, ILogger<ContactController> logger)
        {
            this.contactService = contactService;
            this.logger = logger;
        }
        
        [HttpGet]
        public async Task<IEnumerable<ContactDto>> GetAllContacts()
        {
            var contsctList = (await contactService.GetAllContact()).Select(item=>item.AsDto());
            return contsctList;
        }
        
        [HttpPost]
        public async Task<ActionResult> AddContact(CreateContactDto addContactDto)
        {
            var addContactRequest = new ContactModel()
            {
                FirstName = addContactDto.FirstName,
                LastName= addContactDto.LastName,
                Email=addContactDto.Email,
                Dob=addContactDto.Dob,
                PrimaryNumber=addContactDto.PrimaryNumber,
                SecondaryNumber=addContactDto.SecondaryNumber,
                CategoryId=addContactDto.CategoryId,
            };
            var contactId = await contactService.AddContact(addContactRequest);
            if (contactId==Guid.Empty)
            {
                return Ok(Guid.Empty);
            }
            return CreatedAtAction(nameof(AddContact), new { id = contactId });
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> UpdateContact([FromRoute] Guid id, UpdateContactDto updateContactRequest)
        {
            var updateContact = new ContactModel()
            {
                FirstName = updateContactRequest.FirstName,
                LastName = updateContactRequest.LastName,
                Email = updateContactRequest.Email,
                Dob = updateContactRequest.Dob,
                PrimaryNumber = updateContactRequest.PrimaryNumber,
                SecondaryNumber = updateContactRequest.SecondaryNumber,
                CategoryId = updateContactRequest.CategoryId,
            };
            var contact = await contactService.UpdateContact(updateContact, id);
            if(contact == Guid.Empty)
            {
                logger.LogInformation($"contact not found with contactId {id}");
                throw new ContactNotFoundException("Contact not found");
            }
            return Ok(contact);
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteContact(Guid id)
        {
            var contactId = await contactService.DeleteContact(id);
            if (contactId == Guid.Empty)
            {
                throw new ContactNotFoundException("User not found");
            }
             return Ok(contactId);
        }

        [HttpGet]
        [Route("find/")]
        public async Task<ActionResult<ContactDto>> GetContactById(Guid id)
        {
            var contact = await contactService.GetContactById(id);
            if (contact == null)
            {
                throw new ContactNotFoundException("Contact not found");
            }
            return Ok(contact.AsDto());
        }

        [HttpGet]
        [Route("filter/")]
        public async Task<ActionResult<PagingContactResponse>> GetContacts(string? firstName, string? searchKey, int pageSize=4, int pageNumber = 1)
        {
            var pagingContact = await contactService.GetContacts(pageSize, pageNumber, firstName, searchKey);
            logger.LogInformation("contacts in getContacts: ", pagingContact);
            return Ok(pagingContact.AsPagingContactDto());
        }

        [HttpPost]
        [Route("/category/{id}/get")]
        public async Task<ActionResult<PagingContactResponse>> GetAllContactByCategoryId([FromRoute]Guid id, PagingContactRequest pagingContactRequest)
        {
            var pagingContact = new PagingContact()
            {
                PageIndex = pagingContactRequest.PageIndex,
                PageSize = pagingContactRequest.PageSize
            };
            var contactList = await contactService.GetAllContactByCategoryId(id, pagingContact);
            return Ok(contactList.AsPagingContactDto());
        }
    }
}
