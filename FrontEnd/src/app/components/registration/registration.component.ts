import { Component, OnInit } from '@angular/core';
import { User } from '../../POJO/user/user';
import { RegistrationService } from '../../services/registration/registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

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
    private toastr: ToastrService ,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  async registerUser() {
    this.spinner.show() ;
    if (this.pass === this.cpass) {
      this.user.password = this.pass ;
    }
    else {
      this.toastr.error("Password doesn't match");
      this.spinner.hide() ;
      return
    } 
    this.spinner.show() ;  
    const data = await this.service.registerUserFromRemote(this.user);
    this.spinner.hide();
      if (data == "OK") {console.log("yes") ;
      this.router.navigate(['login']);
    }
      else {
        console.log(data);
        this.toastr.error("Something happened! please try again after some time");
        ;
      }
      this.spinner.hide()
  }

  gotoLogin() {
    this.router.navigate(['login']) ;
  }
}
