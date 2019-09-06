import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Accounts } from '../models/account';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister : FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService
    , private router: Router) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['',[Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  onSubmit(){
    console.log(this.formRegister.value)
    const newAccount : Accounts =new Accounts()
    newAccount.name= this.formRegister.value.name;
    newAccount.address= this.formRegister.value.address;
    newAccount.email= this.formRegister.value.email;
    newAccount.password= this.formRegister.value.password;
    newAccount.phone= this.formRegister.value.phone;
    newAccount.admin= false;
    this.authService.register(newAccount).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      },
      err => console.log(err)
    )
  }

}
