import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  public form: FormGroup;
  public result: any = {
    'type': '',
    'message': ''
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  OnSubmit() {
    this.result.type = '';
    this.result.message = '';
    this.authService.register(this.form.value)
      .subscribe(data => {
        this.result.type = 'successful';
        this.result.message = 'Your account is ready!';
      }, error => {
        this.result.type = 'error';
        this.result.message = 'Upps! We have a problem';
      });
  }
}
