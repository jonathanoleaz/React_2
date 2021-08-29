import { memoize } from "lodash.memoize";
import { createSelector } from "reselect";

const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
        collections ? Object.keys(collections).map(key => collections[key]) : []
)

/** we wrap the function selector with memoize() to avoid rerun the selector function when we receive (after the first time) the same collectionUrlParam (note that reselect also uses memoization), so memoize of lodash in this case acts only to save in cache the returning of createSelector*/

export const selectCollection = /*memoize(*/(collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) => (collections ?  collections[collectionUrlParam] : null)
    );
/*)*/;
