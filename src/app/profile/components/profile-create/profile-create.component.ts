import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileModel} from '../../models/profile.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent implements OnInit {
  profileForm: FormGroup;
  error = false;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  statusApi: boolean;
  constructor(private profileService: ProfileService, private router: Router, private formBuilder: FormBuilder, ) { }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  ngOnInit(): void {
    this.createForm();
    this.resetProfileForm();
  }

  resetProfileForm(){
    if (this.profileForm != null){
      this.profileForm.reset();
    }
    this.profileForm = this.formBuilder.group({
      caption: [, { validators: [Validators.required, Validators.pattern('^[A-Za-z,è,é,ê,ë,û,ù,à,ï,i]*$'),
          Validators.minLength(4)], updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  createForm(){
    this.profileForm = new FormGroup({
      caption: new FormControl('', Validators.required,),
      status: new FormControl('', Validators.required)
    });
  }

  get caption(){
    return this.profileForm.get('caption');
  }

  get status(){
    return this.profileForm.get('status');
  }

  OnClose(){ this.router.navigateByUrl('/profile');}

  onSaveProfile(){
    this.submitted = true;
    let profile: ProfileModel;
    profile = this.profileForm.value;
    if ( profile.caption.length < 4) {
      Swal.fire('', 'Le nom de profil doit être de 4 lettres au  minimum!');
    } else {
      this.profileService.saveProfile(profile)
        .subscribe( response => {
          // @ts-ignore
          this.successMessage = response.message;
          // @ts-ignore
          this.statusApi = response.success;
          if (this.statusApi === false) {
            this.error === true;
            // @ts-ignore
            this.errorMessage = response.message;
          } else {
            this.Toast.fire({
              icon: 'success',
              title: this.successMessage,
            });
            this.router.navigateByUrl('/profile').then(r => {});
          }
        },err => {
          console.log(err.message);
        });
    }
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }
}
