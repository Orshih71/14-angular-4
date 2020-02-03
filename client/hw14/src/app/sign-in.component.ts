import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserServiceService} from "./user-service.service";

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
export class SignInComponent implements OnInit, OnDestroy {
  formSignIn: FormGroup;
  private subs$;
  // const formGroup = new FormGroup({
  //   login: new FormControl(''),
  //   password: new FormControl('')
  // });
  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.formSignIn = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.subs$ = this.userService.sendPost('http://localhost:3000/signin', this.formSignIn.value)
    .subscribe(res => {
        if (res.success) {
          if (res.token) {
            localStorage.setItem("token", res.token);
            console.log("Login success");
          }
          else console.error(res);
        } else {
          console.error("Wrong pass or username");
        }
      },

      error => console.error(error));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subs$) this.subs$.unsubscribe();
  }
}
