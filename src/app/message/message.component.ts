import { Component, OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  accounts:any = [];
  jsonMessage: string = '';
  constructor(private fieldsService:FieldsService,private route: ActivatedRoute){}
  ngOnInit(): void {
    // Get the ID from the URL parameter
    this.route.params.subscribe((params) => {
      const id = params['id']; // Assuming 'id' is the parameter name in your route
      if (id) {
        this.fetchAccountById(id);
      }
    });
  }
  fetchAccountById(id: string) {
    console.log("my id is ");
    console.log(id);
    this.fieldsService.fetchAccountById(id).subscribe(
      (data: any) => {
        // console.log(`Fetched account for ID ${id}:`, data);
        console.log(data);
        this.jsonMessage = data.message;
        // Do something with the fetched data, e.g., assign it to a property
      },
      (error) => {
        console.error(`Error fetching account for ID ${id}:`, error);
      }
    );
  }
}
