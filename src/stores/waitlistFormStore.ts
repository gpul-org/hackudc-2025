import { atom, map } from 'nanostores'

export const loading = atom(false)
export const success = atom(false)
export const error = atom(false)
export const inputs = map<Record<string, string>>({})
