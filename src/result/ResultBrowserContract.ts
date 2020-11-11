export interface ResultBrowserContract {
    [browserName: string]: {added: number, removed?: number},
    android_chrome?: {added: number, removed?: number},
    android_firefox?: {added: number, removed?: number},
    android_opera?: {added: number, removed?: number},
    android_samsung?: {added: number, removed?: number},
    android_webview?: {added: number, removed?: number},
    chrome?: {added: number, removed?: number},
    edge?: {added: number, removed?: number},
    firefox?: {added: number, removed?: number},
    ie?: {added: number, removed?: number},
    ios_safari?: {added: number, removed?: number},
    nodejs?: {added: number, removed?: number},
    opera?: {added: number, removed?: number},
    safari?: {added: number, removed?: number}
}
