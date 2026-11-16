import { AppDefinition } from "./store";

export const apps = {
  welcome: { id: "welcome", title: "Welcome", icon: "home", singleton: true, center: true, defaultWidth: 600, defaultHeight: 560 },
  about: { id: "about", title: "About Me", icon: "user", singleton: true, defaultWidth: 580, defaultHeight: 640 },
  experience: { id: "experience", title: "Experience", icon: "briefcase", singleton: true, defaultWidth: 660, defaultHeight: 580 },
  projects: { id: "projects", title: "Projects", icon: "folder", singleton: true, defaultWidth: 700, defaultHeight: 540 },
  skills: { id: "skills", title: "Skills", icon: "cpu", singleton: true, defaultWidth: 600, defaultHeight: 560 },
  awards: { id: "awards", title: "Awards", icon: "medal", singleton: true, defaultWidth: 520, defaultHeight: 520 },
  montecarlo: { id: "montecarlo", title: "Monte Carlo", icon: "chart", singleton: true, defaultWidth: 720, defaultHeight: 600 },
  terminal: { id: "terminal", title: "Terminal", icon: "terminal", singleton: true, defaultWidth: 640, defaultHeight: 440 },
  contact: { id: "contact", title: "Contact", icon: "mail", singleton: true, defaultWidth: 440, defaultHeight: 460 },
} satisfies Record<string, AppDefinition>;

export type AppId = keyof typeof apps;

/** Order of the icons on the desktop. */
export const DESKTOP_APPS: AppId[] = [
  "welcome",
  "about",
  "experience",
  "projects",
  "skills",
  "awards",
  "montecarlo",
  "terminal",
  "contact",
];

export function projectAppDef(slug: string, title: string): AppDefinition {
  return {
    id: `project:${slug}`,
    title,
    icon: "file",
    singleton: true,
    defaultWidth: 680,
    defaultHeight: 640,
  };
}
