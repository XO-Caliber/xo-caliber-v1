import { string, z } from "zod";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { json } from "body-parser";

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

  addExhibits: publiceProcedure
    .input(
      z.object({
        userId: z.string(),
        subSectionId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { subSectionId, title, description, userId, comments } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });
      console.log("INFO: ", input);

      const lastPosition = await db.exhibits.findFirst({
        where: { subSectionId },
        orderBy: { position: "desc" },
        select: { position: true }
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      await db.exhibits.create({
        data: {
          title,
          description,
          position: newPosition,
          subSectionId,
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
    }),

  updateSection: publiceProcedure
    .input(
      z.object({
        sectionId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { sectionId, title, description, comments } = input;
      if (!sectionId) throw new TRPCError({ code: "UNAUTHORIZED" });

      await db.section.update({
        where: {
          id: sectionId
        },
        data: {
          title,
          description,
          comments
        }
      });
      return { success: true };
    }),

  updateSubSection: publiceProcedure
    .input(
      z.object({
        subSectionId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { subSectionId, title, description, comments } = input;
      if (!subSectionId) throw new TRPCError({ code: "UNAUTHORIZED" });

      await db.subSection.update({
        where: {
          id: subSectionId
        },
        data: {
          title,
          description,
          comments
        }
      });
      return { success: true };
    }),

  updateExhibit: publiceProcedure
    .input(
      z.object({
        exhibitId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { exhibitId, title, description, comments } = input;
      if (!exhibitId) throw new TRPCError({ code: "UNAUTHORIZED" });

      await db.exhibits.update({
        where: {
          id: exhibitId
        },
        data: {
          title,
          description,
          comments
        }
      });
      return { success: true };
    }),
  downloadTemplate: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const userId = input;
    if (!userId || userId === "") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    // Retrieve source user by email
    const sourceUser = await db.admin.findUnique({
      where: { email: "vishnudarrshanorp@gmail.com" },
      include: {
        coverletter: {
          include: { Section: { include: { SubSection: { include: { Exhibits: true } } } } }
        }
      }
    });

    // Check if source user exists
    if (!sourceUser) {
      throw new Error("Source user not found");
    }

    console.log("Source user:", sourceUser);
    console.log("Cover letters:", sourceUser.coverletter);

    // Retrieve target user by ID
    const targetUser = await db.user.findUnique({
      where: { id: userId }
    });

    // Check if target user exists
    if (!targetUser) {
      throw new Error("Target user not found");
    }

    console.log("Target user:", targetUser);

    // Delete existing cover letters of the target user
    const deletedCoverLetters = await db.coverLetter.deleteMany({
      where: {
        userId: userId
      }
    });

    console.log("Deleted cover letters:", deletedCoverLetters);

    // Create new cover letters for the target user based on source user's cover letters
    console.log("Creating new cover letters...");
    for (const sourceCoverLetter of sourceUser.coverletter || []) {
      // Create new cover letter for the target user
      const newCoverLetter = await db.coverLetter.create({
        data: {
          title: sourceCoverLetter.title,
          User: { connect: { id: userId } }
        }
      });

      console.log("New cover letter:", newCoverLetter);

      // Copy sections, subsections, and exhibits
      for (const sourceSection of sourceCoverLetter.Section || []) {
        const newSection = await db.section.create({
          data: {
            title: sourceSection.title,
            description: sourceSection.description ?? "",
            comments: sourceSection.comments,
            position: sourceSection.position,
            CoverLetter: { connect: { id: newCoverLetter.id } }
          }
        });

        console.log("New section:", newSection);

        for (const sourceSubSection of sourceSection.SubSection || []) {
          const newSubSection = await db.subSection.create({
            data: {
              title: sourceSubSection.title,
              description: sourceSubSection.description ?? "",
              comments: sourceSubSection.comments,
              position: sourceSubSection.position,
              Section: { connect: { id: newSection.id } }
            }
          });

          console.log("New sub section:", newSubSection);

          for (const sourceExhibit of sourceSubSection.Exhibits || []) {
            await db.exhibits.create({
              data: {
                title: sourceExhibit.title,
                description: sourceExhibit.description ?? "",
                comments: sourceExhibit.comments,
                position: sourceExhibit.position,
                SubSection: { connect: { id: newSubSection.id } }
              }
            });
          }
        }
      }
    }

    return { success: true };
  })
});
