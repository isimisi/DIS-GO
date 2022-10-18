import React from 'react';
import { ColorRing } from 'react-loader-spinner';

function LoaderSpinner() {
   return (
      <div
         style={{
            margin: '10rem auto',
         }}>
         <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#DFF6FF', '#A27B5C', '#607EAA', '#E1CEB5', '#FFE7CC']}
         />
      </div>
   );
}

export default LoaderSpinner;
