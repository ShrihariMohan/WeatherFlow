import { NgModule } from '@angular/core';
import { AlertComponent } from './component/alert.component';
import { AlertService } from './service/alert.service';
import { CommonModule } from '@angular/common';
import { ALERT_CONFIG } from './alert.config';
export class AlertModule {
    static forRoot(config) {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService,
                { provide: ALERT_CONFIG, useValue: config }
            ]
        };
    }
}
AlertModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AlertComponent
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    AlertComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFsZXJ0cy9zcmMvbGliL2FsZXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFjNUMsTUFBTSxPQUFPLFdBQVc7SUFDcEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUMvQixPQUFPO1lBQ0gsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7YUFDNUM7U0FDSixDQUFDO0lBQ04sQ0FBQzs7O1lBcEJKLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsY0FBYztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGNBQWM7aUJBQ2pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWxlcnRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50L2FsZXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQge0FsZXJ0U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL2FsZXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FMRVJUX0NPTkZJR30gZnJvbSAnLi9hbGVydC5jb25maWcnO1xuaW1wb3J0IHtBbGVydENvbmZpZ30gZnJvbSAnLi9tb2RlbC9hbGVydC1jb25maWcubW9kZWwnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBbGVydENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQWxlcnRDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0TW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBBbGVydENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWxlcnRNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbGVydE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIEFsZXJ0U2VydmljZSxcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogQUxFUlRfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==