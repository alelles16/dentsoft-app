import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ConsultoryService } from '../services/consultory/consultory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any = {
    name: '',
    lastname: ''
  };
  public consultory: any = {
    name: ''
  };

  constructor(
    private authService: AuthService,
    private consultoryService: ConsultoryService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.authService.whoami()
      .subscribe((data: any) => {

        localStorage.setItem('user', JSON.stringify(data));
        this.user = data;

        this.consultoryService.getConsultoryByUser(this.user.id)
          .subscribe((data_consultory: any) => {

            localStorage.setItem('consultory', JSON.stringify(data_consultory));
            this.consultory = data_consultory;

          }, error => {
            console.log(error);
            this.router.navigate(['login']);
          });

      }, error => {
        this.router.navigate(['login']);
      });
  }

}
