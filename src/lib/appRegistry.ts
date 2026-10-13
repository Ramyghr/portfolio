import { AppDefinition } from "./store";

export const apps: Record<string, AppDefinition> = {
  about: { id: "about", title: "About Me.app", icon: "🧑", singleton: true, defaultWidth: 580, defaultHeight: 640 },
  experience: { id: "experience", title: "Experience.log", icon: "🗂", singleton: true, defaultWidth: 660, defaultHeight: 580 },
  projects: { id: "projects", title: "Projects", icon: "📁", singleton: true, defaultWidth: 700, defaultHeight: 540 },
  terminal: { id: "terminal", title: "Terminal", icon: "⌨", singleton: true, defaultWidth: 640, defaultHeight: 440 },
  contact: { id: "contact", title: "Contact.app", icon: "✉", singleton: true, defaultWidth: 440, defaultHeight: 400 },
};

export function projectAppDef(slug: string, title: string): AppDefinition {
  return {
    id: `project:${slug}`,
    title: `${title}.doc`,
    icon: "📄",
    singleton: true,
    defaultWidth: 680,
    defaultHeight: 640,
  };
}
