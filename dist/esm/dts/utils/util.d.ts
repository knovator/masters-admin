export declare const debounce: (callback: (param?: any) => void, wait?: number) => (...parameters: any) => void;
export declare const capitalizeFirstLetter: (string?: string) => string;
export declare const changeToCode: (string?: string) => string;
export declare const isObject: (data: any) => boolean;
export declare const isString: (data: any) => boolean;
export declare const isArray: (data: any) => boolean;
export declare const isEmpty: (data: any) => boolean;
export declare const build_path: (...args: string[]) => string;
export declare function createTranslation(t: TFunc | undefined, obj: Record<string, string>): (key: string) => string;
