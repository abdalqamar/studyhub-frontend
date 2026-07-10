import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const codeLines = [
  [
    { t: "function ", c: "kw" },
    { t: "CourseProgress", c: "fn" },
    { t: "({ percent }) {" },
  ],
  [{ t: "  return (" }],
  [
    { t: "    <div", c: "tag" },
    { t: " className=" },
    { t: '"progress"', c: "str" },
    { t: ">", c: "tag" },
  ],
  [{ t: "      <div", c: "tag" }],
  [{ t: "        className=" }, { t: '"bar"', c: "str" }],
  [
    { t: "        style={{ width: " },
    { t: "`${percent}%`", c: "str" },
    { t: " }}" },
  ],
  [{ t: "      />", c: "tag" }],
  [{ t: "    </div>", c: "tag" }],
  [{ t: "  );" }],
  [{ t: "}" }],
  [{ t: "" }],
  [{ t: "// shown on every course card to track your progress", c: "cm" }],
  [
    { t: "export default ", c: "kw" },
    { t: "CourseProgress", c: "fn" },
    { t: ";" },
  ],
];

const termLines = [
  [{ t: "$ ", c: "muted" }, { t: "npm run build" }],
  [{ t: "✓ compiled in 412ms", c: "stamp" }],
  [{ t: "✓ 0 errors, 0 warnings", c: "stamp" }],
  [{ t: "✓ ready — served on :3000", c: "stamp" }],
];

const codeSegClass = {
  kw: "text-indigo-400",
  fn: "text-gold",
  str: "text-emerald-400",
  cm: "text-text-3 italic",
  tag: "text-amber-400",
  stamp: "text-emerald-400",
  muted: "text-text-3",
};

function CodeLine({ segments }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} className={seg.c ? codeSegClass[seg.c] : undefined}>
          {seg.t}
        </span>
      ))}
      {"\n"}
    </>
  );
}

const LiveCodeDemo = () => {
  const [visibleCode, setVisibleCode] = useState(0);
  const [visibleTerm, setVisibleTerm] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisibleCode(codeLines.length);
      setVisibleTerm(termLines.length);
      return;
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const run = async () => {
      while (mountedRef.current) {
        setVisibleCode(0);
        setVisibleTerm(0);

        for (let i = 1; i <= codeLines.length; i++) {
          if (!mountedRef.current) return;
          setVisibleCode(i);
          await sleep(140);
        }

        await sleep(500);

        for (let j = 1; j <= termLines.length; j++) {
          if (!mountedRef.current) return;
          setVisibleTerm(j);
          await sleep(380);
        }

        await sleep(2600);
      }
    };

    run();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const isTyping = visibleCode < codeLines.length;
  const isPrintingTerm = visibleTerm > 0 && visibleTerm < termLines.length;

  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] border border-border/50 rounded-2xl overflow-hidden bg-surface/60">
      {/* code pane */}
      <div className="border-b md:border-b-0 md:border-r border-border/50">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/50">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[11px] text-text-3">
            CourseProgress.jsx
          </span>
        </div>
        <pre className="m-0 p-4 sm:p-5 font-mono text-[12px] sm:text-[12.5px] leading-[1.75] text-white whitespace-pre overflow-x-auto min-h-[230px]">
          {codeLines.slice(0, visibleCode).map((segs, i) => (
            <CodeLine key={i} segments={segs} />
          ))}
          {isTyping && (
            <span className="inline-block w-1.5 h-3 bg-gold ml-0.5 align-middle animate-pulse" />
          )}
        </pre>
      </div>

      {/* terminal pane */}
      <div>
        <div className="px-4 py-2.5 border-b border-border/50">
          <span className="font-mono text-[11px] text-text-3 tracking-wide">
            TERMINAL
          </span>
        </div>
        <pre className="m-0 p-4 sm:p-5 font-mono text-[12px] sm:text-[12.5px] leading-[1.75] text-text-2 whitespace-pre overflow-x-auto min-h-[230px]">
          {termLines.slice(0, visibleTerm).map((segs, i) => (
            <CodeLine key={i} segments={segs} />
          ))}
          {isPrintingTerm && (
            <span className="inline-block w-1.5 h-3 bg-gold ml-0.5 align-middle animate-pulse" />
          )}
        </pre>
      </div>
    </div>
  );
};

export default LiveCodeDemo;
