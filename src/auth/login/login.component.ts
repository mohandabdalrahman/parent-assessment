import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginFormType} from "../models/login-form-ui.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit , OnDestroy {
  subscriptions = new Subscription();
  loginForm!: FormGroup<LoginFormType>;
  private nonNullableFormBuilder = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.initLoginForm();
  }


  initLoginForm() {
    this.loginForm = this.nonNullableFormBuilder.group({
      username: this.nonNullableFormBuilder.control('', [Validators.required, Validators.email]),
      password: this.nonNullableFormBuilder.control('', [Validators.required])
    })
  }

  submitLoginForm() {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.subscriptions.add(
      this.authService.login(this.loginForm.getRawValue()).subscribe((res) => {
        if (res?.token) {
          this.authService.setToken(res?.token)
          this.router.navigate(['/app'])
          this.toastr.success('Login Successful');
        }
      }, error => {
        console.error(error);
        this.toastr.error('Login Failed');
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
