import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../BO/Contact';
import { DataService } from '../../Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent implements OnInit {
  constructor(private data: DataService, private toast: ToastrService, private api: ApiService) { }

  @Input('contact') contact: Contact = new Contact();
  @Output('close') close = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  closeAction() {
    this.close.emit(false)
  }

  addOrUpdateContact(type: 'add' | 'update') {
    var msg = this.data.validateContact(this.contact)
    if (msg == 'Valid') {
      this.data.loading = true;
      this.contact.phoneNumber = this.contact.phoneNumber.toString();
      this.contact.postalCode = this.contact.postalCode.toString();
      if (type == 'add')
        this.api.post(this.contact, 'Contact/newContact').subscribe({
          next: (res: any) => {
            this.data.loading = false;
            this.toast.success('Contact Added')
            this.close.emit(true)
          },
          error: (err: any) => {
            this.data.loading = false;
            this.toast.error(err)
          }
        })
      else
        this.api.put(this.contact, 'Contact/updateContact/' + this.contact.id).subscribe({
          next: (res: any) => {
            this.data.loading = false;
            this.toast.success('Contact Updated')
            this.close.emit(true)
          },
          error: (err: any) => {
            this.data.loading = false;
            this.toast.error(err)
          }
        })
    } else
      this.toast.error(msg)
  }
  deleteContact() {
    this.data.loading = true;
    this.api.delete('Contact/deleteContact/' + this.contact.id).subscribe({
      next: (res: any) => {
        this.data.loading = false;
        this.toast.success('Contact Deleted')
        this.close.emit(true)
      },
      error: (err: any) => {
        this.data.loading = false;
        this.toast.error(err)
      }
    })
  }
}
