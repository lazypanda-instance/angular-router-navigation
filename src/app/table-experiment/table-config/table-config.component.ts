import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../_animations/index';
import { Location } from '@angular/common';

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

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  navigateToBack(): void {
    this.location.back();
  }

}
