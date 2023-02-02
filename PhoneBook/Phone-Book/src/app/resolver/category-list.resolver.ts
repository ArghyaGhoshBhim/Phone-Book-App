import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryListResolverGuard implements Resolve<category[]> {
  constructor(private categoryService: CategoryService) {}
  resolve() {
    return this.categoryService.getAllCategory();
  }
}
