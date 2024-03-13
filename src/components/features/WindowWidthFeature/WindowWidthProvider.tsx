import { createContext, ReactNode, FC, useEffect, useState } from 'react'
import { IWindowWidthContextType } from '../../../types/types';

export const WindowWidthContext = createContext<IWindowWidthContextType>({
  windowWidth: window.innerWidth,
});

const WindowWidthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = ()=>{
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize",resizeListener)

    return () => {
      removeEventListener("resize", resizeListener);
    }
  }, [windowWidth])

  return (
    <WindowWidthContext.Provider value={{ windowWidth }}>
      {children}
    </WindowWidthContext.Provider>
  )
}

export default WindowWidthProvider;