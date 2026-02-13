import { notFound } from "next/navigation";
import { projects } from "@/src/data/projects";
import ProjectPageClient from "./project-page-client";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Add 'async' and 'await params'
export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params
  const { slug } = await params;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Get next project for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}