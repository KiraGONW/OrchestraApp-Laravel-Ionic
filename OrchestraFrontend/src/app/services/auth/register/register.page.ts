import { ReturnStatement } from '@angular/compiler';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { DataService } from '../../data.service';
import { StatusService } from '../../status.service';
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registForm: FormGroup;

  constructor(public fb: FormBuilder, 
    private UserService: UserService,
    private DataService: DataService,
    private StatusService: StatusService,
    private AuthService: AuthService, 
    private router: Router) {
      this.registForm = this.fb.group({
        email: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]], 
        cpassword: ['', [Validators.required, Validators.minLength(4)]], 
        DNI: ['', [Validators.required, Validators.minLength(4)]], 
        name: ['', [Validators.required, Validators.minLength(4)]], 
        firstSurname: ['', [Validators.required, Validators.minLength(4)]], 
        secondSurname: ['', [Validators.required, Validators.minLength(4)]], 
        phone: ['', [Validators.required, Validators.minLength(4)]]
      });
     }

  ngOnInit() {
  }

  onFormSubmit() {
    if (!this.registForm.valid) {
      return false;
      
    } else {
      console.log("toiaqui")
      let usr = {
        id: null,
        email: this.registForm.value.email,
        password: this.registForm.value.password, 
        password_confirmation: this.registForm.value.cpassword, 
        role: 1
      }
      this.AuthService.addUser(usr)
        .subscribe((res) => {
          this.router.navigateByUrl("/tabs/tab1");
        });
      this.AuthService.saveUser(usr)
      let dat = {
        id: null,
        DNI: this.registForm.value.DNI,
        name: this.registForm.value.name, 
        firstSurname: this.registForm.value.firstSurname, 
        secondSurname: this.registForm.value.secondSurname, 
        phone: this.registForm.value.phone,  
        userEmail: this.registForm.value.email
      }
      this.DataService.addData(dat)
        .subscribe((res) => {
          this.router.navigateByUrl("/tabs/tab1");
        });
      let sta = {
        id: null, 
        type: 'Presencial', 
        startDate: 'A revisar', 
        endDate: 'A revisar', 
        userEmail: this.registForm.value.email
      }
      this.StatusService.addStatus(sta)
        .subscribe((res) => {
          this.router.navigateByUrl("/tabs/tab1");
        });
    }
  }
  return(){
    this.router.navigateByUrl("/tabs/tab2");
  }

}
