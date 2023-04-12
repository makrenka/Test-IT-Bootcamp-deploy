import imgError from '../../assets/img/error.gif';

import './ErrorMessage.scss';

export const ErrorMessage = () => (
    <img
        className='error-message'
        src={imgError}
        alt="Error"
    />
);