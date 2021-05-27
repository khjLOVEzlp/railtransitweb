import {useCallback, useState} from "react";
import {useMountedRef} from "./useMountedRef";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef()

  const setData = useCallback((data: D) => setState({
    data,
    stat: 'success',
    error: null
  }), [])

  const setError = useCallback((error: Error) => setState({
    error,
    stat: 'error',
    data: null
  }), [])

  const run = useCallback((promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise数据类型')
    }
    setState(prevState => ({...prevState, stat: 'loading'}))
    return promise.then(data => {
      if (mountedRef.current) setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }, [mountedRef, setData, setError])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state
  }
}