import { Link } from 'react-router-dom';
import './Footer.css';
export const Footer = () => {
  return (
    <footer className='main-footer'>
      <div className='footer-links'>
        <a
          target={'_blank'}
          href='https://github.com/nipun1803'
          className='fab-github'
        ></a>
        <a
          target={'_blank'}
          href='https://www.linkedin.com/in/nipun-patlori-2a5bb830a/'
          className='fab-linkedin'
        ></a>
      </div>
      <div className='footer-text'>© {new Date().getFullYear()} Quickcart. All rights reserved.</div>
    </footer>
  );
};
