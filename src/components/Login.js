import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './login.css'
import toast, { Toaster } from 'react-hot-toast';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getAuth
  } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const signin=()=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("email",email);
            console.log("password",password)
            // Signed in 
            const user = userCredential.user;
            if(user){
                alert("Success");
                navigate("/score");
            }
            else{
                alert("Failure")
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // alert(error.message)
            toast.error(error.message);
        });
    }
    
  return (
    <MDBContainer fluid>
        <Toaster />
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e)=>setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>setPassword(e.target.value)}/>

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

              <MDBBtn size='lg' onClick={()=>signin()}>
                Login
              </MDBBtn>

              {/* <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign in with facebook
              </MDBBtn> */}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;