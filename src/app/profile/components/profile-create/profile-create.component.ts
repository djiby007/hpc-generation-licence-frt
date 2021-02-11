import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProfileModel } from '../../models/profile.model';
import { MatDialogRef } from '@angular/material/dialog';
import { OptionService } from '../../../option/services/option.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent implements OnInit {
  profileForm: FormGroup;
  errorApiMessage: string;
  successApiMessage: string;
  Status: boolean;
  error = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  submitted = false;
  statusApi: boolean;
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
  constructor(private profileService: ProfileService,
              private dialogue: MatDialogRef<ProfileCreateComponent>,
              private optionService: OptionService ,
              private snackbar: MatSnackBar,
              private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
    this.resetProfileForm();
  }

  resetProfileForm(){
    if (this.profileForm != null){ this.profileForm.reset(); }
    this.profileForm = this.formBuilder.group({
      caption: [, { validators: [Validators.required, Validators.pattern('^[A-Za-z,ï,i]*$'),
          Validators.minLength(4)], updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  createForm(){
    this.profileForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get caption(){ return this.profileForm.get('caption'); }
  get status(){ return this.profileForm.get('status'); }

  OnClose(){ this.dialogue.close(); this.profileService.filter('Save profile'); }

  onSaveProfile(profile: ProfileModel){
    profile = this.profileForm.value;
    this.profileService.saveProfile(profile).subscribe(data => {
      this.resetProfileForm();
      this.Status = data.success;
      this.successApiMessage  = data.message;
      this.Status = data.success;
      if (this.Status === true){
        this.Toast.fire({
          icon: 'success',
          title: data.message,
        });
        this.OnClose();
      } else {
        this.Toast.fire({
          icon: 'error',
          title: data.message,
        });
      }
    }, err => {
      console.log(err.message);
    });
  }
}
