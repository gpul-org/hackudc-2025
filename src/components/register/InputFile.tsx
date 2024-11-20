interface InputFileProps {
  id: string
  label: string
  required?: boolean
  accept?: string
}

export default function InputFile({ id, label, required = false, accept }: InputFileProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-light text-white/75">
        {required && <span className="text-red-500">* </span>}
        {label}
      </label>
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
