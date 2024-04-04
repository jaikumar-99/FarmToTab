import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CropItemsComponent } from './crop-items/crop-items.component';
import { NewCropComponent } from './new-crop/new-crop.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CropItemsComponent,
    NewCropComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // own
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
