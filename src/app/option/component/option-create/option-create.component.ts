import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {OptionService} from '../../services/option.service';
import {OptionModel} from '../../models/option.model';

@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {
  optionForm: FormGroup;
  constructor(private router: Router,
              private dialogbox: MatDialogRef<OptionCreateComponent>,
              private optionService: OptionService ,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void { this.createForm(); this.resetForm(); }

  createForm(){
    this.optionForm = new FormGroup({
      caption: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
  }

  resetForm(){
    if (this.optionForm != null){
      console.log(this.optionForm);
      this.optionForm.reset();
    }
    this.optionForm = this.formBuilder.group({
      caption: [, { validators: [Validators.required], updateOn: 'change' }],
      status: [, { validators: [Validators.required], updateOn: 'change' }],
    });
  }
  get caption(){return this.optionForm.get('caption'); }
  get status(){return this.optionForm.get('status'); }

  OnClose(){this.dialogbox.close(); }

  onSaveOption(option: OptionModel){
    option = this.optionForm.value;
    this.optionService.saveOption(option).subscribe(res => {
      alert(res);
      this.resetForm();
      this.OnClose();
      console.log(res);
    });
  }
}
