export function shallowEqual(objA: any, objB: any): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      !Object.prototype.hasOwnProperty.call(objB, currentKey) ||
      // $FlowFixMe[incompatible-use] lost refinement of `objB`
      !Object.is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}

export function dependencyEqual(oldDependency: any[], dependency: any[]) {
  if (oldDependency?.length !== dependency?.length) return false;
  for (let i = 0; i < dependency?.length; i++) {
    const dependencyItem = dependency[i];
    const oldDependencyItem = oldDependency[i];
    if (!shallowEqual(dependencyItem, oldDependencyItem)) {
      return false;
    }
  }
  return true;
}
