import {ResultBrowserContract} from 'result/ResultBrowserContract';
import {ResultReleaseContract} from 'result/ResultReleaseContract';

export interface ResultContract {
    browsers: ResultBrowserContract,
    usage?: number,
    release_date?: ResultReleaseContract
}
