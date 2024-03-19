import { OutputData } from "@editorjs/editorjs";
import { Prisma } from "@prisma/client";

interface SubSection {
  id: string;
  title: string;
  description: Record<string, unknown> | null; // Adjust the type according to your JSON data structure
  comments: string;
  position: number;
  sectionId: string | null;
}

export interface SectionType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string;
  position: number;
  coverLetterId: string | null;
  // subSections: SubSection[];
}

export interface CoverLetterType {
  id: string;
  title: string;
  adminId: string | null;
  firmId: string | null;
  Section: SectionType[];
}