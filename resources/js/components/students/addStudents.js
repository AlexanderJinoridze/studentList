import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import { useForm } from "react-hook-form";

export default function addStudents (props) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const firstName = register("first_name", { required: true });
    const lastName = register("last_name", { required: true });
    const email = register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })
    const phone = register("phone", { required: true, pattern: /[0-9]+$/i });

    const onSubmit = (data) => {
        props.addStudent();
        reset();
    }

    return (
        <div>
            <Button
                className="float-right mb-4"
                color="primary"
                onClick={props.toggleNewStudentModal}
            >Add Student</Button>
            <Modal
                isOpen={props.newStudentModal}
                toggle={props.toggleNewStudentModal}
            >
                <ModalHeader toggle={props.toggleNewStudentModal}>Add new Student</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                onChange={(e) => {
                                    firstName.onChange(e);
                                    props.onChangeAddStudentHandler(e)
                                }}
                                onBlur={firstName.onBlur}
                                ref={firstName.ref}
                            />
                            {errors["first_name"] && <small style={{color: "red"}}>Zaza first name</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                onChange={(e) => {
                                    lastName.onChange(e);
                                    props.onChangeAddStudentHandler(e)
                                }}
                                onBlur={lastName.onBlur}
                                ref={lastName.ref}
                            />
                            {errors["last_name"] && <small style={{color: "red"}}>Zaza last name</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                onChange={(e) => {
                                    email.onChange(e);
                                    props.onChangeAddStudentHandler(e)
                                }}
                                onBlur={email.onBlur}
                                ref={email.ref}
                            />
                            {errors.email && <small style={{color: "red"}}>Zaza email</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                onChange={(e) => {
                                    phone.onChange(e);
                                    props.onChangeAddStudentHandler(e)
                                }}
                                onBlur={phone.onBlur}
                                ref={phone.ref}
                            />
                            {errors.phone && <small style={{color: "red"}}>Zaza phone</small>}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Add</Button>
                        <Button color="secondary" onClick={props.toggleNewStudentModal}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}