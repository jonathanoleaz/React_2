import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

/**
 * 
 * Using 'match' and 'linkUrl', the component doesnt take care of where is (talking abour routes) because the original URL is passed through 'react-router-dom' in 'match' parameter
 * and inside is built the full URL with the 'linkUrl' parameter.
 */
const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) =>(
    <div 
        className={`${size} menu-item`} 
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
            <div 
                className='background-image'
                style={{
                backgroundImage: `url(${imageUrl})`
            }} />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>Show Now</span>
        </div>
    </div>
);

/**
 * withRouter is an higher order component
 */
export default withRouter(MenuItem);

