import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function Profile() {
    const navigate = useNavigate();

    const {
        setIsLoggedIn,
        setUserName
    } = useAppContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem('auth-token');
            const storedEmail = sessionStorage.getItem('email');

            if (!token || !storedEmail) {
                navigate('/app/login');
                return;
            }

            try {
                const response = await fetch(
                    `${urlConfig.backendUrl}/api/auth/update`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            email: storedEmail
                        }
                    }
                );

                const json = await response.json();

                if (response.ok) {
                    setFirstName(json.firstName || '');
                    setLastName(json.lastName || '');
                    setEmail(json.email || '');
                } else {
                    setError(
                        json.error || 'Unable to load profile'
                    );
                }

            } catch (err) {
                console.error('Profile fetch error:', err);

                setError(
                    'Unable to load profile. Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        const storedEmail = sessionStorage.getItem('email');

        try {
            const response = await fetch(
                `${urlConfig.backendUrl}/api/auth/update`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type': 'application/json',
                        email: storedEmail
                    },

                    body: JSON.stringify({
                        firstName,
                        lastName
                    })
                }
            );

            const json = await response.json();

            if (response.ok && json.authtoken) {

                // Save newly generated JWT
                sessionStorage.setItem(
                    'auth-token',
                    json.authtoken
                );

                // Update stored name
                sessionStorage.setItem(
                    'name',
                    firstName
                );

                // Update Navbar immediately
                setUserName(firstName);
                setIsLoggedIn(true);

                setMessage(
                    'Profile updated successfully'
                );

            } else {
                setError(
                    json.error ||
                    json.message ||
                    'Unable to update profile'
                );
            }

        } catch (err) {
            console.error('Profile update error:', err);

            setError(
                'Unable to update profile. Please try again.'
            );
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow-sm p-4">

                        <h2 className="text-center mb-4">
                            My Profile
                        </h2>

                        {message && (
                            <div className="alert alert-success">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleUpdate}>

                            <div className="mb-3">

                                <label
                                    htmlFor="firstName"
                                    className="form-label"
                                >
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-4">

                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    disabled
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Update Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Profile;