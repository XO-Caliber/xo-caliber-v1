import { z } from "zod";
import { publiceProcedure, router } from "../trpc";

export const noteRouter = router({
  addUserNotes: publiceProcedure.input(z.string()).mutation(async ({ input }) => {}),
  getUserNotes: publiceProcedure.query(async ({ input }) => {})
});
