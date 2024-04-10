import { Injectable } from '@angular/core';
import { Contact } from '../BO/Contact';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  loading: boolean = false;
  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  validateContact(contact: Contact) {
    if (!(contact.firstName && contact.firstName.trim() != ''))
      return 'Firstname invalid !';
    if (!(contact.lastName && contact.lastName.trim() != ''))
      return 'Lastname invalid !';
    if (!(contact.email && this.emailRegex.test(contact.email)))
      return 'Email invalid !';
    if (!(contact.password && this.passwordRegex.test(contact.password)))
      return 'Password invalid !. The password must be at least eight characters long and include at least one uppercase letter, one lowercase letter, and one number.Can include special characters.';
    if (!(contact.phoneNumber && contact.phoneNumber.toString().trim() != ''))
      return 'Firstname invalid !';
    if (!(contact.city && contact.city.trim() != ''))
      return 'City invalid !';
    if (!(contact.state && contact.state.trim() != ''))
      return 'State invalid !';
    if (!(contact.country && contact.country.trim() != ''))
      return 'Country invalid !';
    if (!(contact.state && contact.state.trim() != ''))
      return 'Firstname invalid !';
    if (!(contact.postalCode && contact.postalCode.toString().trim() != ''))
      return 'PostalCode invalid !';
    if (!(contact.address && contact.address.trim() != ''))
      return 'Address invalid !';
    return "Valid"
  }

}
