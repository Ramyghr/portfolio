"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sound";
import { contact } from "@/lib/about";
import { experience } from "@/lib/experience";
import { awards, profile, skills } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { useOS } from "@/lib/store";
import { apps, type AppId } from "@/lib/appRegistry";
import { getWallpaper } from "@/lib/wallpapers";

type Line = { text: string; kind?: "cmd" | "out" | "banner" };

const FILES: Record<string, string> = {
  "about.txt":
    "FinTech & AI Engineer. Builds trading systems, forecasting pipelines, and full-stack\nplatforms. Also drums, lifts, climbs, and forgets ideathon details.",
  "skills.txt": skills.map((g) => `${g.group}: ${g.items.join(", ")}`).join("\n"),
  "projects.txt": projects.map((p) => `${p.title} — ${p.summary}`).join("\n\n"),
  "secret.txt":
    "You weren't supposed to find this. Powerlifting PR: 1st in Bizerte, 2nd nationally.\nMake of that what you will.",
};

const JOKES = [
  "Why did the model overfit? It got too attached to the training set.",
  "There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.",
  "I'd tell you a joke about recursion, but I'd have to tell you a joke about recursion.",
  "A backtest walks into a bar. The bar was in-sample. It never found the bar again out-of-sample.",
];

const OPEN_TARGETS = Object.keys(apps) as AppId[];

const MARTA = [
  "Connecting to marta.gharbi-industries... connected.",
  "",
  "MARTA — Multi-Agent Regime-Aware Trading Architecture",
  "  1. ingest    OHLCV for a 5-asset crypto panel",
  "  2. regimes   Gaussian HMM clusters market states",
  "  3. debate    5 LLM agents argue, a Fund Manager decides",
  "  4. execute   PPO agent sizes the position",
  "  5. report    live dashboard, paper trading, Telegram alerts",
  "",
  "Result: no statistically defensible edge out-of-sample — documented and root-caused.",
  "Type `open projects` and pick MARTA for the full write-up.",
].join("\n");

function Banner() {
  return [
    " ____                       ",
    "|  _ \\ __ _ _ __ ___  _   _ ",
    "| |_) / _\` | '_ \` _ \\| | | |",
    "|  _ < (_| | | | | | | |_| |",
    "|_| \\_\\__,_|_| |_| |_|\\__, |",
    "                      |___/ ",
  ].join("\n");
}

const BANNER_TAGLINE = "FinTech & AI Engineer — gharbi-industries";

const WELCOME: Line[] = [
  { text: Banner(), kind: "banner" },
  { text: BANNER_TAGLINE, kind: "out" },
  { text: "Type `help` to see what this machine can do.", kind: "out" },
  { text: "", kind: "out" },
];

export default function TerminalApp({ windowId }: { windowId?: string }) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyPos = useRef<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openWindow = useOS((s) => s.openWindow);
  const closeWindow = useOS((s) => s.closeWindow);
  const wallpaper = useOS((s) => s.wallpaper);
  const [bootTime] = useState(() => Date.now());

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
            "whoami, hire, resume, cv, contact",
            "skills, experience, projects, awards",
            `open <${OPEN_TARGETS.join("|")}>`,
            "ssh marta",
            "ls, cat <file>, echo <text>, date, history, neofetch, banner",
            "joke, coffee, sudo, exit, clear",
          ].join("\n")
        );
        break;
      case "whoami":
        push(`${profile.name.toLowerCase()} — ${profile.headline.toLowerCase()}. ${profile.status.toLowerCase()}.`);
        break;
      case "banner":
        setLines((l) => [...l, { text: Banner(), kind: "banner" }, { text: BANNER_TAGLINE, kind: "out" }]);
        break;
      case "neofetch": {
        const uptimeSec = Math.max(0, Math.floor((Date.now() - bootTime) / 1000));
        push(
          [
            "guest@gharbi-industries",
            "-----------------------",
            "OS: ramy.os (Gharbi Industries)",
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
      case "awards":
        push(awards.map((a) => `${a.place.padEnd(16)} ${a.title}`).join("\n"));
        break;
      case "hire":
        push(
          [
            `${profile.name} — ${profile.headline}`,
            profile.honors,
            `Status: ${profile.status}`,
            "",
            `Email:    ${contact.email}`,
            `LinkedIn: ${contact.linkedin}`,
            "",
            "Opening the contact window...",
          ].join("\n")
        );
        sfx.open();
        openWindow(apps.contact);
        break;
      case "resume":
        push("opening resume.pdf in a new tab...");
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        break;
      case "cv":
        push("opening the plain CV page in a new tab...");
        window.open("/cv", "_blank", "noopener,noreferrer");
        break;
      case "ssh":
        if (args[0] === "marta") push(MARTA);
        else push(`ssh: could not resolve hostname ${args[0] ?? ""} — try 'ssh marta'`);
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
        const target = args[0] as AppId | undefined;
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
      className="h-full bg-[#0d1117] text-slate-200 font-mono text-[12.5px] p-4 flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-0.5">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === "banner"
                ? "whitespace-pre font-bold leading-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent"
                : `whitespace-pre-wrap break-words ${l.kind === "cmd" ? "text-slate-400" : ""}`
            }
          >
            {l.text || " "}
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
        <span>
          <span className="text-(--color-crt-green)">guest@gharbi-industries</span>
          <span className="text-indigo-400">:~$</span>
        </span>
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
        <span className="blink-caret text-indigo-300">▍</span>
      </form>
    </div>
  );
}
