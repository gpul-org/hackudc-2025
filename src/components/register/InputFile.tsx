import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
interface InputFileProps {
  id: string
  label: string
  required?: boolean
  accept?: string
  tooltip?: string
}

export default function InputFile({ id, label, required = false, accept, tooltip }: InputFileProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="m-1 flex items-center space-x-1">
        <label htmlFor={id} className="text-sm font-light text-white/75">
          {required && <span className="text-red-500">* </span>}
          {label}
        </label>
        {tooltip && (
          <div className="group relative flex items-center" tabIndex={0}>
            <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4 cursor-pointer text-white/50" />
            <div className="absolute left-1/2 top-full z-10 mt-1 hidden w-max max-w-xs -translate-x-1/2 rounded-lg bg-gray-800/90 p-2 text-xs text-white shadow-md group-hover:block group-focus:block">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type="file"
          required={required}
          accept={accept}
          className="file:h-10 file:cursor-pointer file:rounded-lg file:border file:border-white/20 file:bg-white/5 file:px-4 file:py-2 file:font-light file:text-white/75 file:transition-colors focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
        />
      </div>
    </div>
  )
}
