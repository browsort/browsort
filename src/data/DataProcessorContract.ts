export interface DataProcessorContract {
    process(): Promise<void>;
}
