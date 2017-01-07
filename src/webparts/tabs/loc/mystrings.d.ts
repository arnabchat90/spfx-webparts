declare interface ITabsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'tabsStrings' {
  const strings: ITabsStrings;
  export = strings;
}
