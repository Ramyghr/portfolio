"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sound";
import { contact } from "@/lib/about";
import { experience } from "@/lib/experience";
import { useOS } from "@/lib/store";
import { apps } from "@/lib/appRegistry";
import { getWallpaper } from "@/lib/wallpapers";

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

const JOKES = [
  "Why did the model overfit? It got too attached to the training set.",
  "There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
  "I'd tell you a joke about recursion, but I'd have to tell you a joke about recursion.",
  "A backtest walks into a bar. The bar was in-sample. It never found the bar again out-of-sample.",
];

const OPEN_TARGETS = ["about", "experience", "projects", "contact", "terminal"] as const;

function Banner() {
  return [
    " ____                       ",
    "|  _ \\ __ _ _ __ ___  _   _ ",
    "| |_) / _\` | '_ \` _ \\| | | |",
    "|  _ < (_| | | | | | | |_| |",
    "|_| \\_\\__,_|_| |_| |_|\\__, |",
    "                      |___/ ",
    "FinTech & AI Engineer — gharbi-industries/system7",
  ].join("\n");
}

export default function TerminalApp({ windowId }: { windowId?: string }) {
  const [lines, setLines] = useState<Line[]>([
    { text: "System 7 Terminal — type `help` to begin.", kind: "out" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyPos = useRef<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useOS((s) => s.openWindow);
  const closeWindow = useOS((s) => s.closeWindow);
  const wallpaper = useOS((s) => s.wallpaper);
  const bootTime = useRef<number>(Date.now());

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const push = (text: string) => setLines((l) => [...l, { text, kind: "out" }]);
    setLines((l) => [...l, { text: `guest@gharbi-industries:~$ ${cmd}`, kind: "cmd" }]);

    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    historyPos.current = -1;
    const [base, ...args] = cmd.split(" ");

    switch (base) {
      case "help":
        push(
          [
            "help, whoami, banner, neofetch, date, history",
            "ls, cat <file>, echo <text>",
            "skills, experience, projects, contact",
            "open <about|experience|projects|contact|terminal>",
            "joke, coffee, sudo, exit, clear",
          ].join("\n")
        );
        break;
      case "whoami":
        push("ramy gharbi — fintech & ai engineer. probably debugging something right now.");
        break;
      case "banner":
        push(Banner());
        break;
      case "neofetch": {
        const uptimeSec = Math.max(0, Math.floor((Date.now() - bootTime.current) / 1000));
        push(
          [
            "guest@gharbi-industries",
            "-----------------------",
            "OS: System 7 (Gharbi Industries)",
            "Host: FinTech & AI Engineer",
            `Uptime: ${uptimeSec}s this session`,
            "Shell: zsh (probably)",
            `Theme: ${getWallpaper(wallpaper).label}`,
            "CPU: caffeine-powered",
            "Memory: 128K, allocated entirely to side projects",
          ].join("\n")
        );
        break;
      }
      case "date":
        push(new Date().toString());
        break;
      case "history":
        push(history.length ? history.map((h, i) => `${i + 1}  ${h}`).join("\n") : "no history yet");
        break;
      case "echo":
        push(args.join(" "));
        break;
      case "ls":
        push(Object.keys(FILES).join("  "));
        break;
      case "cat":
        if (!args[0]) push("usage: cat <file>");
        else if (FILES[args[0]]) push(FILES[args[0]]);
        else push(`cat: ${args[0]}: no such file`);
        break;
      case "skills":
        push(FILES["skills.txt"]);
        break;
      case "projects":
        push(FILES["projects.txt"]);
        break;
      case "experience":
        push(experience.map((e) => `${e.period.padEnd(24)} ${e.role} — ${e.org}`).join("\n"));
        break;
      case "contact":
        push(`${contact.email}  |  ${contact.linkedin}`);
        break;
      case "joke":
        push(JOKES[Math.floor(Math.random() * JOKES.length)]);
        break;
      case "coffee":
        push("☕ brewing... this machine runs on it, not electricity.");
        break;
      case "open": {
        const target = args[0] as (typeof OPEN_TARGETS)[number] | undefined;
        if (!target || !OPEN_TARGETS.includes(target)) {
          push(`usage: open <${OPEN_TARGETS.join("|")}>`);
        } else {
          sfx.open();
          openWindow(apps[target]);
          push(`opening ${target}...`);
        }
        break;
      }
      case "exit":
        if (windowId) {
          push("closing terminal...");
          sfx.close();
          setTimeout(() => closeWindow(windowId), 150);
        } else {
          push("nothing to exit — this isn't inside a window.");
        }
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyPos.current < 0 ? history.length - 1 : Math.max(0, historyPos.current - 1);
      historyPos.current = next;
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPos.current < 0) return;
      const next = historyPos.current + 1;
      if (next >= history.length) {
        historyPos.current = -1;
        setInput("");
      } else {
        historyPos.current = next;
        setInput(history[next]);
      }
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
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none caret-transparent"
          spellCheck={false}
        />
        <span className="blink-caret">▍</span>
      </form>
    </div>
  );
}
