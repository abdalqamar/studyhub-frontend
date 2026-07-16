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

const OrbitLoader = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-12 w-12 animate-spin">
        {/* Orbit dots */}
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-400" />
        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400 opacity-75" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-400 opacity-50" />
        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400 opacity-25" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_16px_#38bdf8]" />
      </div>

      <p className="text-sm font-medium tracking-wide text-text-2">
        Please wait...
      </p>
    </div>
  );
};

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
