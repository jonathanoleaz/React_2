import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token =>{
    console.log(token);
}
const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JSMenFnm1EFTo7stgBejN1CyhDQBYjh5O6f5LpL7AoIFqesIXflm138G0dNYhhH6xWGn5wvscIW5nHdJpagKbb200chKtLK1C';

    return (
        <StripeCheckout
            label='Pay now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image=''
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton