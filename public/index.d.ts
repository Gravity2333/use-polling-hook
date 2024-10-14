type PollingParams = {
    pollingFn: (arg: any) => Promise<any>;
    params?: any;
    interval: number;
};
/** 轮巡hook */
export default function usePolling({ 
/** 重复调用Fn 需要结合useCallback来保证pollFn不变易提升性能 */
pollingFn, 
/** 参数 */
params, interval, }: PollingParams): [boolean, () => void];
export {};
