import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

interface InputTextProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'date'
  required?: boolean
  placeholder?: string
  icon?: IconDefinition
  tooltip?: string
}

export default function InputText({
  id,
  label,
  required = false,
  placeholder = '',
  icon,
  tooltip,
}: InputTextProps) {
  return (
    <div className="w-full col-span-2">
      <div className="m-1 flex items-center space-x-1">
        {required && <span className="text-red-500">*</span>}
        <label htmlFor={id} className="text-sm text-white/75">
          {label}
        </label>
        {tooltip && (
          <div className="group relative flex items-center" tabIndex={0} aria-label={tooltip}>
            <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4 cursor-pointer text-white/50" />
            <div className="absolute left-0 top-full z-10 mt-1 hidden w-max max-w-xs rounded-lg bg-black p-2 text-xs text-white shadow-md group-hover:block group-focus:block">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-4 left-0 flex items-start pl-3">
            <FontAwesomeIcon icon={icon} className="h-5 w-5 text-white/50" />
          </span>
        )}
        <textarea
          id={id}
          required={required}
          className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-white placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
