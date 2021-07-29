export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
/**
 *传入一个对象，去除对象值为空的键
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <O extends { [key in string]: unknown },
  K extends keyof O>(
    obj: O,
    keys: K[]
  ) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/*
*
* */

export const getType = (type: number) => {
  switch (type) {
    case 1:
      return "今日"
    case 2:
      return "本周"

    case 3:
      return "本月"

    case 4:
      return "本季度"

    case 5:
      return "半年"

    case 6:
      return "今年"

    default:
      break;
  }
}
