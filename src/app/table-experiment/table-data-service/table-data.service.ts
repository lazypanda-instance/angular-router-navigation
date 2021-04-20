import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TableConstant } from 'src/app/mat-table-ui/constant';
import { TableData } from '../app-types';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  tableDataFromAPI: Array<TableData>;
  tableConfiguration = TableConstant.tableConfig;

  constructor(public http: HttpClient) { }

  getTableData(): Observable<Array<TableData>> {
    if (this.tableDataFromAPI) {
      return of(this.tableDataFromAPI);
    }

    return this.http.get<Array<TableData>>('assets/data-source.json').pipe(
      tap((resp) => this.tableDataFromAPI = resp)
    );
  }
}
