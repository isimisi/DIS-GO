import ReactDOM from 'react-dom/client';
import React from 'react';
import SnackBar from '../components/SnackBarNotification';

const triggerSnackbar = (title, message, messageType, { timer = 4000 }) => {
   const validMessageTypes = ['error', 'info', 'warning', 'success'];
   if (!validMessageTypes.includes(messageType)) {
      throw Error('Invalid snackbar message type');
   }
   const snackbar = ReactDOM.createRoot(
      document.getElementById('snackbar-fixed-container')
   );
   snackbar.render(
      <React.StrictMode>
         <SnackBar
            messageType={messageType}
            timer={timer}
            title={title}
            message={message}
            root={snackbar}
         />
      </React.StrictMode>
   );
};

export const showErrorMessage = (title, message, timer = 3000) => {
   triggerSnackbar(title, message, 'error', { timer });
};

export const showInfoMessage = (title, message) => {
   triggerSnackbar(title, message, 'info');
};

export const showSuccessMessage = (title, message, timer = 3000) => {
   triggerSnackbar(title, message, 'success', { timer });
};

export const showWarningMessage = (title, message) => {
   triggerSnackbar(title, message, 'warning');
};
