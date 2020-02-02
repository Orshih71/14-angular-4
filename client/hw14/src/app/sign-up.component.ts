import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {UserServiceService} from "./user-service.service";

@Component({
  selector: 'app-sing-up',
  template: `
    <form [formGroup]="formSignUp" (ngSubmit)="onSubmit()">
      <span>Username: </span>
      <span *ngIf="!formSignUp.get('username').valid">*</span>
      <input type="text" name="username" [formControl]="formSignUp.get('username')">
      <br><br>
      <span>Email: </span>
      <span *ngIf="!formSignUp.get('email').valid">*</span>
      <input type="email" name="email" [formControl]="formSignUp.get('email')">
      <span *ngIf="formSignUp.get('email').hasError('invalid')">Used email</span>
      <br><br>
      <span>Password: </span>
      <span *ngIf="!formSignUp.get('password').valid">*</span>
      <input type="password" name="password" [formControl]="formSignUp.get('password')">
      <span *ngIf="formSignUp.hasError('different')">Passwords are not same</span>
      <br><br>
      <span>Confirm password: </span>
      <span *ngIf="!formSignUp.get('passwordConfirm').valid">*</span>
      <input type="password" name="passwordConfirm" [formControl]="formSignUp.get('passwordConfirm')">
      <span *ngIf="formSignUp.hasError('different')">Passwords are not same</span>
      <br><br>
      <button type="submit" [disabled]="!formSignUp.valid">Submit</button>
    </form>
  `,
  styles: []
})
export class SignUpComponent implements OnInit, OnDestroy {
  formSignUp: FormGroup;
  private subs$;

  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.formSignUp = fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email]), [this.asyncEmailValidator]],
      'password': ['', Validators.required],
      'passwordConfirm': ['', Validators.required]
    },  {validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value;
    return pass === confirmPass ? null : { different: true }
  }
  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      //db req
      setTimeout(() => {
        console.log(control.value);
        if (control.value != 'bbaatar@mum.edu') resolve({'invalid': true});
        else resolve(null);
      }, 1500);
    });
  }

  onSubmit() {
    this.subs$ = this.userService.sendPost('http://localhost:3000/signup', this.formSignUp.value)
    .subscribe(res => console.log("response",res),
        error => console.error(error));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

}
