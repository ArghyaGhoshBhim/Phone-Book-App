using Microsoft.EntityFrameworkCore;
using PhoneBook.Models.Data.Models;
using PhoneBook.Models.Service.Models;
using PhoneBook.Repository.Repository;
namespace PhoneBook.Repository.RepositoryImp
{
    public class ContactRepository : IContactRepository
    {
        private readonly PhoneBookContext contactRepository;

        public ContactRepository(PhoneBookContext contactRepository)
        {
            this.contactRepository = contactRepository;
        }

        public async Task<Guid> AddContact(ContactModel addContactRequest)
        {
            var findCategory = await contactRepository.Category.FindAsync(addContactRequest.CategoryId);
            if (findCategory == null)
            {
                return Guid.Empty;
            }
            Contact contact = new Contact()
            {
                Id = Guid.NewGuid(),
                FirstName = addContactRequest.FirstName,
                LastName = addContactRequest.LastName,
                Email = addContactRequest.Email,
                Dob = addContactRequest.Dob,
                PrimaryNumber = addContactRequest.PrimaryNumber,
                SecondaryNumber = addContactRequest.SecondaryNumber,
                CreatedBy = "arghya",
               
            };
            contact.CategoryId = addContactRequest.CategoryId;
            await contactRepository.Contacts.AddAsync(contact);
            await contactRepository.SaveChangesAsync();
            return contact.Id;
        }

        public async Task<IEnumerable<Contact>> GetAllContact()
        {
            var contactList = await contactRepository.Contacts.Include(c=>c.Category).ToListAsync();
            return contactList;
        }
        public async Task<Guid> UpdateContact(ContactModel updateContactRequest, Guid id)
        {
            var findCategory = await contactRepository.Category.FindAsync(updateContactRequest.CategoryId);
            if(findCategory == null)
            {
                return Guid.Empty;
            }

            var contactInDb = await contactRepository.Contacts.FindAsync(id);
            if (contactInDb != null)
            {
                contactInDb.FirstName = updateContactRequest.FirstName;
                contactInDb.LastName = updateContactRequest.LastName;
                contactInDb.Email = updateContactRequest.Email;
                contactInDb.PrimaryNumber = updateContactRequest.PrimaryNumber;
                contactInDb.SecondaryNumber = updateContactRequest.SecondaryNumber;
                contactInDb.Dob = updateContactRequest.Dob;
                contactInDb.CategoryId = updateContactRequest.CategoryId;

                await contactRepository.SaveChangesAsync();
                return contactInDb.Id;
            }
            return Guid.Empty;
           
        }
        public async Task<Contact> GetContactById(Guid id)
        {
            var contact = await contactRepository.Contacts.Include(c=>c.Category).FirstOrDefaultAsync(i => i.Id == id);
            if(contact == null)
            {
                return null;
            }
            return contact;
        }

        public async Task<Guid> DeleteContact(Guid id)
        {
            var contact = await contactRepository.Contacts.FindAsync(id);
            if(contact == null)
            {
                return Guid.Empty;
            }
            contactRepository.Contacts.Remove(contact);
            await contactRepository.SaveChangesAsync();
            return contact.Id;
        }


        public async Task<PagingContact> GetContacts(int pageSize, int pageNumber, string firstName, string searchKey)
        {

            var collections = contactRepository.Contacts.Include(c=>c.Category) as IQueryable<Contact>;
            var totalCount=collections.Count();
            if (!string.IsNullOrWhiteSpace(firstName))
            {
                firstName = firstName.Trim();
                collections = collections.Where(c => c.FirstName.ToLower().StartsWith(firstName.ToLower()));

            }

            if (!string.IsNullOrWhiteSpace(searchKey))
            {
                searchKey = searchKey.Trim();
                collections = collections.Where(c => c.FirstName.Contains(searchKey));
            }

            var result= await collections.OrderBy(c => c.FirstName).Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToListAsync();
            var pagingContact = new PagingContact()
            {
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                Contacts = result
            };
            return pagingContact;
        }

        public async Task<PagingContact> GetAllContactByCategoryId(Guid id, PagingContact pagingContact)
        {
            var orderByCol = "FirstName";
            var collection = await contactRepository.Contacts.Include(c => c.Category).Where(c => c.CategoryId == id).ToListAsync();
            var lenthOfCollection=collection.Count();
            var result= collection.OrderBy(c=> "c."+ orderByCol).Skip(pagingContact.PageSize*(pagingContact.PageIndex-1)).Take(pagingContact.PageSize);
            pagingContact.TotalCount = lenthOfCollection;
            pagingContact.Contacts = result;
            return pagingContact;
        }
    }
}
