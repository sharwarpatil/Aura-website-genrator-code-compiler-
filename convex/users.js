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
    //if user exist
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    console.log(user);
    //if doesnt
    if (user?.length == 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
      });
    }
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
// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const CreateUser = mutation({
//   args: {
//     name: v.string(),
//     email: v.string(),
//     picture: v.string(),
//     uid: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // First, try to find an existing user by both email and uid
//     const existingUser = await ctx.db
//       .query("users")
//       .filter((q) =>
//         q.or(q.eq(q.field("email"), args.email), q.eq(q.field("uid"), args.uid))
//       )
//       .first();

//     // If user exists, return the existing user's ID
//     if (existingUser) {
//       return {
//         message: "User already exists",
//         userId: existingUser._id,
//         user: existingUser,
//       };
//     }

//     // If no existing user, create a new one
//     const newUserId = await ctx.db.insert("users", {
//       name: args.name,
//       email: args.email,
//       picture: args.picture,
//       uid: args.uid,
//     });

//     return {
//       message: "User created successfully",
//       userId: newUserId,
//     };
//   },
// });

// export const GetUser = query({
//   args: {
//     email: v.string(),
//   },
//   handler: async (ctx, args) => {
//     // Return the first user matching the email
//     const user = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("email"), args.email))
//       .first(); // Use first() instead of collect()[0]
//     return user;
//   },
// });
