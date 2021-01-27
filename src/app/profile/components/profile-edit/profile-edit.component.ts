import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileModel} from '../../models/profile.model';
import {ProfileService} from '../../services/profile.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  currentProfile: ProfileModel;
  editProfileForm: FormGroup;
  submitted = false;
  error = false;
  successMessage: string;
  errorMessage: string;
  statusApi: boolean;

  constructor(private profileService: ProfileService, private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {}

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
    this.resetEditProfileForm();
    this.getProfile(+this.activatedRoute.snapshot.paramMap.get('id'));
  }

  resetEditProfileForm(){
    if (this.editProfileForm != null){
      this.editProfileForm.reset();
    }
    this.editProfileForm = this.formBuilder.group({
      caption: [, { validators: [Validators.required, Validators.pattern('^[A-Za-z,è,é,ê,ë,û,ù,à,ï,i]*$') ], updateOn: 'change' },
        Validators.minLength(4)],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  get caption(){
    return this.editProfileForm.get('caption');
  }

  get status(){
    return this.editProfileForm.get('status');
  }

  OnClose(){
    this.router.navigateByUrl('/profile');
  }

  createForm(){
    this.editProfileForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  onEditProfile(){
    const profile: ProfileModel = {
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
  }

  getProfile(id: number) {
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
  }

}
