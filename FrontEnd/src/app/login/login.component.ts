import { SharingService } from './../sharing.service';
import { Component, OnInit} from '@angular/core';
import { RegistrationService } from '../registration.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user = new User() ;
  msg = '' ;
  userID:number = null;
  constructor(private service:RegistrationService , private router: Router ,
    private sharing: SharingService , private toaster : ToastrService) {
     ;
  }

  ngOnInit(): void {
  }

  async loginUser() {
    console.log('i am here login') ;
    const data = await this.service.loginUserFromRemote(this.user) ;
    this.sharing.setUsername(data);
    if ( data )  this.router.navigate(['home']) ;
    else this.toaster.error("Inavlid Credentials Please try again");

  }

  gotoRegistration() {
    console.log('reg') ;
    this.router.navigate(['new']) ;
  }


}
