import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {
  optionForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void { this.createForm();}

  createForm(){
    this.optionForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  get caption(){
    return this.optionForm.get('caption');
  }

  get status(){
    return this.optionForm.get('status');
  }

  OnClose(){this.router.navigateByUrl("/option");}

  onSaveOption(){

  }
}
