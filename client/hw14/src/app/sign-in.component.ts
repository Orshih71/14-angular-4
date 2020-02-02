import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sing-in',
  template: `
    <form [formGroup]="formSignIn" (ngSubmit)="onSubmit()">
      <span>Username: </span>
      <span *ngIf="!formSignIn.get('username').valid">*</span>
      <input type="text" name="username" [formControl]="formSignIn.get('username')">
      <br><br>
      <span>Password: </span>
      <span *ngIf="!formSignIn.get('password').valid">*</span>
      <input type="password" name="password" [formControl]="formSignIn.get('password')">
      <br><br>
      <button type="submit" [disabled]="!formSignIn.valid">Submit</button>
    </form>
  `,
  styles: []
})
export class SignInComponent implements OnInit {
  formSignIn : FormGroup;
  // const formGroup = new FormGroup({
  //   login: new FormControl(''),
  //   password: new FormControl('')
  // });
  constructor(private fb: FormBuilder) {
    this.formSignIn = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }
  onSubmit(){
    console.log('val', this.formSignIn.value);
  }

  ngOnInit() {
  }

}
