import {RunSettingsContract} from 'main/RunSettingsContract';
import {ResultContract} from 'result/ResultContract';

export interface BrowsortContract {
    run(settings: RunSettingsContract): Promise<ResultContract>;
}
