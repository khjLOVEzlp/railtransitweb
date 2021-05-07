import { useEffect } from "react"

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