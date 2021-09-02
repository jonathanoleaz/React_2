import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionPageContainer from '../collection/collection.container';

/*const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);*/

class ShopPage extends React.Component {
    /* constructor method is run by react */
    
    unsuscribeFromSnapshot = null;
    
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    /*with match.path we get the current path of the component */
    render(){
        const { match } = this.props;
        
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);