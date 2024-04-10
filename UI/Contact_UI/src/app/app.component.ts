import { Component, OnInit } from '@angular/core';
import { DataService } from './Services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(public data:DataService){}
  title = 'Contact_UI';
  ngOnInit(): void {
    
  }
}
