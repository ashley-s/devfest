import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    //this.name = new FormControl("", [Validators.required, Validators.minLength(5)]);
    this.name = this.fb.control("", [Validators.required, Validators.minLength(5)])
    //this.name.setValidators();
    this.onChanges();
  }

  onChanges() {
    const nameCtrl$ = this.name.valueChanges;

    nameCtrl$.subscribe((data) => {
      this.nameValue = data;
    })
  }
}
