using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhoneBook.Models.Data.Models;
using PhoneBook.Models.Dtos.Models;
using PhoneBook.Models.Service.Models;
using PhoneBook.Repository.Repository;
using PhoneBook.Repository.RepositoryImp;
using PhoneBook.Service.IService;


namespace PhoneBook.Service.ServiceImp
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository contactRepository;

        public ContactService(IContactRepository repository) { 
            this.contactRepository = repository;
        }

        public async Task<IEnumerable<Contact>> GetAllContact()
        {            
            return await contactRepository.GetAllContact();
        }

        public async Task<Guid> AddContact(ContactModel addContactRequest)
        {
           
            return await contactRepository.AddContact(addContactRequest); 
        }

        public async Task<Guid> UpdateContact(ContactModel updateContactRequest, Guid id)
        {
            return await contactRepository.UpdateContact(updateContactRequest, id);
        }

        public async Task<Contact> GetContactById(Guid id)
        {
            return await contactRepository.GetContactById(id);
        }

        public async Task<Guid> DeleteContact(Guid id)
        {
            return await contactRepository.DeleteContact(id);
        }

        public async Task<PagingContact> GetContacts(int pageSize, int pageNumber, string firstName, string searchKey)
        {
            return await contactRepository.GetContacts(pageSize, pageNumber, firstName, searchKey);
        }

        public async Task<PagingContact> GetAllContactByCategoryId(Guid id, PagingContact pagingContact)
        {
            return await contactRepository.GetAllContactByCategoryId(id, pagingContact);
          
        }


    }
}
