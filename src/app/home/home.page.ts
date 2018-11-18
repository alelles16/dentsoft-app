import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.authService.whoami()
    .subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.user = data;
    }, error => {
      this.router.navigate(['login']);
    });
  }

}
