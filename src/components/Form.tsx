import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import {
  faClipboard,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faPhone,
  faCalendar,
  faUserGraduate,
  faLocationPin,
  faSchool,
  faWheatAwnCircleExclamation,
  faShirt
} from '@fortawesome/free-solid-svg-icons'
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
          <div class="flex flex-row gap-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faUser}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <input
                id="nameInput"
                type="text"
                required
                className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-white placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
                placeholder="Introduce tu nombre"
              />
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <input
                id="emailInput"
                type="email"
                required
                className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
                placeholder="Un correo electrónico"
              />
            </div>
          </div>
          <div class="flex flex-row gap-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <input
                id="phoneInput"
                type="text"
                required
                className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
                placeholder="Un número de teléfono"
              />
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <input
                id="calendarInput"
                type="text"
                required
                className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
                placeholder="Un número de teléfono"
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faSchool}
                className="h-5 w-5 text-white/50"
              />
            </span>
            <input
              id="studyLocationInput"
              type="text"
              required
              className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
              placeholder="Lugar de estudios"
            />
          </div>
          <div class="flex flex-row gap-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <select
              id="courseInput"
              type="text"
              required
              className="disabled:text-gray-200 block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
            >
                <option disabled selected hidden>Nivel de estudios</option>
                <option value="universidad">Universitarios</option>
                <option value="fp">Formación Profesional</option>
                <option value="secundaria">secundaria</option>
                <option value="otros">otros</option>
              </select>
            </div>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="h-5 w-5 text-white/50"
                />
              </span>
              <select
              id="courseInput"
              type="text"
              required
              className="disabled:text-gray-200 block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
            >
                <option disabled selected hidden>Curso</option>
                <option value="1">1º</option>
                <option value="2">2º</option>
                <option value="3">3º</option>
                <option value="4">4º</option>
                <option value="no-aplica">No aplica</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faLocationPin}
                className="h-5 w-5 text-white/50"
              />
            </span>
            <input
              id="courseInput"
              type="text"
              required
              className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
              placeholder="Ciudad de residencia"
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="h-5 w-5 text-white/50"
              />
            </span>
            <input
              id="courseInput"
              type="text"
              required
              className="block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
              placeholder="Género"
            />
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faWheatAwnCircleExclamation}
                className="h-5 w-5 text-white/50"
              />
            </span>
            <select
              id="courseInput"
              type="text"
              required
              className="disabled:text-gray-200 block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
            >
              <option disabled selected hidden>Restricciones alimentarias</option>
              <option value="nada">Sin restricciones</option>
              <option value="vegano">Vegano</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="sin-gluten">Sin glúten</option>
            </select>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon
                icon={faShirt}
                className="h-5 w-5 text-white/50"
              />
            </span>
            <select
              id="courseInput"
              type="text"
              required
              className="disabled:text-gray-200 block w-full rounded-lg border border-white/20 bg-white/5 p-2.5 pl-10 font-light text-gray-300 placeholder-white/50 focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-green-500 focus:ring-opacity-60"
            >
              <option disabled selected hidden>Talla de camiseta</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div>
            <input
              id="creditosInput"
              type="checkbox"
              required
              className="text-gray-300"
            />
            <label htmlFor="creditosInput" className="text-base"> ¿Solicitar créditos ECTS?</label>
          </div>
          <div>
            <input
              id="creditosInput"
              type="checkbox"
              required
              className="text-gray-300"
            />
            <label htmlFor="creditosInput" className="text-base"> Acepto el código de conducta y los términos del evento</label>
          </div>
          <div>
            <input
              id="creditosInput"
              type="checkbox"
              required
              className="text-gray-300"
            />
            <label htmlFor="creditosInput" className="text-base"> Acepto que se me podrá solicitar justificar la condición de estudiante antes del inicio del evento.</label>
          </div>

          <button
            type="submit"
            className="hover group relative w-full rounded-lg bg-green-900 p-2.5 text-center font-light text-white/75"
            disabled={disabled}
          >
            Registrarme en HackUDC
            <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-3">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-5 w-5 text-white/50"
              />
            </div>
          </button>
        </form>
        <p className="mt-2 text-center text-xs font-light text-white/75">
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
        className="hover group relative w-full rounded-lg bg-green-900 p-2.5 text-center font-light text-white/50"
        onClick={() => navigate('https://www.youtube.com/watch?v=Z4itLbMdTYM')}
      >
        Ver el aftermovie
        <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-5">
          <FontAwesomeIcon icon={faYoutube} className="h-5 w-5 text-white/75" />
        </div>
      </button>
    </div>
  )
}
