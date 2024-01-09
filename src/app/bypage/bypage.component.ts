import { Component,OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-bypage',
  templateUrl: './bypage.component.html',
  styleUrls: ['./bypage.component.css']
})
export class BypageComponent {
constructor(private fieldsService:FieldsService, private router:Router, private route:ActivatedRoute){}
  displayedColumns: string[] = ['id', 'messageType', 'status', 'createdOn', 'updatedOn'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  accounts: any = [];
  ngOnInit(): void {
    console.log("ngOnInit");
    this.loadData();
    // this.fieldsService.fetchAccountsByPage(0,10).subscribe(
    //   (data: any[]) => {
    //     this.accounts = data;
    //     this.dataSource.data = this.accounts.content;
    //     console.log(this.dataSource);
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    this.route.parent?.params.subscribe((params) => {
      // Retrieve the 'username' parameter from the parent route
      const username = params['username'];

      // Now you can use the 'username' variable as needed in your component logic
      console.log('Parent Route Username:', username);
    });
  }
  loadData(pageEvent?: any): void {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 16;
    const pageSize = pageEvent ? pageEvent.pageSize : 30;

    this.fieldsService.fetchAccountsByPage(pageIndex, pageSize).subscribe(
      (data: any[]) => {
        this.accounts = data;
        this.dataSource.data = this.accounts.content;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    console.log("ngAfterView");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(filterValue: string): void {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  redirect(id: string) {
    this.router.navigate(['home',id,'message']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
