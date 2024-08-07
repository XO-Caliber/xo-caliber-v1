import { z } from "zod";
import { publiceProcedure, router } from "../trpc";
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
        coverletterId: z.string(),
        subSectionId: z.string(),
        title: z.string(),
        description: z.any(),
        comments: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { subSectionId, title, description, userId, comments, coverletterId } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const lastPosition = await db.exhibits.findFirst({
        where: { subSectionId },
        orderBy: { position: "desc" },
        select: { position: true }
      });

      const newPosition = lastPosition ? lastPosition.position + 1 : 1;

      const exhibitsCount = await db.exhibits.count({
        where: {
          SubSection: {
            Section: {
              coverLetterId: coverletterId
            }
          }
        }
      });

      const globalPosition = exhibitsCount ? exhibitsCount + 1 : 1;

      await db.exhibits.create({
        data: {
          title,
          description,
          position: newPosition,
          subSectionId,
          comments,
          globalPosition: globalPosition
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
        return coverLetters;
      }
    }),

  getSections: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const coverLetterId = input;
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
  downloadTemplate: publiceProcedure
    .input(z.object({ coverLetterId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { coverLetterId, userId } = input;
      if (!userId || userId === "") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Retrieve source cover letter by ID
      const sourceCoverLetter = await db.coverLetter.findUnique({
        where: { id: coverLetterId },
        include: {
          Section: {
            include: {
              SubSection: {
                include: { Exhibits: true }
              }
            }
          }
        }
      });

      // Check if source cover letter exists
      if (!sourceCoverLetter) {
        throw new Error("Source cover letter not found");
      }
      // Retrieve target user by ID
      const targetUser = await db.user.findUnique({
        where: { id: userId }
      });

      // Check if target user exists
      if (!targetUser) {
        throw new Error("Target user not found");
      }
      const newCoverLetter = await db.coverLetter.create({
        data: {
          title: sourceCoverLetter.title,
          User: { connect: { id: userId } }
        }
      });

      // Copy sections, subsections, and exhibits
      await Promise.all(
        (sourceCoverLetter.Section || []).map(async (sourceSection) => {
          const newSection = await db.section.create({
            data: {
              title: sourceSection.title,
              description: sourceSection.description ?? "",
              comments: sourceSection.comments,
              position: sourceSection.position,
              CoverLetter: { connect: { id: newCoverLetter.id } }
            }
          });

          await Promise.all(
            (sourceSection.SubSection || []).map(async (sourceSubSection) => {
              const newSubSection = await db.subSection.create({
                data: {
                  title: sourceSubSection.title,
                  description: sourceSubSection.description ?? "",
                  comments: sourceSubSection.comments,
                  position: sourceSubSection.position,
                  Section: { connect: { id: newSection.id } }
                }
              });

              await Promise.all(
                (sourceSubSection.Exhibits || []).map(async (sourceExhibit) => {
                  await db.exhibits.create({
                    data: {
                      title: sourceExhibit.title,
                      description: sourceExhibit.description ?? "",
                      comments: sourceExhibit.comments,
                      position: sourceExhibit.position,
                      SubSection: { connect: { id: newSubSection.id } }
                    }
                  });
                })
              );
            })
          );
        })
      );

      return { success: true };
    }),
  getAdminTemplate: publiceProcedure.query(async () => {
    const results = await db.admin.findUnique({
      where: {
        email: process.env.ADMIN_EMAIL
      },
      include: {
        coverletter: true
      }
    });
    return results?.coverletter;
  }),
  deleteCase: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const caseId = input;
    await db.coverLetter.delete({
      where: {
        id: caseId
      }
    });
    return { success: true };
  }),
  deleteSection: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const sectionId = input;
    await db.section.delete({
      where: {
        id: sectionId
      }
    });
    return { success: true };
  }),
  deleteSubSection: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const subSectionId = input;
    await db.subSection.delete({
      where: {
        id: subSectionId
      }
    });
    return { success: true };
  }),
  deleteExhibit: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const exhibitId = input;
    await db.exhibits.delete({
      where: {
        id: exhibitId
      }
    });
    return { success: true };
  }),
  updateCaseName: publiceProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      const { id, title } = input;
      const checkPresent = await db.coverLetter.findUnique({
        where: {
          id: id
        }
      });
      if (!checkPresent) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      await db.coverLetter.update({
        where: {
          id: id
        },
        data: {
          title: title
        }
      });

      return { success: true };
    })
});
