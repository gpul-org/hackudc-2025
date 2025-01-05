import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import toast from 'react-hot-toast'
import InputText from './InputTextFull'

export default function Form() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      toast.loading('Un momentito...')
      const response = await fetch('https://activepieces.gpul.org/api/v1/webhooks/vk6LQyvRYVhV5AAhCWM7N/sync', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.remove()
        toast.success('¡Listo!')

        // Await the timeout for redirection to prevent re-clicking
        await new Promise((resolve) => setTimeout(resolve, 2000))

        window.location.href = '/'
      } else {
        toast.remove()
        const errorData = await response.json() // Optional: parse error response for more details
        console.error('Error response:', errorData)
        toast.error('Ha ocurrido un error...')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Ha ocurrido un error...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col w-full p-8 text-base gap-2 sm:gap-4" onSubmit={handleSubmit}>
      <InputText id="name" label="Nombre completo" placeholder="John Doe" required icon={faUser} />
      <InputText id="email" label="Email" type="email" placeholder="john@example.com" required icon={faEnvelope} />
          <button
            type="submit"
            className={`hover group relative col-span-2 w-full rounded-lg p-2.5 text-center font-light ${
              loading ? 'cursor-not-allowed bg-gray-500' : 'bg-green-900 text-white/75'
            }`}
            disabled={loading}
          >
            Apuntarme a la lista
            <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-3">
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5 text-white/50" />
            </div>
          </button>
          <p className="col-span-2 mt-2 text-center text-xs font-light text-white/75">
            Al enviar, aceptas la{' '}
            <a href="/privacidad" className="underline">
              política de privacidad
            </a>
            .
          </p>
    </form>
  )
}
