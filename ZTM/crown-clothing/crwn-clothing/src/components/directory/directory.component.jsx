import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';

const Directory = ({sections}) => (

  <div className='directory-menu'>
      {
          //destructuring the 'section' object
          /**
           * '  ...otherSectionProps '
           * is equivalent to:
           * '  title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}  '
           */
          sections.map(({id, ...otherSectionProps }) =>(
              <MenuItem key={id} {...otherSectionProps}></MenuItem>
          ))
      }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);