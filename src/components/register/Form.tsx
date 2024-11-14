import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faPhone,
  faCalendar,
  faSchool,
  faMapLocation,
  faGraduationCap,
  faInstitution,
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
      const request = fetch('https://activepieces.gpul.org/api/v1/webhooks/o15OjmGTxRFoks4ESnhrC/sync', {
        method: 'POST',
        body: formData,
      })

      toast.promise(request, {
        loading: 'Un momentito...',
        success: '¡Listo, estás registrado!',
        error: 'Ha ocurrido un error...',
      })

      await request

      setTimeout(() => {
        window.location.href = '/registro/success'
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
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
      <InputText id="city" label="Lugar de residencia" placeholder="Ferrol" required icon={faMapLocation} />
      <InputText
        id="studyLocationInput"
        label="Lugar de estudios"
        placeholder="Universidade da Coruña"
        required
        icon={faSchool}
      />
      <InputText
        id="studyNameInput"
        label="Nombre de los estudios"
        placeholder="Ingeniería informática"
        required
        icon={faGraduationCap}
      />
      <InputSelect
        id="studyCourseInput"
        label="Curso"
        required
        icon={faGraduationCap}
        options={[
          { value: '1', label: '1º' },
          { value: '2', label: '2º' },
          { value: '3', label: '3º' },
          { value: '4', label: '4º' },
          { value: '5', label: '5º' },
          { value: 'no', label: 'No aplica' },
        ]}
      />
      <InputSelect
        id="studyLevelInput"
        label="Nivel de estudios"
        required
        icon={faInstitution}
        options={[
          { value: 'universidad', label: 'Universitarios' },
          { value: 'fp', label: 'Formación Profesional' },
          { value: 'secundaria', label: 'Secundarios' },
          { value: 'otros', label: 'Otros' },
        ]}
      />
      <InputSelect
        id="creditsInput"
        label="¿Solicitar créditos ECTS?"
        required
        tooltip="Solo podemos ortorgar créditos a los estudiantes de la UDC, que dependiendo de sus estudios, podrán reconocer según normativa."
        icon={faShirt}
        defaultValue="no"
        options={[
          { value: 'si', label: 'Sí' },
          { value: 'no', label: 'No' },
        ]}
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
        label="¿Por qué quieres participar en HackUDC?"
        placeholder="Para retarme, conocer gente nueva y..."
        required
        icon={faPen}
      />
      <InputFile id="cvInput" label="Adjuntar CV (PDF)" required accept=".pdf" />
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
