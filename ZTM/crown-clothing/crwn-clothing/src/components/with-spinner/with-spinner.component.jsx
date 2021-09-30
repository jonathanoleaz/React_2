import React from 'react';
import Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponent => {
    const SpinnerComp = ({isLoading, ...otherProps}) => {
        return isLoading ? (
                <Spinner />
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return SpinnerComp;
}

export default WithSpinner;