export type Project =
  | {
      type: 'image';
      title: string;
      technique: string;
      src: string;
      alt: string;
      summary: string;
    }
  | {
      type: 'video';
      title: string;
      technique: string;
      src: string;
      poster?: string;
      summary: string;
    };

export const projects: Project[] = [];
