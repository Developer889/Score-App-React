import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './score.css'
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { db } from "../firebase";
import {
  getDocs,
  getDoc,
  collection,
  getCollection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import People from './People';
import _ from 'lodash'
function Score() {
    const navigate = useNavigate();

    const [name,setName]=useState("Ali");

    
    const [score,setScore]=useState(0)
    const [students, setStudents] = useState([]);
    const moviesCollectionRef = collection(db, "Score");
    useEffect(() => {
        const getUserList = async () => {
            try {
                const data = await getDocs(moviesCollectionRef)
                const filterD = data.docs.map((doc) =>
                ({
                    ...doc.data(),
                    id: doc.id
                })
                );
                setStudents(filterD)
                console.log('filter effect', filterD)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUserList()
    }, [])
    useEffect(() => {
      function search(nameKey, myArray){
        for (let i=0; i < myArray.length; i++) {
            // if (myArray[i].total) {
                return myArray[i].total;
            // }
        }
    }
      const moviesCollectionRefNew = doc(db, "Score",name);
      const getUserListUp = async () => {
          try {
              const data = await getDoc(moviesCollectionRefNew)
              const newscore=data.data();
              console.log(typeof(newscore))
              console.log("new",newscore)
              const last=newscore.total;
              
              setScore(last)
              
          }
          catch (err) {
              console.log(err)
          }
      }
      getUserListUp()
  }, [name])


    
    const deleteMovie = async (id) => {
      const movieDoc = doc(db, "Score", id);
      await deleteDoc(movieDoc);
    };
  
    const updateMovieTitle = async (id) => {
      const movieDoc = doc(db, "Score", id);
      await updateDoc(movieDoc, { total: score });
    };



    const handleChange = (event) => {
        setName(event.target.value);
        setScore(0);
      };

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

              <h2 className="fw-bold mb-2 text-center">Add Score</h2>
              <p className="text-dark-50 mb-3 text-center">Select Player and add score</p>
              <InputLabel id="demo-simple-select-label">Player</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              label="Name"
              onChange={handleChange}
              >
               
                {students.map((student) => (
                    
                        <MenuItem value={student.id} key={student.id}>{student.id}</MenuItem>
                   
                )
                )

                }

            
              {/* <MenuItem value={"Ali"}>Ali</MenuItem>
              <MenuItem value={"Asad"}>Asad</MenuItem>
              <MenuItem value={"Zeeshan"}>Zeeshan</MenuItem> */}
             </Select>
             {/* <TextField id="outlined-basic" label="Score" variant="outlined" className='mt-3 mb-3' value={score} disabled /> */}
             <p>Score: <span>{score}</span></p>
             <Box style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score)} >0</Button>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score+1)} >1</Button>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score+2)}>2</Button>
             </Box>
             <Box style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score+3)} >3</Button>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score+4)} >4</Button>
             <Button variant="contained" className='mt-3 mb-3' onClick={(e)=>setScore(score+6)}>6</Button>
             </Box>
             
              

              <MDBBtn size='lg' onClick={() => updateMovieTitle(name)}>
                Out
              </MDBBtn>

             

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Score;