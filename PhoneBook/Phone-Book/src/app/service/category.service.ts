import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../model/category.model';
import { BaseUrl } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  addCategory(categoryName: string) {
    return this.httpClient.post<any>(
      BaseUrl.url + `api/category?categoryName=${categoryName}`,
      ''
    );
  }

  getAllCategory() {
    return this.httpClient.get<category[]>(BaseUrl.url + 'api/category');
  }
  deleteCategory(id: string) {
    return this.httpClient.delete(BaseUrl.url + `api/category?id=${id}`);
  }
}
