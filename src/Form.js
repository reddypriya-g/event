import React, { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
        if (!age || age <= 0) newErrors.age = 'Age must be greater than 0';
        if (isAttendingWithGuest && !guestName) newErrors.guestName = 'Guest name is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            setSubmittedData({ name, email, age, isAttendingWithGuest, guestName });
            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="App">
            <h2>Event Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div>
                    <label>Are you attending with a guest?</label>
                    <input
                        type="checkbox"
                        checked={isAttendingWithGuest}
                        onChange={(e) => setIsAttendingWithGuest(e.target.checked)}
                    />
                </div>
                {isAttendingWithGuest && (
                    <div>
                        <label htmlFor="guestName">Guest Name:</label>
                        <input
                            type="text"
                            id="guestName"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                        {errors.guestName && <span className="error">{errors.guestName}</span>}
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
            {submittedData && (
                <div className="submitted-data">
                    <h3>Submitted Data</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{submittedData.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{submittedData.email}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td>{submittedData.age}</td>
                            </tr>
                            <tr>
                                <th>Attending with guest</th>
                                <td>{submittedData.isAttendingWithGuest ? 'Yes' : 'No'}</td>
                            </tr>
                            {submittedData.isAttendingWithGuest && (
                                <tr>
                                    <th>Guest Name</th>
                                    <td>{submittedData.guestName}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Form;
