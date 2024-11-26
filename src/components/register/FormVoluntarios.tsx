import { faEnvelope, faHandshake, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faPhone,
  faWheatAwnCircleExclamation,
  faShirt,
  faPen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import toast from 'react-hot-toast'
import InputText from './InputText'
import InputSelect from './InputSelect'
import InputCheckbox from './InputCheckbox'
import InputTextArea from './InputTextArea'
import InputFile from './InputFile'

export default function Form() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      toast.loading('Un momentito...');
      const response = await fetch('https://activepieces.gpul.org/api/v1/webhooks/Qt2dPsavbpFuES2b4SqoR/sync', {
        method: 'POST',
        body: formData,
      })


      if (response.ok) {
        toast.remove();
        toast.success('¡Listo, estás registrado!')

        // Await the timeout for redirection to prevent re-clicking
        await new Promise((resolve) => setTimeout(resolve, 2000))

        window.location.href = '/registro/success-voluntarios'
      } else {
        toast.remove();
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
    <form className="flex flex-col gap-2 text-base sm:grid sm:grid-cols-2 sm:gap-4" onSubmit={handleSubmit}>
      <div className="col-span-2 w-full">
      <InputText id="nameInput" label="Nombre completo" placeholder="John Doe" required icon={faUser} />
      </div>
      <InputText id="emailInput" label="Email" type="email" placeholder="john@example.com" required icon={faEnvelope} />
      <InputText
        id="phoneInput"
        tooltip="Será guardado para casos de urgencia o emergencia durante el evento."
        label="Teléfono móvil"
        placeholder="612345789"
        required
        icon={faPhone}
      />
      <InputSelect
        id="foodRestrictionsInput"
        label="Restricciones alimentarias"
        required
        icon={faWheatAwnCircleExclamation}
        options={[
          { value: 'sin', label: 'Sin restricciones' },
          { value: 'vegano', label: 'Vegano' },
          { value: 'vegetariano', label: 'Vegetariano' },
          { value: 'sin-gluten', label: 'Sin glúten' },
          { value: 'otro', label: 'Otras' },
        ]}
      />
      <InputSelect
        id="shirtSizeInput"
        label="Talla de camiseta"
        required
        icon={faShirt}
        defaultValue="L"
        options={[
          { value: 'S', label: 'S' },
          { value: 'M', label: 'M' },
          { value: 'L', label: 'L' },
          { value: 'XL', label: 'XL' },
          { value: 'XXL', label: 'XXL' },
        ]}
      />
      <InputTextArea
        id="motivationInput"
        label="¿Por qué quieres ayudar en HackUDC?"
        placeholder="Después de particiar en otras ediciones, me apetece probar esta experiencia porque..."
        required
        tooltip="Explica brevemente por qué quieres ser mentor y cuáles son tus conocimientos, además de si tienes alguna experiencia enseñando o ayudando con proyectos de programación."
        icon={faPen}
      />
      <InputFile id="cvInput" label="Adjuntar CV (PDF)" required accept=".pdf" tooltip="Añade aquí tu CV. Nos ayudará a seleccionar a aquellos voluntarios que mejor encajen, también puedes compartirlo con las empresas patrocinadoras del evento."/>
      <div className="col-span-2 flex flex-col gap-4">
        <InputCheckbox id="cvCheckbox" label="Quiero compartir mi CV con las empresas patrocinadoras (recomendado)." />
        <InputCheckbox
          id="termsCheckbox"
          label="Acepto los términos y condiciones y he leído el código de conducta."
          required
        />
        <div>
          <button
            type="submit"
            className={`hover group relative col-span-2 w-full rounded-lg p-2.5 text-center font-light ${
              loading ? 'cursor-not-allowed bg-gray-500' : 'bg-green-900 text-white/75'
            }`}
            disabled={loading}
          >
            Registrarme en HackUDC
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
        </div>
      </div>
    </form>
  )
}
