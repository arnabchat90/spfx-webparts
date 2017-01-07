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

export default class AccordianWebpartWebPart extends BaseClientSideWebPart<IAccordianWebpartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.accordianWebpart}">
        <div class="accordion">
            <h3>Information</h3>
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
            <h3>Snow permit</h3>
              <div>
                <p>
                The Northern region has snow in the mountains during winter.
                Purchase a snow permit for access to approved ski areas.
                </p>
              </div>
          <h3>Hiking permit</h3>
          <div>
            <p>
              The entire region has hiking trails for your enjoyment.
              Purchase a hiking permit for access to approved trails.
            </p>
          </div>
          <h3>Volcano access</h3>
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
