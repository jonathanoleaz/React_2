import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collection-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWihSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    /* contructor method is run by react */
    state = {
        loading: true
    };

    unsuscribeFromSnapshot = null;
    
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsuscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        })
    }

    /*with match.path we get the current path of the component */
    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWihSpinner isLoading={loading}{...props} />} />
            </div>
        );
    }
    
};
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);