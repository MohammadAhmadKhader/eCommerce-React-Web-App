import { RouterProvider } from "react-router-dom";
import { router } from "./layouts/Routes"
import WindowWidthProvider  from "./components/features/WindowWidthFeature/WindowWidthProvider";
import ThemeProvider from './components/features/ThemeFeature/ThemeProvider'
import UserProvider from "./components/features/UserFeature/UserProvider";

function App() {
  return (
    <>
      <WindowWidthProvider>
        <ThemeProvider >
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </ThemeProvider>
      </WindowWidthProvider>
    </>
  )
}

export default App
