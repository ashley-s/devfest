import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    //this.name = new FormControl("", [Validators.required, Validators.minLength(5)]);
    //this.name.setValidators();
    // this.mainForm = new FormGroup({
    //   name: new FormControl("", [Validators.required, Validators.minLength(5)])
    // })
    this.mainForm = new FormGroup({});
    //this.onChanges();
  }

  submitForm(form: NgForm) {
    console.log('-----------');
    console.log(form.status);
    console.log('-----------');
    console.log('-----------');
    console.log(form.value);
    console.log('-----------');
  }
}
