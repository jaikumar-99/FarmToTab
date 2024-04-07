import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CropItemsComponent } from './crop-items/crop-items.component';
import { NewCropComponent } from './new-crop/new-crop.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductsItemsComponent } from './products-items/products-items.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


const routes: Routes = [
  // { path: '', component: AuthComponent },
  // { path: 'login', component: AppComponent },
  { path: 'login', component: AuthComponent },

  // admin
  { path: 'crops', component: CropItemsComponent, canActivate: [authGuard] },
  { path: 'add-crop', component: NewCropComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },

  // user
  { path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsItemsComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderHistoryComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

