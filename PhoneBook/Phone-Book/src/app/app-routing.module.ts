import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryContainerComponent } from './category/category-container/category-container.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { CategoryContactContainerComponent } from './contact/category-contact-container/category-contact-container.component';
import { ContactContainerComponent } from './contact/contact-container/contact-container.component';
import { DetailsContactComponent } from './contact/details-contact/details-contact.component';
import { HomeContactComponent } from './contact/home-contact/home-contact.component';
import { UpdateContactComponent } from './contact/update-contact/update-contact.component';
import { CategoryListResolverGuard } from './resolver/category-list.resolver';
import { ContactCategoryListResolver } from './resolver/contact-category-list.resolver';
import { ContactFindByIdResolver } from './resolver/contact-find-by-id.resolver';
import { HomeContactResolver } from './resolver/home-contact.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact/home',
    pathMatch: 'full',
  },
  {
    path: 'category',
    component: CategoryContainerComponent,
    resolve: {
      data: CategoryListResolverGuard,
    },
  },
  {
    path: 'contact',
    component: ContactContainerComponent,
    resolve: {
      data: CategoryListResolverGuard,
    },
    children: [
      {
        path: 'home',
        component: HomeContactComponent,
        resolve: {
          data: HomeContactResolver,
        },
      },
      {
        path: 'add-contact',
        component: AddContactComponent,
        resolve: {
          data: CategoryListResolverGuard,
        },
      },
      {
        path: 'category/:id',
        component: CategoryContactContainerComponent,
        resolve: {
          data: ContactCategoryListResolver,
        },
      },
      {
        path: 'view-profile/:id',
        component: DetailsContactComponent,
        resolve: {
          data: ContactFindByIdResolver,
        },
      },
      {
        path: 'update-profile/:id',
        component: UpdateContactComponent,
        resolve: {
          data: ContactFindByIdResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
