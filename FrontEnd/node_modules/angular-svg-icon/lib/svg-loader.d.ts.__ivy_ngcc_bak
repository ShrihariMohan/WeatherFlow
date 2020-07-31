import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export declare abstract class SvgLoader {
    abstract getSvg(url: string): Observable<string>;
}
export declare class SvgHttpLoader extends SvgLoader {
    private http;
    constructor(http: HttpClient);
    getSvg(url: string): Observable<string>;
}
