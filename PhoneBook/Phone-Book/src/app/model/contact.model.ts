export const BaseUrl = {
  url: 'https://localhost:7082/',
};
export class Contact {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dob: string = '';
  primaryNumber: string = '';
  secondaryNumber: string = '';
  categoryId: string = '';
}
export const pagination = {
  pageNumber: 1,
  pageSize: 10,
};
export class ContactDetails {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dob: string = '';
  primaryNumber: string = '';
  secondaryNumber: string = '';
  category:
    | {
        categoryId: string;
        categoryName: string;
      }
    | undefined;
}

export class PagingContact {
  contactsData = [];
  totalCount = 0;
  pageIndex = 0;
  pageSize = 0;
}
export class PagingContactReq {
  pageIndex = 1;
  pageSize = 10;
}
