import { Context } from "@/prisma/context";
import { INote } from "../../../types";

export const NoteQuery = {
  notes: async (parent: INote, args: any, context: Context) => {
    return await context.prisma.note.findMany();
  },

  note: async (parent: INote, args: any, context: Context) => {
    return await context.prisma.note.findUnique({ where: { id: args.id } });
  },
};
