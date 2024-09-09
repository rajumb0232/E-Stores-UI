import { useCallback } from 'react';

export const useInputHandler = () => {
  const handleInput = useCallback((doSet, object) => (event) => {
    if (event?.target) {
      const { name, value } = event.target;
      doSet({ ...object, [name]: value });
    }
  }, []);

  return handleInput;
};
