import {takeLatest, put, all, call} from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';
import { googleSignInSuccess, googleSignInFailure, emailSignInFailure, emailSignInSuccess } from './user.actions';

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        //**this is similar as we were doing in App.js  */
        yield put(
            googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        );
    }catch(error){
        yield put(
            googleSignInFailure(error)
            );
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();

        //**this is similar as we were doing in App.js  */
        yield put(
            emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        );
    }catch(error){
        put(emailSignInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}