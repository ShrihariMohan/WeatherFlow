import { Alert } from '../model/alert.model';
import { Observable } from 'rxjs';
import { AlertConfig } from '../model/alert-config.model';
export declare class AlertService {
    private config;
    private dispatcher;
    private state;
    constructor(config: AlertConfig);
    private initConfig;
    get messages(): Observable<Alert[]>;
    info(msg: string | {
        html: string;
    }): void;
    danger(msg: string | {
        html: string;
    }): void;
    success(msg: string | {
        html: string;
    }): void;
    warning(msg: string | {
        html: string;
    }): void;
    close(alert: Alert): void;
    private addAlert;
}
