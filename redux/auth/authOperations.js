import { authFirebase } from "../../firebase/config";
import { authSlice } from "./authReduser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const { authSignOut, updateUserProfile, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getSatte) => {
    try {
      console.log(email);
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;
      await updateProfile(authFirebase.currentUser, {
        displayName: login,
        userId: user.uid,
      });

      const { displayName, uid } = await authFirebase.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const { displayName, uid } = user.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getSatte) => {
  try {
    await signOut(authFirebase);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(authFirebase, (user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
        userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
