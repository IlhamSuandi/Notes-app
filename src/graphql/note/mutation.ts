import { Context } from "@/prisma/context";
import { INote } from "../../../types";
import { revalidatePath } from "next/cache";

export const NoteMutation = {
  addNote: async (_parent: INote, args: INote, context: Context) => {
    return await context.prisma.note
      .create({
        data: {
          title: args.title,
          body: args.body,
          createdAt: args.createdAt,
        },
      })
      .finally(() => {
        revalidatePath("/", "page");
        revalidatePath("/details/[id]", "page");
      });
  },

  deleteNote: async (_parent: INote, args: INote, context: Context) => {
    return await context.prisma.note
      .delete({ where: { id: args.id } })
      .finally(() => {
        revalidatePath("/", "page");
        revalidatePath("/details/[id]", "page");
      });
  },

  updateNote: async (_parent: INote, args: INote, context: Context) => {
    return await context.prisma.note
      .update({
        where: { id: args.id },
        data: { title: args.title, body: args.body },
      })
      .finally(() => {
        revalidatePath("/", "page");
        revalidatePath("/details/[id]", "page");
      });
  },
};
