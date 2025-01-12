import { useEffect, useState } from 'react';
import './add-form.css';
import { IStudent } from '../../types';
import CoursesListForm from '../courses-list-form/courses-list-form.component';
import { validateStudent } from '../../utils/validation.ts';
import useAddFormStudent from '../../hooks/add-form.hook.ts';

const INITIAL_STUDENT = { age: 0, coursesList: [], id: '', isGraduated: false, name: '', absents: 0 };

interface IProps {
    className?: string;
    onSubmit: (std: IStudent) => void;
}

const AddForm = (props: IProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const form = useAddFormStudent(INITIAL_STUDENT, props.onSubmit, validateStudent);

    return (
        <div className={`wrapper ${props.className} ${isOpen ? 'open' : 'closed'}`}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <span>&and; Close </span> : <span>&or; Open </span>}
                Add Form
            </button>
            <div className="input">
                <label htmlFor="name">Student Name: </label>
                <input
                    id="name"
                    type="text"
                    value={form.student.name}
                    onChange={e => form.handleChange('name', e.target.value)}
                />
            </div>
            <div className="input">
                <label htmlFor="age">Student Age: </label>
                <input
                    id="age"
                    type="number"
                    min={17}
                    max={40}
                    value={form.student.age}
                    onChange={e => form.handleChange('age', e.target.value)}
                />
            </div>
            <div className="input">
                <label htmlFor="isGraduated">Is Student Graduated: </label>
                <input
                    id="isGraduated"
                    type="checkbox"
                    checked={form.student.isGraduated}
                    onChange={e => form.handleChange('isGraduated', e.target.checked)}
                />
            </div>
            <div>
                <CoursesListForm value={form.student.coursesList} onSubmit={form.handleCoursesChange} />
            </div>
            <div className="Actions">
                <button
                    onClick={form.handleSubmit}
                    style={{ color: form.errorsList.length ? 'red' : 'initial' }}
                // disabled={errorsList.length > 0}
                >
                    Submit
                </button>
                <button onClick={form.handleClear}>Clear</button>
            </div>
            {
                Boolean(form.errorsList.length) && (
                    <div className='report'>
                        <h4>You have the following error/s:</h4>
                        {
                            form.errorsList.map(error => <p key={error}>- {error}</p>)
                        }
                    </div>
                )
            }
        </div>
    )
};

export default AddForm;