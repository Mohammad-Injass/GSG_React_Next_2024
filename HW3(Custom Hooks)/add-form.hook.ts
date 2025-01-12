import { useState } from "react";
import { IStudent } from "../types";

const useAddFormStudent = (
    INITIAL_value: any,
    onSubmit: any,
    validate_data: any,
) => {
    const [student, setStudent] = useState<IStudent>(INITIAL_value);
    const [errorsList, setErrorsList] = useState<string[]>([]);

    const handleChange = (field: string, value: any) => {
        setStudent({ ...student, [field]: value });
    };

    const handleSubmit = () => {
        const newStudent: IStudent = { ...student, id: Date.now().toString() };

        const errors = validate_data(newStudent);
        if (errors.length > 0) {
            setErrorsList(errors);
        } else {
            setErrorsList([]);
            onSubmit(newStudent);
            handleClear();
        }
    };

    const handleClear = () => {
        setStudent(INITIAL_value);
    };

    const handleCoursesChange = (list: any) => {
        setStudent({ ...student, coursesList: list });
      }

    return {
        student,
        errorsList,
        handleChange,
        handleClear,
        handleSubmit,
        handleCoursesChange,
    }
};
export default useAddFormStudent;
