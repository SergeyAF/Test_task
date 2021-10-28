import { ActionsType } from '../actions/action.type';

interface ICommon {
  isLoading: boolean;
  error: string;
  connected: boolean;
}

const initialState: ICommon = {
  isLoading: false,
  error: '',
  connected: false,
};

export default function commonReducer(
  state = initialState,
  action: ActionsType,
): ICommon {
  switch (action.type) {
    case 'Common/SET_CONNECTION':
      return { ...state, connected: action.payload };
    case 'Common/CHANGE_IsLOADING':
      return { ...state, isLoading: action.payload };
    case 'Common/SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
