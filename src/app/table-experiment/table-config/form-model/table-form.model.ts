import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TableConstant } from 'src/app/mat-table-ui/constant';

export class TableForm {
  static noOfItemPageArray: any = TableConstant.noOfRowPerPage;
  noOfItemPerPage: number;

  defaultConfiguration: any;

  constructor() { }

  static initFormConfig(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      noOfItemPerPage: [5],
      defaultConfiguration: TableForm.createDefaultControl(TableConstant.defaultTablePropertyConfiguration, formBuilder),
    });
  }

  static createDefaultControl = (defaultInputs: Array<any>, formBuilder: FormBuilder) => {
    const arr = defaultInputs.map(input => {
      return formBuilder.control(input.selected || false);
    });
    return formBuilder.array(arr);
  }
}
