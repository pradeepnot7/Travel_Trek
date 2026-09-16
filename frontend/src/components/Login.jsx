import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';

const Login = ({
  onNavigateHome,
  onNavigateRegister,
}) => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (
      loginUser.fulfilled.match(result) &&
      onNavigateHome
    ) {
      onNavigateHome();
    }
  };

  return (
    <div className="auth-form-page">

      <div className="auth-form-container">

        <div className="auth-form-heading">

          <span className="auth-eyebrow">
            WELCOME BACK
          </span>

          <h2>
            Sign in to TravelTrek
          </h2>

          <p>
            Pick up where you left off and
            continue planning your next journey.
          </p>

        </div>


        {/* QUICK VALUE CARDS */}

        <div className="auth-value-row">

          <div>
            <span className="auth-value-number">
              01
            </span>

            <div>
              <strong>
                Your journeys
              </strong>

              <small>
                Keep every trip organised.
              </small>
            </div>
          </div>

          <div>
            <span className="auth-value-number">
              02
            </span>

            <div>
              <strong>
                Curated places
              </strong>

              <small>
                Discover your next destination.
              </small>
            </div>
          </div>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="auth-field">

            <label htmlFor="login-email">
              Email Address
              <span>*</span>
            </label>

            <input
              id="login-email"
              className="auth-input"
              type="email"
              placeholder="traveler@domain.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-field">

            <div className="auth-label-row">

              <label htmlFor="login-password">
                Account Password
                <span>*</span>
              </label>

              <small>
                Secure access
              </small>

            </div>

            <div className="auth-password">

              <input
                id="login-password"
                className="auth-input"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
              >
                {showPassword
                  ? 'Hide'
                  : 'Show'}
              </button>

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div
              className="auth-error"
              role="alert"
            >
              {typeof error === 'string'
                ? error
                : 'Unable to sign in. Please check your credentials.'}
            </div>
          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >
            <span>
              {loading
                ? 'Signing in…'
                : 'Access Hub'}
            </span>

            {!loading && (
              <span>
                →
              </span>
            )}
          </button>

        </form>


        {/* SWITCH */}

        <div className="auth-switch">

          <span>
            New to TravelTrek?
          </span>

          <button
            type="button"
            onClick={onNavigateRegister}
          >
            Create an account
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;