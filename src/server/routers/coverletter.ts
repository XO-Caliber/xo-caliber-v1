import { string, z } from "zod";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const coverletterRouter = router({
  addCoverLetter: publiceProcedure
    .input(z.object({ userId: z.string(), title: z.string(), role: z.string() }))
    .mutation(async ({ input }) => {
      const { title, userId, role } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      if (role === "ADMIN") {
        await db.coverLetter.create({
          data: {
            title: title,
            adminId: userId
          }
        });
        return { success: true };
      } else {
        await db.coverLetter.create({
          data: {
            title: title,
            userId: userId
          }
        });
        return { success: true };
      }
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

  getCoverLetter: publiceProcedure
    .input(z.object({ userId: z.string(), role: z.string() }))
    .query(async ({ input }) => {
      const { userId, role } = input;
      if (!userId || userId === "") throw new TRPCError({ code: "UNAUTHORIZED" });

      if (role === "ADMIN") {
        const coverLetters = await db.coverLetter.findMany({
          where: {
            adminId: userId
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
      } else {
        const coverLetters = await db.coverLetter.findMany({
          where: {
            userId: userId
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
      }
    }),

  getSections: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const coverLetterId = input;
    console.log("COVERLETTER ID: ", coverLetterId);
    if (!coverLetterId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const sections = await db.section.findMany({
      where: {
        coverLetterId
      },
      include: {
        SubSection: {
          orderBy: {
            position: "asc"
          },
          include: {
            Exhibits: {
              orderBy: {
                position: "asc"
              }
            }
          }
        }
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

  updateSubSectionPostion: publiceProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          sectionId: z.string(),
          position: z.number()
        })
      )
    )
    .mutation(async ({ input }) => {
      const subSectionData = input;

      subSectionData.map(async (subsection) => {
        await db.subSection.update({
          where: {
            id: subsection.id
          },
          data: {
            position: subsection.position,
            sectionId: subsection.sectionId
          }
        });
      });

      return { success: true };
    }),

  updateExhibitPostion: publiceProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          subSectionId: z.string(),
          position: z.number()
        })
      )
    )
    .mutation(async ({ input }) => {
      const exhibitsData = input;

      try {
        await Promise.all(
          exhibitsData.map(async (exhibit) => {
            await db.exhibits.update({
              where: {
                id: exhibit.id
              },
              data: {
                position: exhibit.position,
                subSectionId: exhibit.subSectionId
              }
            });
          })
        );

        return { success: true };
      } catch (error) {
        // Handle the error appropriately
        console.error("Error updating exhibits:", error);
        return { success: false, error: "An error occurred while updating exhibits." };
      }
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
