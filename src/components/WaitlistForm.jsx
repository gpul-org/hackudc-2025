import {
  faBug,
  faCircleNotch,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '@nanostores/react'
import { error, inputs, loading, success } from '../stores/waitlistFormStore'

export default function WaitlistForm() {
  const $loading = useStore(loading)
  const $success = useStore(success)
  const $error = useStore(error)
  const $inputs = useStore(inputs)

  const handleChange = (event) => {
    const { name, value } = event.target
    inputs.setKey(name, value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      loading.set(true)
      // TODO: do the real call
      await new Promise((resolve) => setTimeout(resolve, 500))
      success.set(true)
    } catch (error) {
      error.set(true)
    } finally {
      loading.set(false)
    }
  }

  if ($success) {
    return (
      <div className="mx-auto flex h-[212px] flex-col items-center justify-center gap-3">
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-gray-600/30"
          size="5x"
        />
        <p className="text-center text-black/70">Thanks! Check your inbox.</p>
      </div>
    )
  }

  if ($error) {
    return (
      <div className="flex h-[212px] w-full flex-col items-center justify-center gap-3">
        <FontAwesomeIcon icon={faBug} className="text-red-900/30" size="5x" />
        <p className="text-center text-black/70">
          Ooops, something went wrong!
        </p>
        <button
          type="button"
          className="mt-3 flex w-8/12 items-center justify-center rounded bg-indigo-800 p-1.5 text-white hover:enabled:brightness-110 disabled:brightness-90"
          onClick={() => error.set(false)}
        >
          Try again!
        </button>
      </div>
    )
  }

  return (
    <form className="grid h-[212px] grid-cols-2 gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="pl-1.5 text-xs font-semibold uppercase text-black/60"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          value={$inputs.name || ''}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          required
          className="rounded border bg-white/50 p-1.5"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="surname"
          className="pl-1.5 text-xs font-semibold uppercase text-black/60"
        >
          Surname
        </label>
        <input
          id="surname"
          name="surname"
          value={$inputs.surname || ''}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          required
          className="rounded border bg-white/50 p-1.5"
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label
          htmlFor="email"
          className="pl-1.5 text-xs font-semibold uppercase text-black/60"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={$inputs.email || ''}
          onChange={handleChange}
          required
          className="rounded border bg-white/50 p-1.5"
        />
      </div>
      <div className="col-span-2">
        <button
          type="submit"
          disabled={$loading}
          className="relative flex w-full items-center justify-center rounded bg-indigo-800 p-1.5 text-white hover:enabled:brightness-110 disabled:brightness-90"
        >
          <span className="relative flex items-center">
            {$loading && (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="absolute left-[-1.5rem] animate-spin"
              />
            )}
            Join the waitlist
          </span>
        </button>
      </div>
      <div className="col-span-2">
        <p className="px-6 text-center text-xs text-black/70">
          By submitting this form, you acknowledge that you have read and agree
          to our{' '}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  )
}
