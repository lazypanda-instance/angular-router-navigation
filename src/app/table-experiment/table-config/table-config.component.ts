import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../_animations/index';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableConstant } from 'src/app/mat-table-ui/constant';
import { TableDataService } from '../table-data-service/table-data.service';
import { TableForm } from './form-model/table-form.model';

@Component({
  selector: 'app-table-config',
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.scss'],
  animations: [slideInOutAnimation],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[@slideInOutAnimation]': '' }
})
export class TableConfigComponent implements OnInit {
  isSideBarOpen: boolean;
  configureTableForm: FormGroup;
  noOfPageDataSource = TableConstant.noOfRowPerPage;
  defaultConfigurations = TableConstant.defaultTablePropertyConfiguration;


  constructor(private location: Location,
              public formBuilder: FormBuilder,
              private tableDataService: TableDataService) { }

  ngOnInit(): void {
    this.configureTableForm = TableForm.initFormConfig(this.formBuilder);
  }

  // tslint:disable-next-line:typedef
  get configurations() {
    return this.configureTableForm.get('defaultConfiguration') as FormArray;
  }

  addMoreData(): void {
    this.tableDataService.tableDataFromAPI = this.tableDataService.tableDataFromAPI.concat(this.tableDataService.tableDataFromAPI);
  }

  navigateToBack(): void {
    const tableFormData = this.configureTableForm.getRawValue();

    this.tableDataService.tableConfiguration.numberOfItemPerPage = (tableFormData !== '') ? tableFormData.noOfItemPerPage : 10;
    this.tableDataService.tableConfiguration.checkbox = tableFormData.defaultConfiguration[0];
    this.tableDataService.tableConfiguration.selectAllCheckBox = tableFormData.defaultConfiguration[1];
    this.tableDataService.tableConfiguration.delete = tableFormData.defaultConfiguration[2];
    this.tableDataService.tableConfiguration.search = tableFormData.defaultConfiguration[3];
    this.tableDataService.tableConfiguration.disableUserInteraction = tableFormData.defaultConfiguration[4];

    this.location.back();
  }

}
