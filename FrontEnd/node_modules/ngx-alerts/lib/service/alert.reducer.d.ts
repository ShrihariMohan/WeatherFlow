import { AlertConfig } from '../model/alert-config.model';
import { Alert } from '../model/alert.model';
export declare class AlertReducer {
    static reduce(state: Alert[], action: {
        fn: Function;
        alert: Alert;
        config: AlertConfig;
    }): Alert[];
    static add(state: Alert[], params: {
        alert: Alert;
        config: AlertConfig;
    }): Alert[];
    static remove(state: Alert[], params: {
        alert: Alert;
        config: AlertConfig;
    }): Alert[];
}
