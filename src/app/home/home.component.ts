import { Component,OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  constructor(private fieldsService:FieldsService){}
  accounts: any = [];
  ngOnInit(): void {
    this.fieldsService.fetchAccounts().subscribe(
      (data: any[]) => {
        this.accounts = data;
        console.log("namaste india");
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
