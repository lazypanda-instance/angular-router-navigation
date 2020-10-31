import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-various-table-menu',
  templateUrl: './various-table-menu.component.html',
  styleUrls: ['./various-table-menu.component.scss']
})
export class VariousTableMenuComponent implements OnInit {
  public menus = [
    {
      title: 'Material Table with Angular',
      navigation: 'simple-table',
      queryParam: 'simple-table'
    },
    {
      title: 'Select All feature',
      navigation: 'table-with-select-all',
      queryParam: 'select-all'
    },
    {
      title: 'Multiple page feature',
      navigation: 'table-with-multiple-page',
      queryParam: 'multiple-page'
    },
    {
      title: 'Row highlight feature',
      navigation: 'table-with-highlight',
      queryParam: 'highlight'
    },
    {
      title: 'Custom Control feature',
      navigation: 'table-with-custom-control',
      queryParam: 'custom-control'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
