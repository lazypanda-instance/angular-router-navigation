export class TableConstant {

  private static columnType = ['text', 'html', 'image'];

  public static tableConfig = {
    type: 'simple_table',
    headers: [
      {
        title: 'COMPANY',
        columnName: 'company',
        sorting: true,
        width: '161px',
        isBold: true,
        columnType: TableConstant.columnType[0],
      },
      {
        title: 'OS',
        columnName: 'os',
        sorting: false,
        width: '160px',
        isBold: false,
        columnType: TableConstant.columnType[0],
      },
      {
        title: 'WEBSITE',
        columnName: 'website',
        sorting: false,
        width: '200px',
        isBold: true,
        columnType: TableConstant.columnType[1],
      },
      {
        title: 'LOGO',
        columnName: 'logo',
        sorting: false,
        width: '100px',
        isBold: false,
        columnType: TableConstant.columnType[2],
      }
    ],
    checkbox: true,
    selectAllCheckBox: false,
    delete: false,
    numberOfItemPerPage: 5,
    search: true,
    dataSource: [],
    characterCount: {
      datatype: 25,
      comments: 50
    },
    imagePath: 'path',
    disableUserInteraction: false
  };

  public static noOfRowPerPage = [5, 10, 15, 20, 30, 50];
  public static defaultTablePropertyConfiguration = [
    {
      title: 'Enable Checkbox for Each Row',
      selected: true
    },
    {
      title: 'Enable Select All',
      selected: true
    },
    {
      title: 'Enable Row Deletion',
      selected: true
    },
    {
      title: 'Enable Table Data Search',
      selected: true
    },
    {
      title: 'Enable / Disable User Interaction',
      selected: false
    }
  ];
}
