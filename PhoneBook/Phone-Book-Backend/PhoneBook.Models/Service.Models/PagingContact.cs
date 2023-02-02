using PhoneBook.Models.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook.Models.Service.Models
{
    public class PagingContact
    {
        public int TotalCount { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; } 
        public IEnumerable<Contact> Contacts { get; set; }
    }
}
