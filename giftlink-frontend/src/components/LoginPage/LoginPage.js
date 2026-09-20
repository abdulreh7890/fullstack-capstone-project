import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for incorrect password/error message
    const [incorrectPassword, setIncorrectPassword] = useState('');

    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('auth-token');

    const { setIsLoggedIn, setUserName } = useAppContext();

    // If already logged in, navigate to MainPage
    if (bearerToken) {
        navigate('/app');
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(
                `${urlConfig.backendUrl}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            // Task 1: Access data returned from backend
            const json = await response.json();

            // Successful login
            if (json.authtoken) {

                // Task 2: Set user details in session storage
                sessionStorage.setItem(
                    'auth-token',
                    json.authtoken
                );

                sessionStorage.setItem(
                    'name',
                    json.userName
                );

                sessionStorage.setItem(
                    'email',
                    json.userEmail
                );

                // Task 3: Set user's login state
                setIsLoggedIn(true);
                setUserName(json.userName);

                // Clear previous error
                setIncorrectPassword('');

                // Task 4: Navigate to MainPage
                navigate('/app');

            } else {

                // Task 5: Clear password and show error
                setPassword('');

                setIncorrectPassword(
                    json.error || 'Invalid email or password'
                );
            }

        } catch (e) {
            console.log(
                "Error fetching details: " + e.message
            );

            setPassword('');

            setIncorrectPassword(
                'Unable to login. Please try again.'
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">

                        <h2 className="text-center mb-4 font-weight-bold">
                            Login
                        </h2>

                        {/* Task 6: Display error */}
                        {incorrectPassword && (
                            <div className="text-danger mb-3">
                                {incorrectPassword}
                            </div>
                        )}

                        <div className="mb-3">
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
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            New here?{' '}
                            <a
                                href="/app/register"
                                className="text-primary"
                            >
                                Register Here
                            </a>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;