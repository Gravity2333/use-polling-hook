export function createUpdateKeyGenerator() {
  let uniqueKey = 0;

  return () => {
    if (uniqueKey > 99999) {
      uniqueKey = 0;
    } else {
      uniqueKey += 1;
    }
    return uniqueKey;
  };
}
