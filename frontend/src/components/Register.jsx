import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';

const ROLES = [
  {
    value: 'TRAVELER',
    title: 'Traveler',
    description: 'Personal journeys',
    code: 'TR',
  },
  {
    value: 'TOUR_AGENT',
    title: 'Tour Agent',
    description: 'Build experiences',
    code: 'TA',
  },
  {
    value: 'AGENCY_MANAGER',
    title: 'Agency Manager',
    description: 'Agency operations',
    code: 'AM',
  },
];

const Register = ({
  onNavigateLogin,
}) => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'TRAVELER',
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const updateField =
    (field) => (event) => {
      setForm((current) => ({
        ...current,
        [field]:
          event.target.value,
      }));
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      registerUser(form)
    );

    if (
      registerUser.fulfilled.match(result) &&
      onNavigateLogin
    ) {
      onNavigateLogin();
    }
  };

  const selectedRole =
    ROLES.find(
      (role) =>
        role.value === form.role
    );

  return (
    <div className="auth-form-page">

      <div className="auth-form-container register-container">

        <div className="auth-form-heading">

          <span className="auth-eyebrow">
            BEGIN EXPLORING
          </span>

          <h2>
            Create your account
          </h2>

          <p>
            Set up your TravelTrek workspace
            and start building better journeys.
          </p>

        </div>


        {/* REGISTER FORM */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="auth-field">

            <label htmlFor="register-name">
              Full Name
              <span>*</span>
            </label>

            <input
              id="register-name"
              className="auth-input"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={updateField(
                'fullName'
              )}
              autoComplete="name"
              required
            />

          </div>


          {/* EMAIL */}

          <div className="auth-field">

            <label htmlFor="register-email">
              Email Address
              <span>*</span>
            </label>

            <input
              id="register-email"
              className="auth-input"
              type="email"
              placeholder="you@domain.com"
              value={form.email}
              onChange={updateField(
                'email'
              )}
              autoComplete="email"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-field">

            <div className="auth-label-row">

              <label htmlFor="register-password">
                Account Password
                <span>*</span>
              </label>

              <small>
                8+ characters
              </small>

            </div>

            <div className="auth-password">

              <input
                id="register-password"
                className="auth-input"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="••••••••"
                value={form.password}
                onChange={updateField(
                  'password'
                )}
                autoComplete="new-password"
                minLength={8}
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


          {/* ROLE */}

          <div className="auth-role-section">

            <div className="auth-role-heading">

              <div>

                <label>
                  Workspace role
                </label>

                <small>
                  Choose the workspace that matches
                  how you use TravelTrek.
                </small>

              </div>

              <span>
                REQUIRED
              </span>

            </div>


            <div className="auth-role-selector">

              {ROLES.map((role) => {

                const selected =
                  form.role ===
                  role.value;

                return (
                  <button
                    key={role.value}
                    type="button"
                    className={`auth-role ${
                      selected
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() =>
                      setForm(
                        (current) => ({
                          ...current,
                          role:
                            role.value,
                        })
                      )
                    }
                  >

                    <span className="auth-role-code">
                      {role.code}
                    </span>

                    <span className="auth-role-copy">

                      <strong>
                        {role.title}
                      </strong>

                      <small>
                        {role.description}
                      </small>

                    </span>

                    {selected && (
                      <span className="auth-role-check">
                        ✓
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

            <div className="auth-selected-role">
              Workspace:
              <strong>
                {selectedRole.title}
              </strong>
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
                : 'Registration failed. Please check your details.'}
            </div>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="auth-submit"
          >

            <span>
              {loading
                ? 'Creating account…'
                : `Create ${selectedRole.title} Account`}
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
            Already have an account?
          </span>

          <button
            type="button"
            onClick={onNavigateLogin}
          >
            Sign in
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;