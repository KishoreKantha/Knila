import { Component, OnInit } from '@angular/core';
import { Contact } from '../../BO/Contact';
import { ApiService } from '../../Services/api.service';
import { DataService } from '../../Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService, private data: DataService, private toast: ToastrService, private router: Router) { }
  contacts: Contact[] = [];
  view: boolean = false;
  selectedContact: Contact = new Contact();
  ngOnInit(): void {
    if (!localStorage.getItem('User'))
      this.router.navigateByUrl('/signin')
    this.contacts = [];
    this.getContacts();
  }
  getContact(contact: Contact) {
    this.data.loading = true;
    this.api.get('Contact/getContact/' + contact.id).subscribe({
      next: (res: any) => {
        this.data.loading = false;
        if (res)
          this.open(res);
        else
          this.toast.error('Contact not found')
      },
      error: (err: any) => {
        this.data.loading = false;
        this.toast.error(err)
      }
    })

  }
  getContacts() {
    this.data.loading = true;
    this.api.get('Contact/getContactNames').subscribe({
      next: (res: any) => {
        this.data.loading = false;
        if (res && res.length > 0)
          this.contacts = res;
      },
      error: (err) => {
        this.data.loading = false;
      }
    })
  }
  close(value: boolean) {
    if (value) {
      this.contacts = [];
      this.getContacts();
    }
    this.view = false;
    this.selectedContact = new Contact();
  }
  open(contact: Contact) {
    this.selectedContact = contact;
    this.view = true;
  }
  newContact() {
    this.selectedContact = new Contact();
    this.view = true;
  }
}
