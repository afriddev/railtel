/* eslint-disable @typescript-eslint/no-explicit-any */
export type dispatchDataType = {
    type: string,
    payload: any
  };

export type contextType = {
    dispatch: React.Dispatch<dispatchDataType>
    step:number
    selectedMenu:{
      title:string;
      desc:string;
      index:number
    }
}