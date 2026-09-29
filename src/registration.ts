import { REGISTRATION_CLOSED, REGISTRATION_CLOSED_PATH, REGISTRATION_URL } from './data/site'
import { useRouter } from './router'

export interface Registration {
  isClosed: boolean
  register: () => void
}

export function useRegistration(): Registration {
  const { navigate } = useRouter()

  return {
    isClosed: REGISTRATION_CLOSED,
    register() {
      if (REGISTRATION_CLOSED) {
        navigate(REGISTRATION_CLOSED_PATH)
        return
      }
      window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer')
    },
  }
}
