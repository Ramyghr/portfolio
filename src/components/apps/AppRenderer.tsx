"use client";

import { WindowInstance } from "@/lib/store";
import AboutApp from "./AboutApp";
import ExperienceApp from "./ExperienceApp";
import ProjectsFolder from "./ProjectsFolder";
import TerminalApp from "./TerminalApp";
import ContactApp from "./ContactApp";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function AppRenderer({ win }: { win: WindowInstance }) {
  if (win.appId === "about") return <AboutApp />;
  if (win.appId === "experience") return <ExperienceApp />;
  if (win.appId === "projects") return <ProjectsFolder />;
  if (win.appId === "terminal") return <TerminalApp />;
  if (win.appId === "contact") return <ContactApp />;
  if (win.appId.startsWith("project:")) {
    const slug = win.appId.split(":")[1];
    return <ProjectCaseStudy slug={slug} />;
  }
  return <div className="p-5 text-sm">Unknown app.</div>;
}
