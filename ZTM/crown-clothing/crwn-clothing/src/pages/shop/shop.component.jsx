import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collection-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWihSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    /* contructor method is run by react */
    

    unsuscribeFromSnapshot = null;
    
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
        /*Three examples of calling firebase, 
        now this examples would be in shop actions because we are levering this fetch or API call into redux to be usable in others components */
        
        /*
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        */
        
        /*Using fetch, without live updates */
        /*fetch('https://firestore.googleapis.com/v1/projects/crwn-db-90122/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log(collections))*/

        /* Promise pattern, without live updates 
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        })
*/
        /* Observable pattern with live updates*/
        /*this.unsuscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        })*/
    }

    /*with match.path we get the current path of the component */
    render(){
        const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
        
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching}{...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWihSpinner isLoading={!isCollectionsLoaded}{...props} />} />
            </div>
        );
    }
    
};

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);