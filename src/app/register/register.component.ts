import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { UserService } from '../services/user.service';
import { UserCustom } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  result?:  User | auth.UserCredential ;
  message = '';
  user?: auth.UserCredential;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService) {
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  async register() {
    if(!this.registerForm.valid) {
      console.log('grrr');
      return;
    }
    console.log('register', this.registerForm.value);
    try {
      this.message = '';
      const { email, password } = this.registerForm.value;
      this.result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.registerForm.reset();  
      if (this.result && this.result.user) {
        const { uid, emailVerified } = this.result.user;
        const newUser: UserCustom = { 
          uid,
          email: this.result.user.email!,
          emailVerified,
          createdAt : new Date(),
          socialSecurityNumber: ''
         }
        const userCreated = await this.userService.createUser(newUser);
        console.log('userCreated', userCreated);
        this.result = undefined;        
      }    
    } catch (error) {
      console.error(error);      
      if(error.message === 'The email address is already in use by another account.') {
        this.message = 'Email déjà pris';
      }
    }
  }

  async login() {
    if(!this.loginForm.valid) {
      console.log('login form not valid');
      return;      
    }
    try {
      const { email, password } = this.loginForm.value;
      this.user = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('user', this.user);
    } catch (err) {
      console.error(err);      
    }
  }

}
