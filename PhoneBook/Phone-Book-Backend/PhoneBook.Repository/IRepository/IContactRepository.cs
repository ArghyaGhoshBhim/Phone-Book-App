using PhoneBook.Models.Data.Models;
using PhoneBook.Models.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook.Repository.Repository
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllContact();

        Task<Guid> AddContact(ContactModel addContactRequest);

        Task<Guid> UpdateContact(ContactModel contact, Guid id);

       Task<Guid> DeleteContact(Guid id);

       Task<Contact> GetContactById(Guid id);

        Task<PagingContact> GetContacts(int pageSize, int pageNumber, string firstName, string searchKey);
        Task<PagingContact> GetAllContactByCategoryId(Guid id, PagingContact pagingContact);


    }
}
