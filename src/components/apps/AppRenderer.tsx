"use client";

import { WindowInstance } from "@/lib/store";
import AboutApp from "./AboutApp";
import ExperienceApp from "./ExperienceApp";
import ProjectsFolder from "./ProjectsFolder";
import TerminalApp from "./TerminalApp";
import ContactApp from "./ContactApp";
import ProjectCaseStudy from "./ProjectCaseStudy";
import WelcomeApp from "./WelcomeApp";
import SkillsApp from "./SkillsApp";
import AwardsApp from "./AwardsApp";
import MonteCarloApp from "./MonteCarloApp";

export default function AppRenderer({ win }: { win: WindowInstance }) {
  if (win.appId === "welcome") return <WelcomeApp />;
  if (win.appId === "skills") return <SkillsApp />;
  if (win.appId === "awards") return <AwardsApp />;
  if (win.appId === "montecarlo") return <MonteCarloApp />;
  if (win.appId === "about") return <AboutApp />;
  if (win.appId === "experience") return <ExperienceApp />;
  if (win.appId === "projects") return <ProjectsFolder />;
  if (win.appId === "terminal") return <TerminalApp windowId={win.id} />;
  if (win.appId === "contact") return <ContactApp />;
  if (win.appId.startsWith("project:")) {
    const slug = win.appId.split(":")[1];
    return <ProjectCaseStudy slug={slug} />;
  }
  return <div className="p-5 text-sm">Unknown app.</div>;
}
