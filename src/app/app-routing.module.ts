import { AppComponent } from './app.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CropItemsComponent } from './crop-items/crop-items.component';
import { NewCropComponent } from './new-crop/new-crop.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '/login', component: AppComponent },
  { path: '/crops', component: CropItemsComponent },
  { path: '/add-crop', component: NewCropComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

