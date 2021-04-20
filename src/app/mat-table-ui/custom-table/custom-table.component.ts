import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource} from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  @ViewChild('MatTable') table: MatTable<any>;

  @Input() tableConfig: any;
  @Input() data: Observable<any>;
  @Input() preSelection: Array<any>;
  @Input() isSingleDelete: boolean;

  @Output() searchCount: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteAll?: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedItem?: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionItem?: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedRow: EventEmitter<object> = new EventEmitter<object>();
  @Output() updatedData: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filterInput') public userInput: ElementRef;

  isUserInteractionDisabled: boolean;
  isDisableUIControls: boolean;
  isSearchShow: boolean;
  isSearchActive: Observable<boolean>;
  public inActiveSearchSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  componentRef: any;

  displayedColumns: any[] = [];
  cloumnsData: string[] = [];

  tableDataSource: any[] = [];
  dataSource: MatTableDataSource<any>;

  isSelectAll: boolean;
  isEachRowSelect: boolean;
  selection = new SelectionModel<any>(true, []);
  sortEnabledHeaders: string[] = [];

  isDelete: boolean;
  deleteObserver: Observable<boolean>;
  private isEnableDelete: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isPaginationDisable: boolean;
  numberOfPage: number;
  itemPerPage: number;
  currentPage = 1;
  numberOfPageArray: any[] = [];
  isAsc: boolean;
  actionItems: any[] = [];

  tabledataSource: any[] = [];

  currentColumnName: string;

  constructor() { }

  ngOnInit(): void {
    this.deleteObserver = this.isEnableDelete.asObservable().pipe(delay(0));
    this.isSearchActive = this.inActiveSearchSubject.asObservable().pipe(delay(0));

    this.initializeTableForDeleteAndSelection();
    this.initializeTableDataSource();
    this.initializeTableHeaders();
    if (this.preSelection) {
      this.toggleCheckbox(this.preSelection);
    }
  }

  toggleCheckbox(preSelection: any): void {
    this.dataSource.data.forEach(row => {
      preSelection.find(data => {
        if (data && data.hasOwnProperty('id') && data.id === row.id) {
          this.selection.select(row);
        }
      });
    });
  }

  private isActiveData(rowObject: any): boolean {
    if (rowObject) {
      return true;
    }
    return false;
  }

  isDisabled(rowData?: any): boolean {
    if (this.isUserInteractionDisabled) {
      return true;
    }

    if (this.isDisableUIControls) {
      return true;
    }

    if (rowData && this.isActiveData(rowData)) {
      return rowData.isInActive;
    }

    return false;
  }

  getStyle(row: any): any {
    if (row && row.isInActive) {
      return {
        background: 'rgba(0,125,186,0.08)'
      };
    } else if (row && row.status === 'inactive') {
      return {
        background: 'rgba(246,0,63,0.08)'
      };
    }
  }

  /**
   * Configure Select All, Delete options for table
   */
  initializeTableForDeleteAndSelection(): void {
    this.isUserInteractionDisabled = this.tableConfig.disableUserInteraction;
    this.isDisableUIControls = this.tableConfig.disableUIControl;
    this.isSearchShow = this.tableConfig.search;
    this.isDelete = this.tableConfig.delete;
    this.isSelectAll = this.tableConfig.checkbox;
    this.isEachRowSelect = this.tableConfig.selectAllCheckBox;
    if (this.isSelectAll) {
      this.cloumnsData.push('select');
    }
  }

  initializeTableDataSource(): void {
    this.actionItems = this.tableConfig.actionItems;
    this.itemPerPage = this.tableConfig.numberOfItemPerPage;

    this.data.subscribe(item => {
      this.tableDataSource = Object.assign(item);
      this.tabledataSource = this.tableDataSource;
      if (!this.dataSource) {
        this.dataSource = new MatTableDataSource<any>(this.populateTable(this.tableDataSource));
      } else {
        this.selectedPage(this.currentPage, true);
        if (this.selection.selected.length > 0) {
          this.selection.clear();
          this.isEnableDelete.next(false);
        }
      }

      this.initializeTableForPagination(this.tableDataSource, this.currentPage);
    });
  }

  initializeTableHeaders(): void {
    this.displayedColumns = this.tableConfig.headers;
    this.tableConfig.headers.map((item: any) => {
      this.cloumnsData.push(item.columnName);
      if (item.sorting) {
        this.sortEnabledHeaders.push(item.columnName);
      }
    });
  }

  initializeTableForPagination(tableDataArray: Array<any>, selectedPage: number): void {
    this.numberOfPage = (tableDataArray) ? this.getNumberOfPage(tableDataArray.length)
      : 0;
    if (this.numberOfPage === Infinity || this.numberOfPage < 2) {
      this.isPaginationDisable = true;
    } else {
      this.isPaginationDisable = false;
    }

    this.numberOfPageArray = [];
    for (let index = 1; index <= this.numberOfPage; index++) {
      this.numberOfPageArray.push({
        page: index,
        selection: (index === selectedPage) ? true : false
      });
    }
  }

  getNumberOfPage(dataSourceCount: number): number {
    const numberOfPage = Math.ceil(dataSourceCount / this.itemPerPage);
    return numberOfPage;
  }

  enabledSortingForColumn(columnName: string): string {
    const column = this.sortEnabledHeaders.filter((cln) => cln === columnName);
    if (column.length === 1) {
      return column[0];
    }

    return null;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
      });
  }

  checkboxLabel(row?: any): string {
    this.enableOrDisableDelete();
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  enableOrDisableDelete(): void {
    if (this.selection.selected.length > 1 && this.isSingleDelete) {
      this.isEnableDelete.next(false);
    } else if (this.selection.selected.length > 0) {
      this.isEnableDelete.next(true);
    } else {
      this.isEnableDelete.next(false);
    }

    this.selectedItem.emit({
      data: this.selection.selected,
      page: this.currentPage
    });
  }

  removeSelectItems(): void {
    this.deleteAll.emit({
      data: this.selection.selected
    });
  }

  selectedPage(selectedIndex: any, isDeleteOperation?: boolean): void {
    let dataSet: Array<any>;
    if (!isDeleteOperation) {
      this.updatePageSelection(selectedIndex);
      this.currentPage = selectedIndex.page;
    } else {
      if (this.numberOfPageArray.length === 0) {
        this.initializeTableForPagination(this.tableDataSource, this.currentPage);
      }

      const dataArray = this.populateTable(this.tableDataSource);
      if (dataArray.length === 0 && this.currentPage !== 1) {
        this.currentPage -= 1;
      }

      const crntPage = this.numberOfPageArray[this.currentPage - 1];
      crntPage.page = this.currentPage;
      this.updatePageSelection(crntPage);
    }

    dataSet = this.populateTable(this.tableDataSource);
    this.dataSource.data = [];
    setTimeout(() => {
      this.dataSource.data = dataSet;
    });
    this.table.renderRows();

    setTimeout(() => {
      if (this.preSelection) {
        this.toggleCheckbox(this.preSelection);
      }
    }, 500);
  }

  private updatePageSelection(selectedItem: any): void {
    this.numberOfPageArray.map((item) => {
      (item.page === selectedItem.page) ? item.selection = true :
        item.selection = false;
    });
  }

  populateTable(tableData: any[]): any[] {
    const begin = ((this.currentPage - 1) * this.itemPerPage);
    const end = begin + this.itemPerPage;

    return tableData.slice(begin, end);
  }

  sortDataSource(data: Array<any>, isAscending: boolean, columnName: any, sortType: string): Array<any> {
    if (columnName === 'date') {
      return data.sort((a, b) => {
        if (isAscending) {
          return (new Date(a.createdDateWithTime) as any) - (new Date(b.createdDateWithTime) as any);
        } else {
          return (new Date(b.createdDateWithTime) as any) - (new Date(a.createdDateWithTime) as any);
        }
      });
    } else {
      return data.sort((a, b) => {
        const aCol = (a[columnName] === undefined) ? '' : ((sortType === 'number') ? Number(a[columnName]) : a[columnName].toLowerCase());
        const bCol = (b[columnName] === undefined) ? '' : ((sortType === 'number') ? Number(b[columnName]) : b[columnName].toLowerCase());

        if (isAscending) {
          return (aCol > bCol ? 1 : -1);
        } else {
          return (aCol > bCol ? -1 : 1);
        }
      });
    }
  }

  headerClick(columnName: string, sortType: string = 'string'): void {
    if (this.dataSource.data.length === 1) {
      return;
    }

    if (this.currentColumnName === columnName) {
      this.isAsc = !this.isAsc;
    } else {
      this.isAsc = true;
    }
    this.currentColumnName = columnName;

    const column = this.sortEnabledHeaders.filter((cln) => cln === columnName);

    if (column.length === 1) {
      const sortedArray = this.sortDataSource(this.tableDataSource, this.isAsc, columnName, sortType);
      this.dataSource.data = this.populateTable(sortedArray);
    }
  }

  searchOnTable(): void {
    setTimeout(() => {
      const userInputHTMLElement: HTMLElement = this.userInput.nativeElement;
      userInputHTMLElement.focus();
    }, 100);
    this.inActiveSearchSubject.next(true);
  }

  closeSearch(): void {
    this.preSelection = this.selection.selected;
    this.searchCount.emit(this.tabledataSource.length);
    this.tableDataSource = Object.assign(this.tabledataSource);
    this.dataSource = new MatTableDataSource<any>(this.populateTable(this.tabledataSource));
    this.initializeTableForPagination(this.tableDataSource, this.currentPage);
    setTimeout(() => {
      this.toggleCheckbox(this.preSelection);
    }, 100);

    this.inActiveSearchSubject.next(false);
  }

  getAction(actionName, rowData): void {
    const actionObj = {
      type: this.tableConfig.type,
      actionName,
      data: rowData
    };
    this.actionItem.emit(actionObj);
  }

  getRecord(rowRecord: object): void {
    this.selectedRow.emit(rowRecord);
  }

  searchQueryOnDataSource($event): void {
    this.tableDataSource = this.tabledataSource;
    this.doQuerySearch(this.tableDataSource, $event.target.value);
  }

  private doQuerySearch(dataArray: Array<any>, queryString: string): void {
    const newList = dataArray.filter(element => {
      for (const property in element) {
          if (element.hasOwnProperty(property) && this.cloumnsData.includes(property)) {
              if (!Array.isArray(element[property]) && (typeof element[property] !== 'boolean')
                  && element[property] && element[property].toLowerCase().includes(queryString.toLowerCase())) {
                  return true;
              }
          }
      }
    });
    this.currentPage = 1;
    this.searchCount.emit(newList.length);
    this.tableDataSource = Object.assign(newList);
    this.dataSource = new MatTableDataSource<any>(this.populateTable(newList));
    this.initializeTableForPagination(this.tableDataSource, this.currentPage);
    setTimeout(() => {
      this.preSelection = this.selection.selected;
      this.toggleCheckbox(this.preSelection);
    }, 100);
  }
}
