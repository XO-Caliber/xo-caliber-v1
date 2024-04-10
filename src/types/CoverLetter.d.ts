import { OutputData } from "@editorjs/editorjs";
import { Prisma } from "@prisma/client";

interface ExhibitType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  position: number;
  subSectionId: string;
}

interface SubSectionType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  position: number;
  sectionId: string | null;
  Exhibits: ExhibitType[];
}

export interface SectionType {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  position: number;
  coverLetterId: string | null;
  SubSection: SubSectionType[];
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

export interface ExhibitPositionType {
  id: string;
  position: number;
  subSectionId: string;
}

export enum DialogType {
  Section = "Section",
  Subsection = "Subsection",
  Exhibit = "Exhibit"
}
