import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { SignIn } from '../BO/Contact';
import { DataService } from '../Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService, private data: DataService, private toastr: ToastrService, private router: Router) { }
  payload: SignIn = new SignIn();

  ngOnInit(): void {
    this.payload = new SignIn();
  }
  SignIn() {
    this.data.loading = true;
    // if (!(this.payload.Email && this.data.emailRegex.test(this.payload.Email))) {
    //   this.toastr.warning('Please enter valid email id for sign in', 'Invalid email id');
    //   return;
    // }
    // if (!(this.payload.Password && this.data.passwordRegex.test(this.payload.Password))) {
    // this.toastr.warning('The password must be at least eight characters long and include at least one uppercase letter, one lowercase letter, and one number.Can include special characters.','Invalid password');
    // return;
    // }
    this.auth.authAction(this.payload, 'SignIn/signIn').subscribe({
      next: (res) => {
        this.data.loading = false;
        this.toastr.success('Sign In Success');
        localStorage.setItem('User', JSON.stringify(res))
        this.router.navigateByUrl('/contact/home')
        
      }, error: (err) => {
        this.data.loading = false;
        this.toastr.error('Please check your email and password.', 'Sign In Failed');
      }
    })
  }
}
