import {takeEvery, takeLatest,call,all, put} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionFailure } from './shop.actions';
export function* fetchCollectionsAsync() {

    /*const {updateCollections} = this.props;*/
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        /*In Sagas we don't use dispatch, we use put */
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error));
    }
    

    //dispatch(fetchCollectionsStart())

    //collectionRef.get().then(snapshot => {
    //    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //    dispatch(fetchCollectionsSuccess(collectionsMap));   
    //}).catch(
    //    error => dispatch(fetchCollectionFailure(error.message))
    //);
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}