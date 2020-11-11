export interface ResultReleaseContract {
    [browserName: string]: {from: string, to?: string},
    android_chrome?: {from: string, to?: string},
    android_firefox?: {from: string, to?: string},
    android_opera?: {from: string, to?: string},
    android_samsung?: {from: string, to?: string},
    android_webview?: {from: string, to?: string},
    chrome?: {from: string, to?: string},
    edge?: {from: string, to?: string},
    firefox?: {from: string, to?: string},
    ie?: {from: string, to?: string},
    ios_safari?: {from: string, to?: string},
    nodejs?: {from: string, to?: string},
    opera?: {from: string, to?: string},
    safari?: {from: string, to?: string}
}
