import { ActionsType } from '../actions/action.type';

interface ICommon {
  isLoading: boolean;
  error: string;
}

const initialState: ICommon = {
  isLoading: false,
  error: '',
};

export default function commonReducer(
  state = initialState,
  action: ActionsType,
): ICommon {
  switch (action.type) {
    case 'Common/SET_IsLOADING':
      return { ...state, isLoading: true };
    case 'Common/RESET_IsLOADING':
      return { ...state, isLoading: false };
    case 'Common/SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
