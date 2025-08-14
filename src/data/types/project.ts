
export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  duration: string;
  client: string;
  role: string;
  technologies: string[];
}

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}
