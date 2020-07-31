import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SVG_ICON_REGISTRY_PROVIDER } from './svg-icon-registry.service';
import { SvgIconComponent } from './svg-icon.component';
import { SvgHttpLoader, SvgLoader } from './svg-loader';
export class AngularSvgIconModule {
    static forRoot(config = {}) {
        return {
            ngModule: AngularSvgIconModule,
            providers: [
                SVG_ICON_REGISTRY_PROVIDER,
                config.loader || { provide: SvgLoader, useClass: SvgHttpLoader }
            ]
        };
    }
}
AngularSvgIconModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    SvgIconComponent
                ],
                exports: [SvgIconComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zdmctaWNvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLXN2Zy1pY29uL3NyYy9saWIvYW5ndWxhci1zdmctaWNvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBZXhELE1BQU0sT0FBTyxvQkFBb0I7SUFFaEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUErQixFQUFFO1FBQy9DLE9BQU87WUFDTixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDViwwQkFBMEI7Z0JBQzFCLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDaEU7U0FDRCxDQUFDO0lBQ0gsQ0FBQzs7O1lBbkJELFFBQVEsU0FBQztnQkFDVCxPQUFPLEVBQUU7b0JBQ1IsWUFBWTtpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ2IsZ0JBQWdCO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUUsQ0FBRSxnQkFBZ0IsQ0FBRTthQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIgfSBmcm9tICcuL3N2Zy1pY29uLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ZnSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vc3ZnLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFN2Z0h0dHBMb2FkZXIsIFN2Z0xvYWRlciB9IGZyb20gJy4vc3ZnLWxvYWRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5ndWxhclN2Z0ljb25Db25maWcge1xuXHRsb2FkZXI/OiBQcm92aWRlcjtcbn1cblxuQE5nTW9kdWxlKHtcblx0aW1wb3J0czogW1xuXHRcdENvbW1vbk1vZHVsZSxcblx0XSxcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0U3ZnSWNvbkNvbXBvbmVudFxuXHRdLFxuXHRleHBvcnRzOiBbIFN2Z0ljb25Db21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3ZnSWNvbk1vZHVsZSB7XG5cblx0c3RhdGljIGZvclJvb3QoY29uZmlnOiBBbmd1bGFyU3ZnSWNvbkNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxBbmd1bGFyU3ZnSWNvbk1vZHVsZT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuZ01vZHVsZTogQW5ndWxhclN2Z0ljb25Nb2R1bGUsXG5cdFx0XHRwcm92aWRlcnM6IFtcblx0XHRcdFx0U1ZHX0lDT05fUkVHSVNUUllfUFJPVklERVIsXG5cdFx0XHRcdGNvbmZpZy5sb2FkZXIgfHwgeyBwcm92aWRlOiBTdmdMb2FkZXIsIHVzZUNsYXNzOiBTdmdIdHRwTG9hZGVyIH1cblx0XHRcdF1cblx0XHR9O1xuXHR9XG59XG4iXX0=