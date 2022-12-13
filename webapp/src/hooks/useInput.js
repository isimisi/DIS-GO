import { useReducer } from 'react';

const initalState = {
   value: '',
   isTouched: false,
};
/**
 *
 * @param {*} state
 * @param {{type: 'INPUT' | 'BLUR' | 'RESET', payload: any}} action
 * @returns
 */
const inputStateReducer = (state, action) => {
   switch (action.type) {
      case 'INPUT': {
         return {
            ...state,
            value: action.payload,
         };
      }

      case 'BLUR': {
         return {
            ...state,
            isTouched: true,
         };
      }

      case 'RESET': {
         return initalState;
      }

      default: {
         return state;
      }
   }
};

const useInput = (validateValueFn) => {
   const [inputState, disptach] = useReducer(inputStateReducer, initalState);

   const valueIsValid = validateValueFn
      ? validateValueFn(inputState.value)
      : inputState.value.trim().length !== 0;

   const hasError = !valueIsValid && inputState.isTouched;

   const valueChangeHandler = (e) => {
      disptach({
         type: 'INPUT',
         payload: e.target.value,
      });
   };

   const inputBlurHandler = (e) => {
      disptach({
         type: 'BLUR',
      });
   };

   const reset = () => {
      disptach({ type: 'RESET' });
   };

   return {
      value: inputState.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset,
   };
};

export default useInput;
