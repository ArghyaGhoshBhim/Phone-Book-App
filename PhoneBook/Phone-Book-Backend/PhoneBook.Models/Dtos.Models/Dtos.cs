using PhoneBook.Models.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBook.Models.Dtos.Models
{
    public record ContactDto(
        Guid Id, 
        string FirstName, 
        string LastName, 
        string Email, 
        string? Dob, 
        string PrimaryNumber, 
        string SecondaryNumber, 
        Category Category);
    public record CreateContactDto(
        string FirstName, 
        string LastName, 
        string Email, 
        string Dob, 
        string PrimaryNumber, 
        string SecondaryNumber, 
        Guid CategoryId
        );
    public record UpdateContactDto(
        string FirstName, 
        string LastName, 
        string Email, 
        string Dob, 
        string PrimaryNumber, 
        string SecondaryNumber, 
        Guid CategoryId
        );
    public record PagingContactResponse(
        int TotalCount, 
        int PageIndex,
        int PageSize, 
        IEnumerable<ContactDto>? contactsData
        );

    public record PagingContactRequest(
        int PageIndex = 0,
        int PageSize = 10
        );


}
