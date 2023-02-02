import { CommonModule } from '@angular/common';
import { CategoryContainerComponent } from './category-container/category-container.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatrialModule } from '../material/material.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CategoryContainerComponent,
    CategoryListComponent,
    AddCategoryComponent,
  ],
  imports: [CommonModule, MatrialModule, FormsModule],
})
export class CategoryModule {}
