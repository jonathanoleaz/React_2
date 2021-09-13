import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionPageContainer from '../collection/collection.container';

/*const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);*/

const ShopPage = ({fetchCollectionsStart, match}) => {
    
    /*we pass fetchCollectionStart as second parameter to avoid to run twice the useEffect functions 
    (because in App.js, the parent component, changes the user property of the state) */
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    /*with match.path we get the current path of the component */
    return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);