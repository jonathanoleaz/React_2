import {takeLatest, takeEvery, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser, createUserWithEmailAndPassword, createUserProfileDocumentPromised } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signOutStart, signUpFailure, signUpSuccess } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();

        //**this is similar as we were doing in App.js  */
        yield put(
            signInSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        );
    }catch(error){
        yield put(
            signInFailure(error)
            );
    }
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield (put (signOutSuccess()));
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(
            signInFailure(error)
            );
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* signUp({payload: {displayName,email,password,confirmPassword}}){
    try{
        const user = yield createUserWithEmailAndPassword(email, password);
        if(!user) return;
        yield createUserProfileDocumentPromised(user, displayName);
        yield put(signUpSuccess(user));
    }catch (error){
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user}}){
    yield getSnapshotFromUserAuth(user);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeEvery(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart(){
    yield takeEvery(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
    yield takeEvery(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}