import { useLocation } from "react-router";

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

export const type = (name: string) => {
  switch (name) {
    case "今日":
      return 1
    case "本周":
      return 2

    case "本月":
      return 3

    case "本季度":
      return 4

    case "半年":
      return 5

    case "今年":
      return 6

    default:
      break;
  }
}

/**
 * 获取URL路由参数
 *  */

export const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
