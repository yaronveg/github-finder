import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
        {alert.msg}
      </div>
    )
  );
};
