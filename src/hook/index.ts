import {useEffect, useRef, useState} from "react"
import {FormInstance} from "antd/lib/form";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export const resetRoute = () => window.location.href = window.location.origin

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

export const useAsync = <D>(initialState?: State<D>,) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise数据类型')
    }
    setState({ ...state, stat: 'loading' })
    return promise.then(data => {
      setData(data)
      return data
    }).catch(error => {
      setError(error)
      return error
    })
  }

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

export const useResetFormOnCloseModal = ({form, visible}: { form: FormInstance; visible: boolean }) => {
  const prevVisibleRef = useRef<boolean>();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};
