import { OrbitLoader } from "@/shared/components/OrbitLoader";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

interface LoadingContextValue {
  isLoading: boolean;
  show: () => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadingCount, setLoadingCount] = useState<number>(0);

  const isLoading = loadingCount > 0;

  const show = useCallback(() => {
    setLoadingCount((c) => c + 1);
  }, []);

  const hide = useCallback(() => {
    setLoadingCount((c) => Math.max(0, c - 1));
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, show, hide }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <OrbitLoader />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextValue => {
  const ctx = useContext(LoadingContext);

  if (!ctx) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return ctx;
};
