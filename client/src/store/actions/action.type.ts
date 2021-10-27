// --- Actions typeset ---
import * as actions from './actions'
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

type InferActionType<T> = T extends {[key: string]: infer U} ? U : never

export type ActionsType = ReturnType<InferActionType<typeof actions>>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>