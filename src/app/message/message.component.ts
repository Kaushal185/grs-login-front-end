import { Component, OnInit,} from '@angular/core';
import { FieldsService } from '../fields.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  accounts:any = [];
  jsonMessage:any = [];
  globId = '';
  user = '';
  startIndex:number = 0;
  endIndex:number = 0;
  constructor(private fieldsService:FieldsService,private route: ActivatedRoute){}
  ngOnInit(): void {
    // Get the ID from the URL parameter
    this.route.params.subscribe((params) => {
      const id = params['id']; // Assuming 'id' is the parameter name in your route
      const name = params['username'];
      this.user = name;
      this.globId = id;
      if (id) {
        this.fetchAccountById(id);
      }
    });
  }
  fetchAccountById(id: string) {
    console.log("my id is ");
    console.log(id);
    this.fieldsService.fetchOnlyTwoAccountById(id).subscribe(
      (data: any) => {
        // console.log(`Fetched account for ID ${id}:`, data);
        // this.jsonMessage = data;
        this.accounts = data;
        this.jsonMessage[0] = data[0].message;
        this.jsonMessage[1] = data[1].message;
        console.log(this.accounts.length);
        if(this.accounts.length == 3){
          console.log(this.accounts[2]);
          let x = this.accounts[2].message;
          let substrings: string[] = x.split('$');
          let final: string = this.accounts[1].message.substring(substrings[0],substrings[1]);
          console.log(final);
          this.startIndex = parseInt(substrings[0]);
          this.endIndex = parseInt(substrings[1]);
        }

      },
      (error) => {
        console.error(`Error fetching account for ID ${id}:`, error);
      }
    );
  }

}
