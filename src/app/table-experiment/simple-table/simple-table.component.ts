import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tableType = params.type;
    });
  }

  ngOnInit(): void {
    this.configureTable();
  }

  configureTable = () => {

  }

}
