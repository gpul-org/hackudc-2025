import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faPhone,
  faCalendar,
  faSchool,
  faMapLocation,
  faGlobeEurope,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import toast from 'react-hot-toast'
import InputText from './InputText'
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'

export default function Form() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      nameInput: HTMLInputElement
      emailInput: HTMLInputElement
    }
    const name = formElements.nameInput.value
    const email = formElements.emailInput.value

    try {
      const request = fetch('https://activepieces.gpul.org/api/v1/webhooks/vk6LQyvRYVhV5AAhCWM7N/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      toast.promise(request, {
        loading: 'Un momentito...',
        success: '¡Listo, estás en la lista!',
        error: 'Ha ocurrido un error...',
      })

      await request

      // TODO: redirect to some other page with message
      // or show modal and after dismiss redirect to /
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-2 text-base sm:grid sm:grid-cols-2 sm:gap-4" onSubmit={handleSubmit}>
      <InputText id="nameInput" label="Nombre completo" placeholder="John Doe" required icon={faUser} />
      <InputText id="emailInput" label="Email" type="email" placeholder="john@example.com" required icon={faEnvelope} />
      <InputText
        id="phoneInput"
        tooltip="Será guardado para casos de urgencia o emergencia durante el evento."
        label="Teléfono móvil"
        placeholder="612345789"
        required
        icon={faPhone}
      />
      <InputText id="calendarInput" type="date" label="Fecha de nacimiento" required icon={faCalendar} />
      <InputText id="studyLocationInput" label="Lugar de estudios" placeholder="A Coruña" required icon={faSchool} />
      <InputText id="city" label="Lugar de residencia" placeholder="Ferrol" required icon={faMapLocation} />
      <InputSelect
        id="countrySelect"
        label="País"
        required
        icon={faGlobeEurope}
        tooltip="Selecciona tu país de residencia."
        options={[
          { value: 'es', label: 'España' },
          { value: 'it', label: 'Italia' },
          { value: 'us', label: 'Estados Unidos' },
        ]}
      />
      <div className="col-span-2 flex flex-col gap-4">
        <InputCheckbox
          id="termsCheckbox"
          label="Acepto los términos y condiciones"
          required
          tooltip="Debes aceptar los términos y condiciones para continuar."
        />
        <InputCheckbox id="checkbox2" label="Acepto los términos de ejemplo" required />
        <InputCheckbox id="checkbox3" label="Acepto los términos de ejemplo" required />
        <div>
          <button
            type="submit"
            className="hover group relative col-span-2 w-full rounded-lg bg-green-900 p-2.5 text-center font-light text-white/75"
            disabled={loading}
          >
            Registrarme en HackUDC
            <div className="absolute inset-y-0 right-4 flex items-center transition-all group-hover:right-3">
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5 text-white/50" />
            </div>
          </button>
          <p className="col-span-2 mt-2 text-center text-xs font-light text-white/75">
            Al enviar, aceptas la{' '}
            <a href="/privacy" className="underline">
              política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  )
}
