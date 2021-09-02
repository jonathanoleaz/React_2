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

/** we wrap the function selector with memoize() to avoid rerun the selector function when we receive (after the first time) the same collectionUrlParam 
 * (note that reselect also uses memoization), so memoize of lodash in this case acts only to save in cache the returning of createSelector*/

export const selectCollection = /*memoize(*/(collectionUrlParam) =>
    createSelector(
        [selectCollections],
        (collections) => (collections ?  collections[collectionUrlParam] : null)
    );
/*)*/;

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

/* this method is useful to check if the collections have been loaded, and is known by 'src\pages\collection\collection.component.jsx' to not fail when the page is reloaded */
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)