import { OutputData } from "@editorjs/editorjs";
import { Prisma } from "@prisma/client";

interface SubSectionType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  position: number;
  sectionId: string | null;
}

export interface SectionType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  position: number;
  coverLetterId: string | null;
  SubSection: SubSection[];
}

export interface CoverLetterType {
  id: string;
  title: string;
  adminId: string | null;
  firmId: string | null;
  Section: SectionType[];
}

export interface SectionPositionType {
  id: string;
  position: number;
}

export interface SubSectionPositionType {
  id: string;
  position: number;
  sectionId: string;
}
