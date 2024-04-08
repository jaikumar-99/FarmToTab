import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-crop-items',
  templateUrl: './crop-items.component.html',
  styleUrl: './crop-items.component.css'
})
export class CropItemsComponent {
  crops: any = [];
  loading: boolean = false;
  formVisible = false;  // controls the visibility of the form

  myForm: FormGroup;
  searchdata: any = null;
  editingEnabled: boolean = false;
  updateId: string = null;
  constructor(private appservice: AppService, private FormBuilder: FormBuilder) { }
  

  ngOnInit(){ 
    this.myForm = this.FormBuilder.group({
      croptype: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cropname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cropcode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
    this.fetchcrops();
  }

  toggleForm() {
      this.formVisible =!this.formVisible;
  }

  fetchcrops() {
    this.loading = true;
    this.appservice.getcropslist().subscribe({
      next: (response: any) => {
        this.crops = response.data;
        this.loading = false;
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }
  // onSubmit() {
  //   this.myForm.reset();
  //   console.log(this.myForm.value);
  // }
  onSubmit() {
    if (this.myForm.invalid) {
      return false;
    }

    const payload = {
      croptype: this.myForm.value.croptype,
      cropname: this.myForm.value.cropname,
      cropcode: this.myForm.value.cropcode
    }

    console.log('post Values', payload);

    this.appservice.createCrop(payload).subscribe({
      next: (response: any) => {
        console.log('Profile Response', response);

        if (response?.success) {
          // this.profileDetails = response.data;
          this.fetchcrops();
          this.formVisible = false;
          // this.editingEnabled = false;
        } else {
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    this.myForm.reset();
  }
  clear(table: Table) {
    table.clear();
    this.searchdata = null;
  }
  onCancel() {
    this.myForm.reset();
    this.formVisible = false;
    this.editingEnabled = false;
  }
  checkclear(event: any, dt: any) {
    this.searchdata = event;
    console.log(event, dt);
  }

  onUpdate(event: any) {
    this.formVisible = true;
    this.myForm.patchValue({
      croptype: event.croptype,
      cropname: event.cropname,
      cropcode: event.cropcode
    })
    this.myForm.updateValueAndValidity();
    console.log(event);
    this.updateId = event._id;
    this.editingEnabled = true;
  }

  onDelete(event) {
    this.updateId = event._id;
    this.appservice.deleteCrop({id:this.updateId}).subscribe({
      next: (response: any) => {
        console.log('Profile Response', response);

        if (response?.success) {
          // this.profileDetails = response.data;
          this.fetchcrops();
          this.formVisible = false;
          this.editingEnabled = false;
        } else {
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    this.myForm.reset();
  }


  onupdateclick() {
    const payload = {
      croptype: this.myForm.value.croptype,
      cropname: this.myForm.value.cropname,
    }

    console.log('post Values', payload);

    this.appservice.updateCrop({id: this.updateId, data: payload}).subscribe({
      next: (response: any) => {
        console.log('Profile Response', response);

        if (response?.success) {
          // this.profileDetails = response.data;
          this.fetchcrops();
          this.formVisible = false;
          this.editingEnabled = false;
        } else {
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    this.myForm.reset();
  }
}
