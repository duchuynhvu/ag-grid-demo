import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid', { static: false })
  agGrid!: AgGridAngular;

  title = 'my-app';

  defaultColDef = {
    sortable: true,
    filter: true
  }

  columnDefs = [
    { headerName: 'Make', field: 'make', rowGroup: true },
    { headerName: 'Price', field: 'price' },
  ];

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  }

  rowData: any;

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.make + ' ' + node.model)
      .join(', ');
    alert(`Selected Nodes: ${selectedDataStringPresentation}`);
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/row-data.json'
    );
  }
}
