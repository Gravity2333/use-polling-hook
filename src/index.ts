import { useEffect } from 'react';
import type { UseVariableParams } from 'use-variable-hook';
import useVariable from 'use-variable-hook';
import useDeepEffect from './hooks/useDeepEffect';
import { generateUUID } from './utils/unique';
import { createUpdateKeyGenerator } from './utils/update';
import type {StoreObject} from 'use-variable-hook'

type PollingvariableType = {
  pollingLoading: boolean;
  oldDependency: any[];
  updateKey: number;
};

type PollingParams = {
  // 查询函数
  pollingFn: (arg: any) => Promise<any>;
  // 参数
  params?: any;
  interval: number;
};

const updateKeyGenerator = createUpdateKeyGenerator();

const PollingVariablesCreator = () => {
  /** 计时器实例 */
  let timerInstance: any = null;
  /** 请求函数返回的promise */
  let pollingTaskPromise: any = null;
  /**当前任务Key */
  let currentTaskKey: string = '';
  /** 运行task */
  function _runTask(_store: StoreObject, { params, pollingFn, interval }: PollingParams) {
    if (timerInstance) {
      clearTimeout(timerInstance);
      timerInstance = null;
      _store.pollingLoading = false;
    }
    _store.pollingLoading = true;

    const taskKey = generateUUID();
    currentTaskKey = taskKey;

    const _pollingTask = () => {
      pollingTaskPromise = (pollingFn(params) as Promise<any>).finally(() => {
        const dirty = taskKey !== currentTaskKey;
        if (!dirty) {
          if (_store.pollingLoading === true) {
            _store.pollingLoading = false;
          }
        }
      });
      return pollingTaskPromise;
    };

    const _handleThen = function () {
      if (taskKey !== currentTaskKey) return;
      timerInstance = setTimeout(() => {
        if (taskKey !== currentTaskKey) return;
        _pollingTask().then(_handleThen);
      }, interval);
    };

    if (pollingTaskPromise && pollingTaskPromise instanceof Promise) {
      pollingTaskPromise.finally(() => {
        _pollingTask().then(_handleThen);
      });
    } else {
      _pollingTask().then(_handleThen);
    }
  }

  return {
    variables: {
      pollingLoading: false,
      oldDependency: [],
      updateKey: updateKeyGenerator(),
    },
    reducers: {
      polling(store, { payload }) {
        _runTask(store, payload);
      },
      cancelPolling() {
        clearTimeout(timerInstance);
      },
    },
  } as UseVariableParams;
};

/** 轮巡hook */
export default function usePolling({
  /** 重复调用Fn 需要结合useCallback来保证pollFn不变易提升性能 */
  pollingFn,
  /** 参数 */
  params = {},
  // 默认1s查询一次
  interval = 1000,
}: PollingParams) {
  const [store, dispatch] = useVariable<PollingvariableType>(PollingVariablesCreator);

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
