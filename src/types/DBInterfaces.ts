export interface DownloadCSVProps<T extends Record<string, unknown>> {
    data: T[];
    fileName: string;
}