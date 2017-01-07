import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './AccordianWebpart.module.scss';
import * as strings from 'accordianWebpartStrings';
import { IAccordianWebpartWebPartProps } from './IAccordianWebpartWebPartProps';

//import external 3rd party libraries
import * as $ from 'jquery';
require('../../../node_modules/jquery-ui/ui/widgets/accordion');
require('../../../node_modules/jquery-ui/themes/base/core.css');
require('../../../node_modules/jquery-ui/themes/base/accordion.css');
require('../../../node_modules/jquery-ui/themes/base/theme.css');

//import environment type for implementing test stubs

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-client-base';

export default class AccordianWebpartWebPart extends BaseClientSideWebPart<IAccordianWebpartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.accordianWebpart}">
        <div class="accordion">
            <h3>Site Admins</h3>
              <div>
                <p>
                  The Volcanoes, crags, and caves park is a scenic destination for
                  many visitors each year. To ensure everyone has a good
                  experience and to preserve the natural beauty, access is
                  restricted based on a permit system.
                </p>
                <p>
                  Activities include viewing active volcanoes, skiing on mountains,
                  walking across lava fields, and caving (spelunking) in caves
                  left behind by the lava.
                </p>
              </div>
            <h3>User Groups</h3>
              <div>
                <p>
                List of all groups present in this site ${this.context.pageContext.web.title} - 
                </p>
                <div id="allGroupsInSite"></div>
              </div>
          <h3>Permission Levels</h3>
          <div>
            <p>
              The entire region has hiking trails for your enjoyment.
              Purchase a hiking permit for access to approved trails.
            </p>
          </div>
          <h3>Get all users of a group</h3>
            <div>
              <p>
                The volcanic region is beautiful but also dangerous. Each
                area may have restrictions based on wind and volcanic
                conditions. There are three type of permits based on activity.
              </p>
              <ul>
                <li>Volcano drive car pass</li>
                <li>Lava field access permit</li>
                <li>Caving permit</li>
              </ul>
            </div>
        </div>
      </div>`;
      ($('.accordion', this.domElement) as any).accordion();
      //getter
      var autoHeight = ($('.accordion', this.domElement) as any).accordion( "option", "autoHeight" );
      //setter
      ($('.accordion', this.domElement) as any).accordion( "option", "autoHeight", false );
      this._renderAllGroupsInsiteAsync();
  }

  private _getAllGroupsInSite() : Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/sitegroups`)
    .then((response : Response) => {
      return response.json();
    });
  }

  private _renderAllGroupsInsiteAsync() : void {
    //Local Environment
    if(Environment.type == EnvironmentType.Local) {
      //implement get groups from mock stubs
    }
    else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      //implement the actual get call to SharePoint
      this._getAllGroupsInSite()
      .then((response) => {
        this._renderAllGroupsInsite(response.value);
      })
    }
  }

  private _renderAllGroupsInsite(groups : any) : void {
    let html: string = '';
    groups.forEach((group: any) => {
      html += `
        <ul>
            <li>
                <span class="ms-font-l">${group.Title}</span>
            </li>
        </ul>`;
    });

    const listContainer: Element = this.domElement.querySelector('#allGroupsInSite');
    listContainer.innerHTML = html;
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
