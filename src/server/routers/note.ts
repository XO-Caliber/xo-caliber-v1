import { z } from "zod";
import { db } from "@/lib/db";
import { assistantProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";

export const noteRouter = router({
  addUserNotes: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    const checkNotes = await db.userNote.findUnique({
      where: {
        userId: session?.user.id
      }
    });
    if (!checkNotes) {
      await db.userNote.create({
        data: {
          content: input,
          User: {
            connect: {
              id: session?.user.id
            }
          }
        }
      });

      return { success: true };
    }
    await db.userNote.update({
      where: {
        userId: session?.user.id
      },
      data: {
        content: input
      }
    });
    return { success: true };
  }),
  getUserNotes: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const userNotes = await db.user.findUnique({
      where: {
        id: session?.user.id
      },
      include: {
        Note: true
      }
    });

    return userNotes?.Note;
  }),
  editUserNotes: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    await db.userNote.update({
      where: {
        userId: session?.user.id
      },
      data: {
        content: input
      }
    });
  }),
  getClientFirmNotes: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const note = await db.firmNote.findUnique({
      where: {
        userId: session?.user.id
      }
    });
    return note;
  }),
  addFirmNotes: firmProcedure
    .input(z.object({ content: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const session = await getAuthSession();
      const { content, userId } = input;

      // Ensure that firmId is retrieved from the session and is not undefined
      const firmId = session?.user.id;
      if (!firmId) {
        throw new Error("Firm ID not found in the session.");
      }

      const checkNotes = await db.firmNote.findUnique({
        where: {
          firmId: firmId,
          userId: userId
        }
      });

      if (!checkNotes) {
        await db.firmNote.create({
          data: {
            content: content,
            userId: userId,
            firmId: firmId
          }
        });
        return { success: true };
      }

      await db.firmNote.update({
        where: {
          firmId: firmId,
          userId: userId
        },
        data: {
          content: content
        }
      });
      return { success: true };
    }),
  getFirmNotes: firmProcedure.input(z.string()).query(async ({ input }) => {
    const session = await getAuthSession();
    const notes = await db.firmNote.findUnique({
      where: {
        firmId: session?.user.id,
        userId: input
      }
    });
    return notes;
  }),
  getFirmClientNotes: firmProcedure.input(z.string()).query(async ({ input }) => {
    const notes = await db.userNote.findUnique({
      where: {
        userId: input
      }
    });
    return notes;
  }),
  addQANotes: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();

    await db.user.update({
      where: {
        id: session?.user.id
      },
      data: {
        QANotes: input
      }
    });
    return { success: true };
  }),
  getQANotes: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const notes = await db.user.findUnique({
      where: {
        id: session?.user.id
      }
    });
    return notes?.QANotes;
  }),
  getClientNotesByAssistant: assistantProcedure.input(z.string()).query(async ({ input }) => {
    const userNotes = await db.user.findUnique({
      where: {
        id: input
      },
      include: {
        Note: true
      }
    });
    return userNotes?.Note;
  }),
  getClientsFirmNoteByAssistant: assistantProcedure.input(z.string()).query(async ({ input }) => {
    const userNotes = await db.user.findUnique({
      where: {
        id: input
      },
      include: {
        FirmNote: true
      }
    });
    return userNotes?.FirmNote;
  })
});
