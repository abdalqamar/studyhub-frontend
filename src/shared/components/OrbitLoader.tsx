interface OrbitLoaderProps {
  text?: string;
}

export const OrbitLoader = ({ text = "Please wait..." }: OrbitLoaderProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-12 w-12 animate-spin">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-400" />
        <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400 opacity-75" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-400 opacity-50" />
        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400 opacity-25" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_16px_#38bdf8]" />
      </div>
      <p className="text-sm font-medium tracking-wide text-text-2">{text}</p>
    </div>
  );
};
