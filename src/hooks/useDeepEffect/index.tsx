import { useEffect, useRef } from 'react';
import { dependencyEqual } from './utils/equal';

/** 深层比较useEffect */
export default function useDeepEffect(effectFunc: () => void = () => {}, dependency: any[] = []) {
  const oldDependencyRef = useRef<any[]>([]);
  useEffect(() => {
    if (dependencyEqual(oldDependencyRef.current, dependency)) {
      return;
    }
    oldDependencyRef.current = dependency;
    /** 重新run effectFunc */
    effectFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);
}
