using Microsoft.AspNetCore.Mvc;
using PhoneBook.Models.Data.Models;
using PhoneBook.Models.Dtos.Models;
using PhoneBook.Models.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook.Service.IService
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllContact();
        Task<Guid> AddContact(ContactModel addContactRequest);
        Task<Guid> UpdateContact(ContactModel updateContactRequest, Guid id);
        Task<PagingContact> GetContacts(int pageSize, int pageNumber, string firstName, string searchKey);
        Task<Guid>DeleteContact(Guid id);
        Task<Contact> GetContactById(Guid id);
        Task<PagingContact> GetAllContactByCategoryId(Guid id, PagingContact pagingContact);
    }
}
