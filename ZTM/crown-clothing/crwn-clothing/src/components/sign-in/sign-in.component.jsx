import React, {useState} from 'react';

import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' })

    const { email, password } = userCredentials;

    const handleSubmit = async event =>{
        event.preventDefault();

        /*const {emailSignInStart} = this.props;*/

        emailSignInStart(email, password);

        //state will be handled by redux and sagas
        /*try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''});

        }catch(error){
            console.log(error);
        }

        this.setState({email: '', password: ''})*/
    }

    const handleChange = event =>{
        const { value, name } = event.target;

        setCredentials( {...userCredentials,[name]: value} );
    }

    return(
        <div className='sign-in'>
            <h2>I already hace an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                name='email' 
                value={email} 
                label="Email"
                handleChange={handleChange} 
                required
                />
                

                <FormInput 
                name='password' 
                type='password' 
                value={password} 
                label="Password"
                handleChange={handleChange} 
                required
                />
                
                <div className='buttons'>
                <CustomButton type="submit" >Sign In</CustomButton>
                <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispatchToProps)(SignIn);