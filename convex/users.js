import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .first();

    if (existingUser) {
      return { message: "User already exists", user: existingUser };
    }

    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      picture: args.picture,
      uid: args.uid,
    });
    console.log("New user created with ID:", newUserId);
    // return { message: "User created successfully", userId: newUserId };
    const newUser = await ctx.db.get(newUserId);

    return { message: "User created successfully", user: newUser };
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    console.log("Fetched user from DB:", user);
    return user[0];
  },
});
