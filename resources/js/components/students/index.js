import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddStudents from './addStudents';
import EditStudent from './editStudent';

export default function Student () {
    const [isLoading,setIsLoading] = useState(false);

    const [students, setStudents] = useState([]);

    const [newStudentData, setNewStudentData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });
    const [newStudentModal,setNewStudentModal] = useState(false);

    const [editStudentData,setEditStudentData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });
    const [editStudentModal,setEditStudentModal] = useState(false);

    const [noDataFound,setNoDataFound] = useState("");

    let studentsDetails = [];

    const toggleNewStudentModal = () => {
        setNewStudentModal(!newStudentModal);
    }

    const toggleEditStudentModal = () => {
        setEditStudentModal(!editStudentModal);
    }

    const editStudent = (id, first_name, last_name, email, phone) => {
        setEditStudentData({ id, first_name, last_name, email, phone });
        setEditStudentModal(!editStudentModal);
    }

    const onChangeAddStudentHandler = (e) => {
        newStudentData[e.target.name] = e.target.value;
        setNewStudentData(newStudentData);
    }

    const onChangeEditStudentHanler = (e) => {
        editStudentData[e.target.name] = e.target.value;
        console.log(editStudentData);
        setEditStudentData(editStudentData);
    }

    const getStudents = () => {
        axios
            .get("http://larareact.test/api/students")
            .then((response) => {
                if (response.status === 200) {
                    setStudents(response.data.data ? response.data.data : []);
                }
                if (response.data.status === "failed" && response.data.success === false) {
                    setNoDataFound(response.data.message);
                }
            });
    }

    const addStudent = () => {
        axios
            .post(
                "http://larareact.test/api/create-student",
                newStudentData
            )
            .then((response) => {
                const newStudents = [...students];

                newStudents.push(response.data);

                setStudents(newStudents);
                setNewStudentModal(false);
                setNewStudentData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                });

                getStudents();
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response);
            });
    }

    const updateStudent = () => {
        let {id, first_name, last_name, email, phone} = editStudentData;

        setIsLoading(true);

        axios
            .post("http://larareact.test/api/create-student", {
                first_name,
                last_name,
                email,
                phone,
                id,
            })
            .then((response) => {
                getStudents();
                setEditStudentModal(false);
                setEditStudentData({ first_name, last_name, email, phone });
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response);
            });
    }

    const deletStudent = (id) => {
        setIsLoading(true);
        axios
            .delete("http://larareact.test/api/student/" + id)
            .then((response) => {
                setIsLoading(false);
                getStudents();
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getStudents();
    },[]);

    if (students.length) {
        studentsDetails = students.map((student) => {
            return (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.full_name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                        <Button
                            color="success"
                            className="mr-3"
                            size="sm"
                            onClick={() =>
                                editStudent(
                                    student.id,
                                    student.first_name,
                                    student.last_name,
                                    student.email,
                                    student.phone
                                )
                            }
                        >Edit</Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={() => deletStudent(student.id)}
                        >Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    if (isLoading) {
        return (
            <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <div className="App container mt-4">
            <h4 className="font-weight-bold">Students Registration</h4> 
            {/* Model for Add Studnet Record */}
            <AddStudents
                toggleNewStudentModal={toggleNewStudentModal}
                newStudentModal={newStudentModal}
                onChangeAddStudentHandler={onChangeAddStudentHandler}
                addStudent={addStudent}
                newStudentData={newStudentData}
            />
            {/* Model for Edit Studnet Record */}
            <EditStudent
                toggleEditStudentModal={toggleEditStudentModal}
                editStudentModal={editStudentModal}
                onChangeEditStudentHanler={onChangeEditStudentHanler}
                editStudent={editStudent}
                editStudentData={editStudentData}
                updateStudent={updateStudent}
            />
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {students.length !== 0 && (
                    <tbody>{studentsDetails}</tbody>
                )}
            </Table>
            {students.length === 0 && (
                <span>{noDataFound}</span>
            )}
        </div>
    );
}