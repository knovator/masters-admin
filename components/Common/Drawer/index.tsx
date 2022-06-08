// import { Dialog, Transition } from "@headlessui/react"
import CloseIcon from "icons/closeIcon"

interface DrawerWrapperProps extends React.PropsWithChildren {
  open: boolean
  onClose: () => void
  title?: string
  footerContent?: React.ReactNode
}

const DrawerWrapper = ({ children, open, onClose, title, footerContent }: DrawerWrapperProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 overflow-hidden" aria-labelledby="modal" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="opacity-100">
          <div
            className="absolute inset-0 transition-opacity bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={onClose}
          />
        </div>
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="relative w-screen max-w-xl">
            <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 transition bg-white rounded-full focus:outline-none hover:rotate-90"
                onClick={onClose}
              >
                <span className="sr-only">Close panel</span>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
              <div className="px-4 py-6 border-b border-light-gray sm:px-6 bg-slate-300">
                <p className="text-xl font-medium">{title}</p>
              </div>
              <div className="relative flex-1 px-6 py-6 overflow-auto">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
              {footerContent && (
                <div className="flex items-center justify-end gap-3 px-4 py-4 border-t modal-footer bg-slate-300 border-light-gray">
                  {footerContent}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawerWrapper
