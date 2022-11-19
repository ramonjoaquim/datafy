import { EncryptStorage } from 'encrypt-storage'

export const encryptStorage = new EncryptStorage(import.meta.env.VITE_STORAGE_SECRET_KEY, {
  prefix: '@datafy',
  storageType: 'localStorage'
})