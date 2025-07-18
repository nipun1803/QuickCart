import { useNavigate } from 'react-router-dom';
import '../Auth.css';
const Logout = () => {
  const navigate = useNavigate();
  return (
    <div className='logout-container'>
      <main className='logout-main-container'>
        <div className='logout-text'>
          <h2>You are currently logged Out</h2>
          <p>Don't miss out on latest deals.</p>
          <button
            className='btn btn-link-primary background-primary brd-rd-semi-sq'
            onClick={() => navigate('/products')}
          >
            See products
          </button>
        </div>
      </main>
    </div>
  );
};
export default Logout;
