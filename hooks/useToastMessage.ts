import { useEffect } from 'react';
import { toast } from 'react-toastify';

type UseToastMessageOptions = {
  message: string;
  success: boolean;
  duration?: number;
};

export const useToastMessage = ({
  message,
  success,
  duration = 3000,
}: UseToastMessageOptions) => {
  useEffect(() => {
    if (message) {
      if (success) {
        toast.success(message, {
          autoClose: duration,
          className: 'toast-custom',
        });
      } else {
        toast.error(message, {
          autoClose: duration,
          className: 'toast-custom',
        });
      }
    }
  }, [message, success, duration]);
};
