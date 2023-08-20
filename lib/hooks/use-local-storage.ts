import {useState} from "react";

export const useLocalStorage = <T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] => {
  if (!window) return [initialValue, () => null];
  const storedValueFromLocalStorage = window.localStorage.getItem(key);
  const [storedValue, setStoredValue] = useState<T>(
      storedValueFromLocalStorage ? JSON.parse(storedValueFromLocalStorage) : initialValue
  );

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
