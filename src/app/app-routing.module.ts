import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CropItemsComponent } from './crop-items/crop-items.component';
import { NewCropComponent } from './new-crop/new-crop.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  // { path: '', component: AuthComponent },
  // { path: 'login', component: AppComponent },
  { path: 'login', component: AuthComponent },
  { path: 'crops', component: CropItemsComponent, canActivate: [authGuard] },
  { path: 'add-crop', component: NewCropComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

