import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.scss'],
})
export class CategoryContainerComponent implements OnInit {
  categoryList: category[] = [];
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryList = this.activatedRoute.snapshot.data['data'];
  }
  openDialog() {
    this.dialog.open(AddCategoryComponent);
  }
}
