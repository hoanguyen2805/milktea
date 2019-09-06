import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Accounts } from '../models/account';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hien: false;
  users: Accounts[];
  updateUser: Accounts;
  formUpdate: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      accounts => this.users = accounts
    );
  }
  deleteUser(_id: string) {
    this.authService.deleteUserById(_id).subscribe(
      _ => this.users = this.users.filter(eachUser => eachUser._id !== _id)
    );
  }
  sua(user: Accounts) {
    this.updateUser = user;
    this.formUpdate = this.fb.group({
      name: [user.name, Validators.required],
      address: [user.address, Validators.required],
      phone: [user.phone, Validators.required],
      password: [user.password, Validators.required]
    });
  }
  update() {
    this.updateUser.name = this.formUpdate.value.name;
    this.updateUser.address = this.formUpdate.value.address;
    this.updateUser.phone = this.formUpdate.value.phone;
    this.updateUser.password = this.formUpdate.value.password;
    this.authService.updateUserByAdmin(this.updateUser).subscribe(
      () => {
        this.hien = false;
        alert('Thành công!');
      }
    );
  }
}
