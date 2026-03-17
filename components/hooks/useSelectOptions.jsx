import { useEffect, useState } from "react";

export const useSelectOptions = (data = [], valueKey, optionKey) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!data || data == [] || data.length === 0) return;

    setIsLoading(true);

    const formatted = data
      .filter(
        (item) => item?.[valueKey] !== undefined && item?.[valueKey] !== null,
      )
      .map((item) => ({
        value: item[valueKey],
        label: item[optionKey],
      }));

    setOptions(formatted);
    setIsLoading(false);
  }, [data, valueKey, optionKey]);

  return { options, isLoading };
};
