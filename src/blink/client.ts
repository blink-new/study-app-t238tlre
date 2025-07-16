import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'study-app-t238tlre',
  authRequired: true
})

export default blink