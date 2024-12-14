import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

interface InputCheckboxProps {
  id: string
  label: string
  required?: boolean
  tooltip?: string
}

export default function InputCheckbox({ id, label, required = false, tooltip }: InputCheckboxProps) {
  return (
    <div className="flex w-full items-center space-x-2">
      <input
        id={id}
        name={id}
        type="checkbox"
        required={required}
        className="h-5 w-5 rounded border border-white/20 bg-white/5 text-green-500 focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
      />
      <div className="flex items-center space-x-1">
        {required && <span className="text-red-500">*</span>}
        <label htmlFor={id} className="text-sm text-white/75">
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
    </div>
  )
}
