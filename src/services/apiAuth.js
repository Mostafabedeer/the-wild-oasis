import supabase, { supabaseUrl } from "./supabase";

export async function signup(email, password, fullName) {
  console.log("Signing up with email:", email, "and fullName:", fullName);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error)
    throw new Error(error.message || "Signup failed. Please try again.");
  return data;
}

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("Login failed. Please check your credentials.");

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout failed. Please try again.");

  return true;
}

export async function getCurrentUser() {
  const { data: seesion } = await supabase.auth.getSession();
  if (!seesion.session) return null;
  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw new Error("Could not retrieve user information.");

  return user?.user;
}

export async function updateUserData(fullName, password, avatar) {
  // 1. update full name or password
  let updateData = {};
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("Could not update user data.");
  if (!avatar) return data;

  // 2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error("Could not upload avatar image.");

  // 3. update user metadata with avatar URL
  const { data: updatedUser, error: metadataError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (metadataError) throw new Error("Could not update user metadata.");
  return updatedUser;
}
