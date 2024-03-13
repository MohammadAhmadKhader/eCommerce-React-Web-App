import {  SetStateAction, useContext, useEffect, useState } from 'react'
import { CiFilter } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import { IResponsiveSortFilterControl } from '../../../types/types';
import { WindowWidthContext } from '../../features/WindowWidthFeature/WindowWidthProvider';


function ResponsiveSortFilterControl(
  { isResponsiveFilterActive, setIsResponsiveFilterActive, isResponsiveSortActive
    , setIsResponsiveSortActive, SortComponent, FilterComponent }: IResponsiveSortFilterControl) {

  const [layout, setLayout] = useState<ModalDialogProps["layout"] | undefined>(
    undefined,
  );
  const { theme } = useContext(ThemeContext)

  const { windowWidth } = useContext(WindowWidthContext)
    useEffect(() => {
        if (windowWidth >= 768) {
            setLayout(undefined)
        }
    }, [windowWidth])
  return (
    <div className='md:hidden flex gap-x-5 justify-end w-full'>
      <Button
        onClick={() => {
          setLayout("fullscreen");
          setIsResponsiveSortActive(true)
        }}
        className='flex items-center gap-x-2 font-semibold text-lg opacity-80 hover:opacity-100 duration-300'
      >
        <span>Sort </span>
        <span>
          <GoSortDesc size={25} />
        </span>
      </Button>

      <Button
        onClick={() => {
          setLayout("fullscreen");
          setIsResponsiveFilterActive(true)
        }}
        className='flex items-center gap-x-2 font-semibold text-lg opacity-80 hover:opacity-100 duration-300'>

        <span>
          Filter
        </span>
        <span>
          <CiFilter size={25} />
        </span>
      </Button>


      <Modal open={!!layout} onClose={() => {
        setLayout(undefined)
        setIsResponsiveFilterActive(false)
        setIsResponsiveSortActive(false)
      }}>
        <ModalDialog layout={layout} sx={{
          backgroundColor: theme === "dark" ? "var(--dark--bg--color)" : "var(--light--bg--color)",
          color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)"
        }}>
          <ModalClose />
          <DialogTitle>
            {isResponsiveFilterActive ? "Filter" : ""}
            {isResponsiveSortActive ? "Sort" : ""}
          </DialogTitle>
          <DialogContent >
            <div>
              {isResponsiveFilterActive ? <FilterComponent /> : ""}
              {isResponsiveSortActive ? <SortComponent /> : ""}
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  )
}

export default ResponsiveSortFilterControl
