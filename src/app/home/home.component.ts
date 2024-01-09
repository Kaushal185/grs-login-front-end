import { Component,OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  constructor(private fieldsService:FieldsService, private router:Router, private route:ActivatedRoute){}
  displayedColumns: string[] = ['id', 'messageType', 'status', 'createdOn', 'updatedOn'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  accounts: any = [];
  username = '';
  ngOnInit(): void {
    console.log("ngOnInit");
    this.fieldsService.fetchAccounts().subscribe(
      (data: any[]) => {
        this.accounts = data;
        this.dataSource.data = data;
        console.log('data fetched');
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.route.params.subscribe((params) => {
      // Retrieve the 'username' parameter from the parent route
      this.username = params['username'];

      // Now you can use the 'username' variable as needed in your component logic
      console.log('Parent Route Username:', this.username);
    });
  }
  ngAfterViewInit(): void {
    console.log("ngAfterView");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  redirect(id: string) {
    this.router.navigate(['home',this.username,id,'message']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
