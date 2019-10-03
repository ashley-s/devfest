import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, of, Observer, observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Registration } from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  //name: FormControl;
  nameValue: string;
  mainForm: FormGroup;
  holderRegistrationObj: Registration;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    //this.name = new FormControl("", [Validators.required, Validators.minLength(5)]);
    //this.name.setValidators();
    // this.mainForm = new FormGroup({
    //   name: new FormControl("", [Validators.required, Validators.minLength(5)])
    // })
    this.mainForm = this.fb.group({
      courses: this.fb.array([])
    })
    this.holderRegistrationObj = {} as Registration;
    //this.onChanges();
  }

  ngAfterViewInit() {
    this.onChanges();
  }

  submitForm(form: NgForm) {
    console.log('-----------');
    console.log(this.holderRegistrationObj);
    console.log('-----------');
    
  }

  get courses(): FormArray {
    return <FormArray>this.mainForm.get("courses");
  }

  addcourse() {
    this.courses.push(this.fb.group({
      courseId: [null, [Validators.required, this.validateCourseId]],
      courseName: [null, Validators.required],
      payment: [null, Validators.required]
    }));
    //subscribe to a control value changes
    const courseIdControl = <FormControl>this.courses.controls[this.courses.length - 1].get("courseId");
    this.subscribeToCourseIdChanges(courseIdControl);
  }

  removeCourse(idx) {
    this.courses.removeAt(idx);
  }

  validateCourseId(ctrl: FormControl) {
    let id: string = ctrl.value;
    if (id && id.length == 5) {
      if (id.substr(0, 1) == "C") {
        return null;
      } else {
        return {
          message: "Course Id should start with a 'C'"
        }
      }
    } else {
      return {
        message: "Course Id should be 5 characters"
      }
    }
  }

  validateCourseIdBackEnd(ctrl: FormControl): Observable<ValidationErrors> {
    //let checkDigit = Math.random();
    let id: string = ctrl.value;
    let listId: any[] = ['C1234'];
    
    if (listId.indexOf(id) >= 0) {
      return of(null).pipe(delay(3000));
    } else {
      return of({message: "This courseId does not exist"}).pipe(delay(3000));
    }


  }

  subscribeToCourseIdChanges(ctrl: FormControl) {
    let courseId$ = ctrl.valueChanges;
    courseId$.subscribe((data) => {
      if (ctrl.valid) {
        ctrl.setAsyncValidators(this.validateCourseIdBackEnd);
      } else {
        ctrl.setAsyncValidators(null);
      }
      ctrl.updateValueAndValidity({
        emitEvent: false
      });
    })
  }

  private onChanges() {
    this.mainForm.valueChanges.subscribe((data: Registration) => {
      this.holderRegistrationObj.contactInfo = data.contactInfo;
      this.holderRegistrationObj.personalInfo = data.personalInfo;
      this.holderRegistrationObj.courses = data.courses;
    })
  }
} 
