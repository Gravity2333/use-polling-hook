import { useEffect } from 'react';
import type { UseVariableParams } from 'use-variable-hook';
import useVariable from 'use-variable-hook';
import useDeepEffect from './hooks/useDeepEffect';
import { createUpdateKeyGenerator } from './utils/update';

const updateKeyGenerator = createUpdateKeyGenerator();

const PollingVariables: UseVariableParams = {
  variables: {
    pollingLoading: false,
    oldDependency: [],
    intervalInstance: null,
    updateKey: updateKeyGenerator(),
  },
  reducers: {
    polling(store, { payload: { params, pollingFn, interval } }) {
      /** clear当前计时器 */
      if (store.intervalInstance) {
        clearInterval(store.intervalInstance);
        store.intervalInstance = null;
        store.pollingLoading = false;
      }
      store.pollingLoading = true;
      const pollingTask = () => {
        (pollingFn(params) as Promise<any>).finally(() => {
          if (store.pollingLoading === true) {
            store.pollingLoading = false;
          }
        });
      };
      pollingTask();
      store.intervalInstance = setInterval(pollingTask, interval);
    },
    cancelPolling(store) {
      clearInterval(store.intervalInstance);
    },
  },
};

type PollingvariableType = {
  pollingLoading: boolean;
  oldDependency: any[];
  intervalInstance: NodeJS.Timer;
  updateKey: number;
};

/** 轮巡hook */
export default function usePolling({
  /** 重复调用Fn 需要结合useCallback来保证pollFn不变易提升性能 */
  pollingFn,
  /** 参数 */
  params = {},
  // 默认1s查询一次
  interval = 1000,
}: {
  // 查询函数
  pollingFn: (...args: any[]) => Promise<any>;
  // 参数
  params?: any;
  interval: number;
}) {
  const [store, dispatch] = useVariable<PollingvariableType>(PollingVariables);

  useDeepEffect(() => {
    /** 重新设置计时器 */
    dispatch({
      type: 'polling',
      payload: {
        params,
        pollingFn,
        interval,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, params, pollingFn, store.updateKey]);

  useEffect(
    () => () => {
      dispatch({ type: 'cancelPolling' });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [
    store.pollingLoading,
    () => {
      store.updateKey = updateKeyGenerator();
    },
  ] as [boolean, () => void];
}
