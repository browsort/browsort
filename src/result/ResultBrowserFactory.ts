import {ResultBrowserContract} from 'result/ResultBrowserContract';

export class ResultBrowserFactory {
    public static fromMdn(mdn: any): ResultBrowserContract {
        if (mdn !== undefined && mdn.__compat !== undefined && mdn.__compat.support !== undefined) {
            const compatibilityTable: any = {};
            Object.keys(mdn.__compat.support).forEach((browser) => {
                if (mdn.__compat.support[browser].added !== undefined) {
                    compatibilityTable[browser] = {
                        added: mdn.__compat.support[browser].added
                    };

                    if (mdn.__compat.support[browser].removed !== undefined) {
                        compatibilityTable[browser].removed = mdn.__compat.support[browser].removed;
                    }
                }
            });

            return compatibilityTable;
        }

        return {};
    }
}
