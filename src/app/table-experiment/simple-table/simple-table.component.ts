import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TableConstant } from 'src/app/mat-table-ui/constant';
import { TableData } from '../app-types';
import { TableDataService } from '../table-data-service/table-data.service';
import { fadeInAnimation } from '../_animations/index';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  animations: [fadeInAnimation],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@fadeInAnimation]': '' }
})
export class SimpleTableComponent implements OnInit {
  tableType: string;
  isOpen = true;

  // table
  config: any;
  count: number;
  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private route: ActivatedRoute, private tableDataService: TableDataService) {
    this.route.queryParams.subscribe(params => {
      this.tableType = params.type;
    });
  }

  ngOnInit(): void {
    this.tableDataService.getTableData().subscribe(res => {
      this.configureTableData(res);
    });
  }

  configureTableData(tableData: Array<TableData>): void {
    this.config = this.tableDataService.tableConfiguration;

    this.dataSource.next(tableData);
    this.count = tableData.length;
    this.config = this.config;
  }

  selectedTableRowData(row): void {
    alert(`Selected:  ${JSON.stringify(row)}`);
  }

  deleteSelectedItems(event: any): void {
    if (event.data.length) {
      const deleteObj = {
        deleteData: event.data
      };

      alert(`Deleted:  ${JSON.stringify(deleteObj)}`);
    }
  }

  updateSearchCount(event: number): void {
    this.count = event;
  }
}
