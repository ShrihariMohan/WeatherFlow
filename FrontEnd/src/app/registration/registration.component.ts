import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User() ;
  pass ;
  cpass ;
  msg: string = ''
  constructor(private service:RegistrationService , private router: Router ,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  async registerUser() {
    if (this.pass === this.cpass) {
      this.user.password = this.pass ;
    }
    else {
      this.toastr.error("Password doesn't match");
      return
    }   
     const data = await this.service.registerUserFromRemote(this.user);
    
      if (data == "OK") {console.log("yes") ;
      this.router.navigate(['login']);
    }
      else {
        console.log(data);
        this.toastr.error("Something happened! please try again after some time");
        ;
      }
  }

  gotoLogin() {
    this.router.navigate(['login']) ;
  }
}
