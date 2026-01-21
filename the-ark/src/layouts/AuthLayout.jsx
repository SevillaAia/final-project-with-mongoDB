import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h2>The Ark</h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
