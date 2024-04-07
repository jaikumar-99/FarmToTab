import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileDetails = this.appService.profileDetails;
    this.profileSubscription = this.appService.profileDetailsSubject.subscribe((value: any) => {
      if (value.email) {
        this.profileDetails = this.appService.profileDetails;
      }
    });

    this.updateForm = this.formBuilder.group({
      profilename: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      totalland: [null, [Validators.required]],
    })


  }

  onEditProfile() {
    this.editingEnabled = true;

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
    this.editingEnabled = false;
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
    }

    console.log('Updated Values', payload);

    this.appService.updateProfile(payload).subscribe({
      next: (response: any) => {
        console.log('Profile Response', response);

        if (response?.success) {
          // this.profileDetails = response.data;
          this.appService.profileDetails = response.data;
          this.appService.profileDetailsSubject.next(this.appService.profileDetails);

          this.editingEnabled = false;
          this.updateForm.reset();
        } else {
          console.log('Unable to update!');
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }
}
