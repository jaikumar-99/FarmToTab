import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  // profile details edit
  editingEnabled = false;

  // profile
  profileDetails: any = {};

  // subscriptions
  profileSubscription: Subscription;

  // update form
  updateForm!: FormGroup;
  AddProducts!: FormGroup;
  addProducts: boolean = false;
  crops: any = [];
  selectedCrop: any = null;

  constructor(private appService: AppService, private formBuilder: FormBuilder, private messageservice: MessageService) { }

  ngOnInit(): void {
    this.profileDetails = this.appService.profileDetails;
    this.profileSubscription = this.appService.profileDetailsSubject.subscribe((value: any) => {
      if (value.email) {
        this.profileDetails = value;
      }
    });

    this.updateForm = this.formBuilder.group({
      profilename: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      mobile: [null, [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
      pincode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      landmark: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      state: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      totalland: [null, [Validators.required]],
    })

    this.AddProducts = this.formBuilder.group({
      productname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      price: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      qty: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    })


  }

  onEditProfile() {
    this.editingEnabled = true;
    console.log(this.profileDetails);

    this.updateForm.patchValue({
      profilename: this.profileDetails.profilename,
      mobile: parseInt(this.profileDetails.mobile, 0),
      pincode: parseInt(this.profileDetails.pincode, 0),
      landmark: this.profileDetails.landmark,
      state: this.profileDetails.state,
      country: this.profileDetails.country,
      totalland: parseInt(this.profileDetails.totalland, 0),
    })
    this.updateForm.updateValueAndValidity();
  }

  onCancel() {
    this.updateForm.reset();
    this.AddProducts.reset();
    this.editingEnabled = false;
    this.addProducts = false;
  }


  onadd() {
    this.addProducts = true;
    this.fetchcrops();
  }

  onUpdate() {
    if (this.updateForm.invalid) {
      return false;
    }

    const payload = {
      profilename: this.updateForm.value.profilename,
      mobile: `${this.updateForm.value.mobile}`,
      pincode: `${this.updateForm.value.pincode}`,
      landmark: this.updateForm.value.landmark,
      state: this.updateForm.value.state,
      country: this.updateForm.value.country,
      totalland: `${this.updateForm.value.totalland}`,
      role: `${this.profileDetails.role}`,
    }

    console.log('Updated Values', payload);

    this.appService.updateProfile(payload).subscribe({
      next: (response: any) => {
        console.log('Profile Response', response);

        if (response?.success) {
          this.profileDetails = JSON.parse(JSON.stringify(response.data));
          this.appService.profileDetails = this.profileDetails;
          this.appService.profileDetailsSubject.next(this.profileDetails);

          this.editingEnabled = false;
          this.updateForm.reset();
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Profile Details Updated!' });
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Unable to update profile details!' });
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }

  fetchcrops() {
    this.appService.getcropslist().subscribe({
      next: (response: any) => {
        this.crops = response.data;
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }

  onaddSubmit() {
    console.log(this.AddProducts.value)
    {
    }
    const payload = {
      productname: this.AddProducts.value.productname.cropname,
      cropcode: this.AddProducts.value.productname.cropcode,
      producttype: this.AddProducts.value.productname.croptype,
      description: this.AddProducts.value.description,
      price: parseInt(this.AddProducts.value.price, 0),
      qty: parseInt(this.AddProducts.value.qty, 0),
      userId: this.profileDetails._id,
      profilename: this.profileDetails.profilename,
      mobile: parseInt(this.profileDetails.mobile, 0),
      pincode: parseInt(this.profileDetails.pincode, 0),
      landmark: this.profileDetails.landmark,
      state: this.profileDetails.state,
      country: this.profileDetails.country,
      totalland: parseInt(this.profileDetails.totalland, 0),
    }

    console.log('Updated Values', payload);

    this.appService.createProduct(payload).subscribe({
      next: (response: any) => {
        console.log('Product', response);

        if (response?.success) {
          // this.profileDetails = response.data;
          // this.appService.profileDetails = response.data;
          // this.appService.profileDetailsSubject.next(this.appService.profileDetails);
          this.AddProducts.reset();
          this.updateForm.reset();
        } else {
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Unable to add Product!!!' });
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    this.addProducts = false;
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}
