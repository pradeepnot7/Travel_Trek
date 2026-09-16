import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthShell = () => {
  const [authView, setAuthView] = useState('login');

  const isRegister = authView === 'register';

  return (
    <div className="auth-shell">

      {/* =================================================
          FIXED BRAND / IMAGE PANEL
      ================================================= */}

      <section className="auth-brand-panel">

        <div className="auth-brand">
          TRAVELTREK
        </div>

        <div className="auth-brand-content">

          <span className="auth-brand-eyebrow">
            PLAN · DISCOVER · GO
          </span>

          <h1>
            Make the journey
            <br />
            worth remembering.
          </h1>

          <p>
            One workspace for discovering destinations,
            shaping itineraries and keeping every booking
            in view.
          </p>

          <div className="auth-metrics">

            <div>
              <strong>12k+</strong>
              <span>trips planned</span>
            </div>

            <div>
              <strong>340+</strong>
              <span>destinations</span>
            </div>

            <div>
              <strong>4.9</strong>
              <span>average rating</span>
            </div>

          </div>

        </div>

        <div className="auth-brand-footer">
          Travel planning, made clearer.
        </div>

      </section>


      {/* =================================================
          SLIDING AUTH AREA
      ================================================= */}

      <section className="auth-form-viewport">

        <div
          className={`auth-form-track ${
            isRegister ? 'show-register' : 'show-login'
          }`}
        >

          {/* LOGIN */}
          <div className="auth-form-screen">

            <Login
              onNavigateHome={() => {}}
              onNavigateRegister={() =>
                setAuthView('register')
              }
            />

          </div>


          {/* REGISTER */}
          <div className="auth-form-screen">

            <Register
              onNavigateLogin={() =>
                setAuthView('login')
              }
            />

          </div>

        </div>

      </section>

    </div>
  );
};

export default AuthShell;