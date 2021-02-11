import {Component, OnInit} from '@angular/core';
import { ProfileModel } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  editProfileForm: FormGroup;
  successApiMessage: string;
  errorApiMessage: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  submitted = false;
  error = false;
  Status = false;
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
  constructor(public profileService: ProfileService,
              private formBuilder: FormBuilder,
              private dialogue: MatDialogRef<ProfileEditComponent>,
              private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.createForm();
    this.resetEditProfileForm();
  }

  resetEditProfileForm(){
    if (this.editProfileForm != null){
      this.editProfileForm.reset();
    }
    this.editProfileForm.controls.caption.setValidators([ Validators.required,
      Validators.pattern('^[A-Za-z,,û,ù,ï,i]*$'),
      Validators.minLength(4)]),
      this.editProfileForm.controls.status.setValidators([ Validators.required ]);
  }

  get caption(){
    return this.editProfileForm.get('caption');
  }
  get status(){
    return this.editProfileForm.get('status');
  }

  OnClose(){ this.dialogue.close(); this.profileService.filter('edit profile'); }

  createForm(){
    this.editProfileForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onEditProfile() {
    const currentProfile1 = this.profileService.currentProfile;
    const pro: ProfileModel = { id: currentProfile1.id,
      code: currentProfile1.code, success: currentProfile1.success, message: currentProfile1.message,
      caption: this.editProfileForm.get('caption').value, status: this.editProfileForm.get('status').value};
    this.profileService.updateProfile(pro.id, pro).subscribe( data => {
      this.successApiMessage = data.message;
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
      this.OnClose();
    }, error => {
      console.log(error.message);
    });
  }
}
