import { Instance } from "mobx-state-tree"
import { createContext } from "react"

import { mstStore } from "../store/mst-store"

export const RootStoreContext = createContext<null | Instance<typeof mstStore>>(null)

export const StoreProvider = RootStoreContext.Provider
