import { useState as reactUseState } from 'react';
declare type FunctionPromiseReturnType<T> = T extends {
    [key: string]: (...args: any[]) => PromiseLike<infer RT>;
} ? RT : unknown;
interface BaseActions<RetType> {
    [key: string]: (...args: any[]) => RetType;
}
declare type FunctionForFirstParamType<ParamType> = (arg0: ParamType) => void;
declare type FunctionForInitialStateType<StateType> = StateType extends PromiseLike<infer IS> ? IS | null : StateType;
declare type Nullable<T> = T | null;
interface ActionAndArgs {
    actionName: string;
    action: (...args: any[]) => any;
    args: any[];
}
interface Queue {
    isActive: boolean;
    runningAction: Nullable<ActionAndArgs>;
    pendingActions: ActionAndArgs[];
}
interface Error {
    reason: any;
    failedAction: ActionAndArgs;
    pendingActions: ActionAndArgs[];
    runFailedAction: () => void;
    runPendingActions: () => void;
    runAllActions: () => void;
}
export declare function useSimpleReducer<InitialState, Actions extends BaseActions<any>>(initialState: InitialState, actions: Actions, useState?: typeof reactUseState): [
    FunctionPromiseReturnType<Actions> | FunctionForInitialStateType<InitialState>,
    {
        [PropertyType in keyof Actions]: FunctionForFirstParamType<Parameters<Actions[PropertyType]>[1]>;
    },
    Queue,
    Nullable<Error>
];
export {};
