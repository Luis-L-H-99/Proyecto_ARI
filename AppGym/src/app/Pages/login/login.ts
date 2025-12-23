import { Component } from '@angular/core';
import { LoginUp } from '../../Components/login-up/login-up';
import { LoginDown } from '../../Components/login-down/login-down';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginUp, LoginDown],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
