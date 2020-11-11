import {ResultContract} from 'result/ResultContract';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

export interface StatCalculatorContract {
    calculate(browserCompatibility: ResultBrowserContract): ResultContract;
}
