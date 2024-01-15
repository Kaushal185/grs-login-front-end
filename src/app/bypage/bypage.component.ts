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
  pageIndex = 0;
  pageSize = 20;
  accounts: any = [];
  arr:any = [];
  ngOnInit(): void {
    console.log("ngOnInit");
    this.loadData();
    this.route.parent?.params.subscribe((params) => {
      // Retrieve the 'username' parameter from the parent route
      const username = params['username'];

      // Now you can use the 'username' variable as needed in your component logic
      console.log('Parent Route Username:', username);
    });
  }
  loadData(pageEvent?: any): void {
    this.fieldsService.fetchAccountsByPage(this.pageIndex, this.pageSize).subscribe(
      (data: any[]) => {
        this.accounts = data;
        console.log(this.accounts.content);

        for(let i=0;i<data.length;i++){
          // this.arr.push(this.accounts.content[i]);
        }
        this.dataSource.data = this.accounts.content;
        // console.log(this.arr);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  next():void{
    this.pageIndex += 1;
    this.loadData();
  }
  prev():void{
    this.pageIndex -= 1;
    this.loadData();
  }
  ngAfterViewInit(): void {
    console.log("ngAfterView");
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
