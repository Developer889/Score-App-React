import React, { useEffect, useState } from 'react'

import { db } from "../firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

const People = () => {
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
    return (
        <div>People

            <div>
                {students.map((student) => (
                    <div>
                        <h1>{student.id}</h1>
                        {/* <h1>Out:{student.Out}</h1>
                        <h1>Name:{student.Name}</h1> */}
                    </div>
                )
                )

                }

            </div>
        </div>
    )
}

export default People