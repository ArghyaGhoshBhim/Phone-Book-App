import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categoryList: category[] | undefined;
  constructor(private categoryService: CategoryService) {}
  deleteCategory(id: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
