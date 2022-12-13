import { ColorRing } from 'react-loader-spinner';

export default function Loader({ height = 40, width = 40 }) {
   return (
      <ColorRing
         visible={true}
         height={height}
         width={width}
         ariaLabel="blocks-loading"
         wrapperStyle={{}}
         wrapperClass="blocks-wrapper"
         colors={['#DFF6FF', '#A27B5C', '#607EAA', '#E1CEB5', '#FFE7CC']}
      />
   );
}
