import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Accounts } from '../models/account';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  account: Accounts = new Accounts();
  modalRef: BsModalRef;
  formUpdate: FormGroup;
  updateUser: Accounts;
  constructor(private authService: AuthService, private modalService: BsModalService
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.getProfileAccount();
  }
  getProfileAccount(): void {
    this.authService.getProfile().subscribe(
      account => this.account = account
    );
    console.log(this.account._id);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  truyendulieu(user: Accounts) {
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
    this.authService.updateProfileByUser(this.updateUser).subscribe(
      () => {
        alert('Thành công!');
        this.modalRef.hide();
      }
    );
  }
}
