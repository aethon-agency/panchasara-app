import ToastError from "@/src/components/ToastError";
import ToastSuccess from "@/src/components/ToastSuccess";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastType = "success" | "error";

interface ToastState {
  message: string;
  type: ToastType;
}

const ToastContext = createContext({
  success: (msg: string) => {},
  error: (msg: string) => {},
});

// Create a mutable reference for external access
let toastRef: {
  success: (msg: string) => void;
  error: (msg: string) => void;
} | null = null;

// Export a static Toast object for usage outside components
export const Toast = {
  success: (msg: string) => toastRef?.success(msg),
  error: (msg: string) => toastRef?.error(msg),
};

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const insets = useSafeAreaInsets();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, type: ToastType) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ message: msg, type });
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  const success = useCallback(
    (msg: string) => showToast(msg, "success"),
    [showToast],
  );
  const error = useCallback(
    (msg: string) => showToast(msg, "error"),
    [showToast],
  );

  // Sync the methods to the global ref
  useEffect(() => {
    toastRef = { success, error };
  }, [success, error]);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      {toast && (
        <Animated.View
          style={[styles.toastContainer, { bottom: insets.bottom + 100 }]}
          entering={FadeInDown.springify()}
          exiting={FadeOutDown}
        >
          {toast.type === "success" ? (
            <ToastSuccess message={toast.message} />
          ) : (
            <ToastError message={toast.message} />
          )}
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
});
