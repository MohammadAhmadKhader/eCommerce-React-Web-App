import { RouterProvider } from "react-router-dom";
import { router } from "./layouts/Routes"
import WindowWidthProvider from "./components/features/WindowWidthFeature/WindowWidthProvider";
import ThemeProvider from './components/features/ThemeFeature/ThemeProvider'
import UserProvider from "./components/features/UserFeature/UserProvider";
import CartProvider from "./components/features/CartFeature/CartProvider";
import GlobalCachingProvider from "./components/features/GlobalCachingContext/GlobalCachingProvider";

function App() {
  return (
    <>
      <WindowWidthProvider>
        <ThemeProvider >
          <UserProvider>
            <CartProvider>
              <GlobalCachingProvider>
                <RouterProvider router={router} />
              </GlobalCachingProvider>
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </WindowWidthProvider>
    </>
  )
}

export default App
