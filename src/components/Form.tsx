import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
  faClipboard,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'astro:transitions/client'
import { useState } from 'react'

import toast from 'react-hot-toast'

export default function Form() {
  const [disabled, setDisabled] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setDisabled(true)
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      nameInput: HTMLInputElement
      emailInput: HTMLInputElement
    }
    const name = formElements.nameInput.value
    const email = formElements.emailInput.value

    try {
      const request = fetch(
        'https://activepieces.gpul.org/api/v1/webhooks/vk6LQyvRYVhV5AAhCWM7N/sync',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
        }
      )

      toast.promise(request, {
        loading: 'Un momentito...',
        success: '¡Listo, estás en la lista!',
        error: 'Ha ocurrido un error...',
      })

      await request

      setTimeout(() => {
        setSent(true)
      }, 1000)
    } catch (error) {
      console.error('Error:', error)
      setDisabled(false)
    }
  }

  if (!sent)
    return (
      <div id="waitlist-form">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faUser}
                className="h-5 w-5 text-gray-500"
              />
            </span>
            <input
              id="nameInput"
              type="text"
              required
              className="block w-full rounded-lg border border-gray-800 bg-gray-900 p-2.5 pl-10 font-light text-gray-300 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-indigo-500 focus:ring-opacity-60"
              placeholder="Introduce tu nombre"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-5 w-5 text-gray-500"
              />
            </span>
            <input
              id="emailInput"
              type="email"
              required
              className="block w-full rounded-lg border border-gray-800 bg-gray-900 p-2.5 pl-10 font-light text-gray-300 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-indigo-500 focus:ring-opacity-60"
              placeholder="Un correo electrónico"
            />
          </div>

          <button
            type="submit"
            className="hover group relative w-full rounded-lg bg-gray-800 p-2.5 text-center font-light text-gray-400"
            disabled={disabled}
          >
            Unirse a la waitlist
            <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-3">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-gray-500"
              />
            </div>
          </button>
        </form>
        <p className="mt-2 text-center text-xs font-light text-white/50">
          Al enviar, aceptas la{' '}
          <a href="/privacy" className="underline">
            política de privacidad
          </a>
          .
        </p>
      </div>
    )

  return (
    <div className="flex h-[200px] flex-col space-y-5 text-center text-white/75">
      <h2>¡Compártelo con tus amigos!</h2>
      <textarea
        readOnly
        className="block h-[90px] w-full cursor-text resize-none rounded-lg border border-gray-800 bg-gray-900 p-2.5 text-sm font-light text-gray-300 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-indigo-500 focus:ring-opacity-60"
        value="¡Únete a la waitlist de HackUDC y no te pierdas nada! Ya puedes ver el aftermovie de la última edición: https://hackudc.gpul.org"
        onClick={() => {
          navigator.clipboard.writeText(
            '¡Únete a la waitlist de HackUDC y no te pierdas nada! Ya puedes ver el aftermovie de la última edición: https://hackudc.gpul.org'
          )
          toast.success('¡Copiado al portapapeles!', {
            id: 'clipboard',
            icon: <FontAwesomeIcon icon={faClipboard} />,
          })
        }}
      />
      <button
        type="button"
        className="hover group relative w-full rounded-lg bg-gray-800 p-2.5 text-center font-light text-gray-400"
        onClick={() => navigate('https://www.youtube.com/watch?v=Z4itLbMdTYM')}
      >
        Ver el aftermovie
        <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-5">
          <FontAwesomeIcon icon={faYoutube} className="h-5 w-5 text-gray-500" />
        </div>
      </button>
    </div>
  )
}
