import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CropItemsComponent } from './crop-items/crop-items.component';
import { NewCropComponent } from './new-crop/new-crop.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { TableModule } from 'primeng/table';

// import { TabViewModule } from 'primeng/tabview';
// import { TagModule } from 'primeng/tag';
// import { TerminalModule } from 'primeng/terminal';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CropItemsComponent,
    NewCropComponent,
    AuthComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    // own
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent,UsersComponent]
})
export class AppModule { }
