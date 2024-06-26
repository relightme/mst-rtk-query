import { useContext } from "react"

import { RootStoreContext } from "../utils/StoreProvider"

export function useStore() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider")
  }
  return store
}
