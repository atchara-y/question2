import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-data-table',
  templateUrl: './display-data-table.component.html',
  styleUrls: ['./display-data-table.component.css'],
})
export class DisplayDataTableComponent implements OnInit {
  initialDataTable;
  dataTable;
  currentInputText;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('https://api.publicapis.org/categories').subscribe((res) => {
      this.initialDataTable = res;
      this.dataTable = this.initialDataTable;
    });
  }

  onFilter(event) {
    const inputText = event.target.value;
    this.currentInputText = inputText;
    const filter = this.dataTable.filter((value) =>
      value.toLowerCase().includes(inputText)
    );
    if (filter.length !== 0) {
      this.dataTable = filter;
    }
    if (!inputText) {
      this.dataTable = this.initialDataTable;
    }
  }
}
