import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ProfileModel} from '../../../profile/models/profile.model';
import {ProfileService} from '../../../profile/services/profile.service';
import {Location} from '@angular/common';
import {Status} from '../../../enum/status.enum';
import {Civility} from '../../../enum/civility.enum';
import Swal from 'sweetalert2';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {FilialeModel} from '../../../filiale/models/filiale.model';
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup;
  listFiliale: FilialeModel[];
  listProfile: ProfileModel[];
  submitted = false;
  successApiMessage: string;
  errorApiMessage: string;
  Status = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private filialeService: FilialeService,
    private userService: UserService,
    private profileService: ProfileService,
    private dialogue: MatDialogRef<UserCreateComponent>,
    private location: Location) { }

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
    this.getAllFiliale();
    this.getAllProfile();
    this.createForm();
  }

  goBack() {
    this.location.back();
  }

  get firstName(){
    return this.userForm.get('firstName');
  }

  get lastName(){
    return this.userForm.get('lastName');
  }

  get email(){
    return this.userForm.get('email');
  }

  get filiale(){
    return this.userForm.get('filiale');
  }

  get civility(){
    return this.userForm.get('civility');
  }

  get profile(){
    return this.userForm.get('profile');
  }

  get status(){
    return this.userForm.get('status');
  }

  getAllProfile() {
    this.profileService.getProfiles().subscribe(value => {
      console.log(value);
      this.listProfile = value;
    });
  }

  getAllFiliale(){
    this.filialeService.getFiliale().subscribe(value => this.listFiliale = value.data);
  }

  createForm(){
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      civility: new FormControl(Civility.Mr, Validators.required),
      status: new FormControl(Status.Actif, Validators.required),
      profile: new FormControl('', Validators.required),
      filiale: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const user: UserModel = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      filiale: {id: this.filiale.value},
      profile: {id: this.profile.value},
      civility: this.civility.value as Civility,
      status: this.status.value as Status
    };

    this.userService.addUser(user)
      .subscribe(data => {
        this.successApiMessage  = data.message;
        this.Status = Boolean(data.success);
        if (this.Status === true){
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        } else {
          this.errorApiMessage = data.message;
          this.snackbar.open(this.successApiMessage.toString(), '', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['green-snackbar']
          });
        }
      }, error => {
        console.log(error);
      });
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }


  OnClose(){this.dialogue.close(); }
}
