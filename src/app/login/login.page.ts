import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;
  public result: any = {
    'type': '',
    'message': ''
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  OnSubmit() {
    this.result.type = '';
    this.result.message = '';
    this.authService.login(this.form.value)
      .subscribe((data: any) => {
        if (data.error) {
          this.result.type = 'error';
          this.result.message = 'Upps! Email or Password are incorrect';
        } else {
          this.authService.saveToken(data.token);
          this.router.navigate(['home']);
        }
      }, error => {
        this.result.type = 'error';
        this.result.message = 'Upps! Email or Password are incorrect';
      });
  }

}
