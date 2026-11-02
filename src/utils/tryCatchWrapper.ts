/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { GENERIC_ERROR_MESSAGE, getFriendlyErrorMessage } from "./errorMessage";

interface TryCatchWrapperOptions {
  body?: any;
  params?: any;
}

interface TryCatchConfig {
  showToast?: boolean;
  setLoading?: (loading: boolean) => void;
  setError?: (error: string | null) => void;
  toastLoadingMessage?: string;
  toastSuccessMessage?: string;
  toastErrorMessage?: string;
}

const tryCatchWrapper = async (
  asyncFunction: any,
  reqData?: TryCatchWrapperOptions,
  config: TryCatchConfig = {
    showToast: true,
  },
) => {
  const {
    showToast = true,
    setLoading,
    setError,
    toastLoadingMessage = "Spracováva sa...",
    toastSuccessMessage,
    toastErrorMessage = GENERIC_ERROR_MESSAGE,
  } = config;

  // Set loading state
  setLoading?.(true);

  // Show loading toast only if showToast is true
  const toastId = showToast
    ? toast.loading(toastLoadingMessage, {
        duration: 2000,
      })
    : undefined;

  try {
    // Build request object
    let req: any = {};

    if (reqData?.body && reqData?.params) {
      req = { body: reqData.body, params: reqData.params };
    } else if (reqData?.body) {
      req = { body: reqData.body };
    } else if (reqData?.params) {
      req = { params: reqData.params };
    }

    const res = await asyncFunction(req);

    if (!res.success) {
      console.log(res);
      // setError?.(res.message);
      throw new Error(res.message);
    } else {
      // Show success toast only if showToast is true
      if (showToast) {
        if (toastSuccessMessage) {
          toast.success(toastSuccessMessage, {
            id: toastId,
            duration: 2000,
          });
        } else {
          toast.success(res.message, {
            id: toastId,
            duration: 2000,
          });
        }
      }
    }

    setLoading?.(false);
    setError?.(null);
    return res;
  } catch (error: any) {
    console.log(error);

    const errorMessage =
      error?.data?.message || error?.message || error?.error || "";

    let displayError = toastErrorMessage;

    // Check if error is related to file size/body limit
    if (
      errorMessage.toLowerCase().includes("body size") ||
      errorMessage.toLowerCase().includes("exceeded") ||
      errorMessage.toLowerCase().includes("10mb") ||
      errorMessage.toLowerCase().includes("body limit") ||
      errorMessage.toLowerCase().includes("unexpected end of form") ||
      errorMessage.toLowerCase().includes("too large")
    ) {
      displayError =
        "Veľkosť súboru je príliš veľká! Maximálna veľkosť nahrávania je 500 MB. Nahrajte menšie súbory.";
    } else if (errorMessage) {
      // Next.js' own "error occurred in the Server Components render" text is replaced by the
      // configured message; a real reason from the backend is kept.
      displayError = getFriendlyErrorMessage(errorMessage, toastErrorMessage);
    }

    // Show error toast only if showToast is true
    setError?.(displayError);

    if (showToast) {
      toast.error(displayError, {
        id: toastId,
        duration: 3000, // Increased duration for file size errors
      });
    }

    setLoading?.(false);
    return { success: false, message: displayError };
  }
};

export default tryCatchWrapper;
