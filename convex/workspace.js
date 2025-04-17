import { handler } from "tailwindcss-animate";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});
export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    // Update the workspace with the new messages
    const result = await ctx.db.patch(args.workspaceId, {
      message: args.messages,
    });

    return result;
  },
});

// New function to create a workspace with optional user
export const CreateWorkspaceWithOptionalUser = mutation({
  args: {
    messages: v.any(),
    user: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const data = {
      message: args.messages,
    };

    // Only add the user field if it's provided
    if (args.user) {
      data.user = args.user;
    }

    const workspaceId = await ctx.db.insert("workspace", data);
    return workspaceId;
  },
});
