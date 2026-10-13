"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sound";
import { contact } from "@/lib/about";

type Line = { text: string; kind?: "cmd" | "out" };

const FILES: Record<string, string> = {
  "about.txt":
    "FinTech & AI Engineer. Builds trading systems, forecasting pipelines, and full-stack\nplatforms. Also drums, lifts, climbs, and forgets ideathon details.",
  "skills.txt":
    "Python, TypeScript, FastAPI, Next.js, PyTorch, LangGraph, PostgreSQL, Docker,\nReinforcement Learning, Multi-Agent Systems, Time Series Forecasting.",
  "projects.txt":
    "MARTA, WS Mariage, Agency Rent A Car, Face Clustering, STB Forecasting,\nGamified Trading Simulator, Monte Carlo Lab, Naruto Hand-Seal Detector, RenalNet.",
  "secret.txt":
    "You weren't supposed to find this. Powerlifting PR: 1st in Bizerte, 2nd nationally.\nMake of that what you will.",
};

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { text: "System 7 Terminal — type `help` to begin.", kind: "out" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const push = (text: string) => setLines((l) => [...l, { text, kind: "out" }]);
    setLines((l) => [...l, { text: `guest@gharbi-industries:~$ ${cmd}`, kind: "cmd" }]);

    if (!cmd) return;
    const [base, ...args] = cmd.split(" ");

    switch (base) {
      case "help":
        push("commands: help, whoami, ls, cat <file>, contact, sudo, clear");
        break;
      case "whoami":
        push("ramy gharbi — fintech & ai engineer. probably debugging something right now.");
        break;
      case "ls":
        push(Object.keys(FILES).join("  "));
        break;
      case "cat":
        if (!args[0]) push("usage: cat <file>");
        else if (FILES[args[0]]) push(FILES[args[0]]);
        else push(`cat: ${args[0]}: no such file`);
        break;
      case "contact":
        push(`${contact.email}  |  ${contact.linkedin}`);
        break;
      case "sudo":
        sfx.error();
        push("nice try. permission denied — this machine only answers to coffee.");
        break;
      case "clear":
        setLines([]);
        return;
      default:
        sfx.error();
        push(`command not found: ${base} — try 'help'`);
    }
  };

  return (
    <div
      className="scanlines h-full bg-black text-[color:var(--color-crt-green)] font-mono text-[12px] p-3 flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-0.5">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
        className="flex items-center gap-1 pt-1"
      >
        <span>guest@gharbi-industries:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sfx.key();
          }}
          className="flex-1 bg-transparent outline-none caret-transparent"
          spellCheck={false}
        />
        <span className="blink-caret">▍</span>
      </form>
    </div>
  );
}
