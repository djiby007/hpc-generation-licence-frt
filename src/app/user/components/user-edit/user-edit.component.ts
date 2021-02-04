import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';
import {ProfileService} from '../../../profile/services/profile.service';
import {ProfileModel} from '../../../profile/models/profile.model';
import {Location} from '@angular/common';
import {Status} from '../../../enum/status.enum';
import {Civility} from '../../../enum/civility.enum';
import Swal from 'sweetalert2';
import {FilialeModel} from '../../../filiale/models/filiale.model';
import {FilialeService} from '../../../filiale/services/filiale.service';
import {TypeGeneriqueLogin} from '../../../enum/typeGeneriqueLogin.enum';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  listFiliale: FilialeModel[];
  listProfile: ProfileModel[];
  user: UserModel;
  submitted = false;
  successApiMessage: string;
  errorApiMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filialeService: FilialeService,
    private userService: UserService,
    private profileService: ProfileService,
    private location: Location,
    private dialogue: MatDialogRef<UserEditComponent>) { }

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
    this.findUser(+this.dialogue.id);
    this.getAllFiliale();
    this.getAllProfile();
    this.createForm();
  }

  goBack() {
    this.location.back();
  }

  findUser(id: number){
    this.userService.findUser(id).subscribe(value => {
      this.user = value.data;
      this.firstName.setValue(this.user.firstName);
      this.lastName.setValue(this.user.lastName);
      this.email.setValue(this.user.email);
      this.filiale.setValue(this.user.filiale.id);
      this.civility.setValue(this.user.civility);
      this.profile.setValue(this.user.profile.id);
      this.status.setValue(this.user.status);
    });
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
    this.profileService.getProfiles().subscribe(value => this.listProfile = value);
  }

  getAllFiliale(){
    this.filialeService.getFiliale().subscribe(value => this.listFiliale = value.data);
  }

  createForm(){
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      civility: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required),
      filiale: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    // @ts-ignore
    const user: UserModel = {
      id: this.user.id,
      code: this.user.code,
      login: this.user.login,
      password: this.user.password,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      // tslint:disable-next-line:max-line-length
      filiale: {id: this.filiale.value, company: null, caption: '', adress: '', city: null, email: '', phone: '', status: Status.Actif, typeGeneriqueLogin: TypeGeneriqueLogin.BeforeEmail, webSite: '', code: ''},
      profile: {id: this.profile.value, caption: '', code: '', status: Status.Actif, message: '', success: true},
      civility: this.civility.value as Civility,
      status: this.status.value as Status
    };


    this.userService.updateUser(user).subscribe(
      (data) => {
        if (data.data === null){
          this.Toast.fire({
            icon: 'error',
            title: data.message,
          });
        }
        else {
          this.Toast.fire({
            icon: 'success',
            title: data.message,
          });
          this.router.navigateByUrl('/user');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }

  OnClose(){this.dialogue.close(); }

}
