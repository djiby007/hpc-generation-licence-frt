import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-create',
  templateUrl: './configuration-create.component.html',
  styleUrls: ['./configuration-create.component.css']
})
export class ConfigurationCreateComponent implements OnInit {
  configForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {this.createForm();}

  createForm(){
    this.configForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get caption(){return this.configForm.get('caption');}

  get status(){return this.configForm.get('status');}

  Close(){this.router.navigateByUrl("/configuration");}

  onSaveConfiguration(){

  }
}
