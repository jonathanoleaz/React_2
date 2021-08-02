import React from 'react';
import './card-list.styles.css';
import {Card} from '../card-list/card/card-component'

/**key  property is needed because React needs to identify which element of the array change if an element would change (Unidirectional data flow), 
 * and to avoid render all the array, in other words, it is to render only the modified element.*/

export const CardList = (props) =>(
    <div className="card-list">
        {
            props.monsters.map(monster => 
              <Card key={monster.id} monster={monster}/>
            )}
    </div>
)