import { getItem, setItem } from "../../storage/local";

let userId: string = getItem("userId") || "";

if (!userId) {
  userId = Date.now().toString();
  setItem("userId", userId);
}

/**
 * Assign randomish value to user and store it in localStorage.
 * App doesn't support user login but as user can change user name we need to distinguish user by id property.
 * To get new user id delete local storage or use incognito mode.
 */
export const useUser = () => ({
  id: userId,
});
