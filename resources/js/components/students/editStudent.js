import React, {useState, useEffect} from "react";
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

export default function editStudent (props) {
    const [newStudentValues, setNewStudentValues] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone": ""
    });

    const [startValidating, setStartValidating] = useState(false);
    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm();

    const firstName = register("first_name", { required: true });
    const lastName = register("last_name", { required: true });
    const email = register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })
    const phone = register("phone", { required: true, pattern: /[0-9]+$/i });

    useEffect(() => {
        setNewStudentValues({
            "first_name": props.editStudentData.first_name,
            "last_name": props.editStudentData.last_name,
            "email": props.editStudentData.email,
            "phone": props.editStudentData.phone
        });
        setStartValidating(false);
    }, [props.toggleEditStudentModal])

    const onSubmit = (data) => {
        props.updateStudent();
        reset();
    }

    const onFormChange = (e) => {
        newStudentValues[e.target.name]=e.target.value;
        setNewStudentValues(newStudentValues);
        if (startValidating) {
            setValue(
                e.target.name,
                e.target.value,
                {
                    shouldValidate: true,
                    shouldDirty: true
                }
            );
        }
        props.onChangeEditStudentHanler(e);
    }

    const onSubmitBtnClick = () => {
        setStartValidating(true);
        setValue("first_name", newStudentValues.first_name);
        setValue("last_name", newStudentValues.last_name);
        setValue("email", newStudentValues.email);
        setValue("phone", newStudentValues.phone);
    }

    return (
        <div>
            <Modal
                isOpen={props.editStudentModal}
                toggle={props.toggleEditStudentModal}
            >
                <ModalHeader toggle={props.toggleEditStudentModal}>Update Student</ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                defaultValue={props.editStudentData.first_name}
                                onChange={(e) => {
                                    firstName.onChange(e);
                                    onFormChange(e);
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
                                defaultValue={props.editStudentData.last_name}
                                onChange={(e) => {
                                    lastName.onChange(e);
                                    onFormChange(e);
                                }}
                                onBlur={lastName.onBlur}
                                ref={lastName.ref}
                            />
                            {errors["last_name"] && <small style={{color: "red"}}>Zaza first name</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                defaultValue={props.editStudentData.email}
                                onChange={(e) => {
                                    email.onChange(e);
                                    onFormChange(e);
                                }}
                                onBlur={email.onBlur}
                                ref={email.ref}
                            />
                            {errors["email"] && <small style={{color: "red"}}>Zaza first name</small>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                defaultValue={props.editStudentData.phone}
                                onChange={(e) => {
                                    phone.onChange(e);
                                    onFormChange(e);
                                }}
                                onBlur={phone.onBlur}
                                ref={phone.ref}
                            />
                            {errors["phone"] && <small style={{color: "red"}}>Zaza first name</small>}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={onSubmitBtnClick}>Update</Button>
                        <Button color="secondary" onClick={props.toggleEditStudentModal}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}