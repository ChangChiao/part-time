type Fn = (...args: any[]) => any;

export const debounce = <T extends Fn>(callback: T, wait = 300) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), wait);
  };
};
