import { Component } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  categoryName = '';
  constructor(private categoryService: CategoryService) {}
  addCategory() {
    this.categoryName = this.categoryName.trim();
    if (this.categoryName != '') {
      this.categoryService.addCategory(this.categoryName).subscribe((data) => {
        window.location.reload();
      });
    }
  }
}
