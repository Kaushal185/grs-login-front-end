import { Component,OnInit } from '@angular/core';
import { FieldsService } from '../fields.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  constructor(private fieldsService:FieldsService){}
  displayedColumns: string[] = ['id', 'messageType', 'status', 'createdOn', 'updatedOn', 'message'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  accounts: any = [];
  ngOnInit(): void {
    this.fieldsService.fetchAccounts().subscribe(
      (data: any[]) => {
        this.accounts = data;
        this.dataSource.data = data;
        console.log("namaste india");
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
