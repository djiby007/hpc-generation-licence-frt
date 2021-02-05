import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UpdateModel} from '../../models/update.model';
import {UserModel} from 'src/app/user/models/user.model';

@Component({
  selector: 'app-updade-password',
  templateUrl: './updade-password.component.html',
  styleUrls: ['./updade-password.component.scss']
})
export class UpdadePasswordComponent implements OnInit {
  updateForm: FormGroup;
  error = '';
  hide = true;
  submitted = false;
  verif = false;
  token = '';
  messageVerif = '';
  messageVerifOld = '';
  user: UserModel;
  userModel: UserModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.updateForm = new FormGroup({
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
        confirmNewPassword: new FormControl('', Validators.required)
      }
    );
  }

  get oldPassword() {
    return this.updateForm.get('oldPassword');
  }

  get newPassword() {
    return this.updateForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.updateForm.get('confirmNewPassword');
  }

  onSubmit() {
    this.submitted = true;
    this.verif = this.verifConformePassword(this.newPassword.value, this.confirmNewPassword.value);
    if (this.verif) {
      this.messageVerifOld = '';
      this.messageVerif = 'Les mots de passe ne sont pas conformes';
      return;
    }
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    let update: UpdateModel;
    update = this.updateForm.value;
    update.oldPassword = this.oldPassword.value;
    update.password = this.newPassword.value;
    update.email = this.user.email;

    this.authService.updatePassword(update).subscribe(
      (data) => {
        if (data.success){
          this.reloadCurrentUser();
          this.router.navigate(['home']);
        }else {
          this.messageVerif = '';
          this.messageVerifOld = data.message;
        }
      },
      (error) => {
        this.messageVerif = '';
        this.messageVerifOld = 'Oup\'s une erreur est survenue lors de la modififcation du mot de passe';
      }
    );
  }

  OnClose() {
    this.router.navigateByUrl('home');
  }

  reloadCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authService.getUser(this.user.login).subscribe(
      (data) => {
        localStorage.removeItem('currentUser');
        this.userModel = data;
        localStorage.setItem('currentUser', JSON.stringify(this.userModel));
      });
  }

  setError(control: AbstractControl) {
    return {'is-invalid': control.invalid && control.touched};
  }

  verifConformePassword(password: string, confirmPassword: string): boolean{
    if (password !== confirmPassword){
      return true;
    }else{
      return false;
    }
  }

}
