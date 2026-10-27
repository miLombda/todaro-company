import { createClient } from '@sanity/client';

export interface Project {
  title: string;
  technique: string;
  summary: string;
  coverUrl?: string;
  coverAlt?: string;
  videoUrl?: string;
}

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: true,
    })
  : null;

export async function getProjects(): Promise<{ configured: boolean; projects: Project[] }> {
  if (!client) return { configured: false, projects: [] };

  const projects = await client.fetch<Project[]>(
    `*[_type == "project" && defined(slug.current)] | order(featured desc, order asc, _createdAt desc) {
      title,
      "technique": coalesce(technique, "Lavorazione"),
      "summary": coalesce(summary, ""),
      "coverUrl": cover.asset->url,
      "coverAlt": cover.alt,
      "videoUrl": video.asset->url
    }`,
  );

  return { configured: true, projects };
}
