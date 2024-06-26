import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { store } from "./api/store"
import { StoreProvider } from "./utils/StoreProvider"
import { mstStore } from "./store/mst-store"
import { TodoApp } from "./components/App/App"

import "./index.css"

const container = document.getElementById("root")

if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <StoreProvider value={mstStore}>
      <Provider store={store}>
        <TodoApp />
      </Provider>
    </StoreProvider>
  )
}
