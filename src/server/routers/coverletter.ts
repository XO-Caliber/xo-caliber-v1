import { string, z } from "zod";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const coverletterRouter = router({
  addAdminCoverLetter: adminProcedure
    .input(z.object({ userId: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      const { title, userId } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      await db.coverLetter.create({
        data: {
          title: title,
          adminId: userId
        }
      });
      return { success: true };
    }),

  addSection: publiceProcedure
    .input(
      z.object({
        userId: z.string(),
        coverLetterId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { coverLetterId, title, description, userId, comments } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });
      console.log("INFO: ", input);

      const lastPosition = await db.section.findFirst({
        where: { coverLetterId },
        orderBy: { position: "desc" },
        select: { position: true }
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      await db.section.create({
        data: {
          title,
          description,
          position: newPosition,
          coverLetterId,
          comments
        }
      });
      return { success: true };
    }),

  addSubSection: publiceProcedure
    .input(
      z.object({
        userId: z.string(),
        sectionId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { sectionId, title, description, userId, comments } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });
      console.log("INFO: ", input);

      const lastPosition = await db.subSection.findFirst({
        where: { sectionId },
        orderBy: { position: "desc" },
        select: { position: true }
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      await db.subSection.create({
        data: {
          title,
          description,
          position: newPosition,
          sectionId,
          comments
        }
      });
      return { success: true };
    }),

  updateSectionPostion: publiceProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          position: z.number()
        })
      )
    )
    .mutation(async ({ input }) => {
      const positionData = input;

      positionData.map(async (position) => {
        await db.section.update({
          where: {
            id: position.id
          },
          data: {
            position: position.position
          }
        });
      });

      return { success: true };
    }),

  getAdminCoverLetter: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const adminId = input;
    if (!adminId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const coverLetters = await db.coverLetter.findMany({
      where: {
        adminId: adminId
      },
      include: {
        Section: true
      }
    });
    console.log(
      "cover letter: ",
      coverLetters.map((coverLetter) => coverLetter.title)
    );

    return coverLetters;
  }),

  getAdminSections: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const coverLetterId = input;
    console.log("COVERLETTER ID: ", coverLetterId);
    if (!coverLetterId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const sections = await db.section.findMany({
      where: {
        coverLetterId
      },
      include: {
        SubSection: true
      },
      orderBy: {
        position: "asc"
      }
    });
    console.log(
      "subsection: ",
      sections.map((section) => section.SubSection)
    );

    return sections;
  })

  // getFirmCoverLetter: firmProcedure.input().query(async () => {

  //   if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
  //   const categories = await db.firm.findUnique({
  //     where: {
  //       email: session.user.email
  //     },
  //     include: {
  //       category: true
  //     }
  //   });
  //   return categories?.category;
  // })
});
