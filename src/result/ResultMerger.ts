import {ResultBrowserContract} from 'result/ResultBrowserContract';

export class ResultMerger {
    /**
     * Get minimum browsers requirements
     * @param {ResultBrowserContract[]} browsers
     */
    public static browsers(browsers: ResultBrowserContract[]): ResultBrowserContract {
        let output: ResultBrowserContract;

        if (browsers.length > 0) {
            output = browsers.reduce((accumulator, result) => {
                Object.keys(result).forEach((browser: string) => {
                    if (accumulator[browser] === undefined) {
                        accumulator[browser]  = result[browser];
                    }
                });

                Object.keys(accumulator).forEach((browser: string) => {
                    if (result[browser] !== undefined) {
                        if (result[browser] === null) {
                            accumulator[browser] = null;
                        } else if (accumulator[browser] !== null) {
                            if (accumulator[browser].removed !== undefined && result[browser].removed !== undefined) {
                                if (result[browser].removed <= accumulator[browser].added || result[browser].added >= accumulator[browser].removed) {
                                    accumulator[browser] = null;
                                } else {
                                    accumulator[browser].added = Math.max(accumulator[browser].added, result[browser].added);
                                    accumulator[browser].removed = Math.min(accumulator[browser].removed, result[browser].removed);
                                }
                            } else if (accumulator[browser].removed !== undefined && result[browser].removed === undefined) {
                                if (result[browser].added >= accumulator[browser].removed) {
                                    accumulator[browser] = null;
                                } else if (result[browser].added > accumulator[browser].added) {
                                    accumulator[browser].added = result[browser].added;
                                }
                            } else if (accumulator[browser].removed === undefined && result[browser].removed !== undefined) {
                                accumulator[browser].removed = result[browser].removed;

                                if (accumulator[browser].added >= result[browser].removed) {
                                    accumulator[browser] = null;
                                } else if (accumulator[browser].added > result[browser].added) {
                                    accumulator[browser].removed = result[browser].removed;
                                } else {
                                    accumulator[browser].added = result[browser].added;
                                    accumulator[browser].removed = result[browser].removed;
                                }
                            } else {
                                if (result[browser].added > accumulator[browser].added) {
                                    accumulator[browser].added = result[browser].added;
                                }
                            }
                        }
                    }
                });

                return accumulator;
            }, browsers[0]);
        }

        return output;
    }
}
