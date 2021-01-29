import {Component, OnInit} from '@angular/core';
import {ProfileModel} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

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
  statusApi: boolean;

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
    this.editProfileForm.controls.caption.setValidators([ Validators.required, Validators.pattern('^[A-Za-z,û,ù,ï,i]*$')]),
      this.editProfileForm.controls.status.setValidators([ Validators.required, Validators.minLength(4)]);
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
      if ( this.statusApi === false){
        this.errorApiMessage = data.message;
      }else{
        this.snackbar.open(this.successApiMessage.toString(), '', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar']
        });
      }
      this.OnClose();
    }, error => {
      console.log(error.message);
    });
  }

 onEditProfilee(){}
   /*   const profile: ProfileModel = {
       id: this.currentProfile.id, code: this.currentProfile.code,
       caption: this.editProfileForm.get('caption').value, status: this.editProfileForm.get('status').value
     };
     if ( profile.caption.length < 4) {
       Swal.fire('', 'Le nom de profil doit être de 4 lettres au minimum!');
     }else{
       this.profileService.updateProfile(this.currentProfile.id, profile)
         .subscribe(data => {
           // @ts-ignore
           this.successMessage = data.message;
           // @ts-ignore
           this.statusApi = data.success;
           if (this.statusApi === false) {
             this.error === true;
             // @ts-ignore
             this.errorMessage = data.message;
           } else {
             this.Toast.fire({
               icon: 'success',
               title: this.successMessage,
             });
             this.router.navigateByUrl('/profile').then(r => {});
           }
         }, error => {
           console.log(error.message);
         });
     }
   }*/

/*  getProfile(id: number) {
    this.profileService.getProfileById(id)
      .subscribe(value => {
        this.currentProfile = value;
        this.caption.setValue(this.currentProfile.caption);
        this.status.setValue(this.currentProfile.status);
      }, err => {
        console.log(err);
      });
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }*/

}
