import { Oval } from 'react-loader-spinner';
import './Loader.css';
export const Loader = () => {
  return (
    <div className='loader'>
      <Oval color={'var(--primary-color)'} />
    </div>
  );
};
