import { getAppVersionProcedure } from '@/features/dashboard/api/getAppVersionProcedure'
import { router } from '../trpc'
import { generateUploadUrl } from '@/features/upload/api/generateUploadUrl'
import { openAIRouter } from '@/features/blocks/integrations/openai/api/router'
import { internalWhatsAppRouter } from '@/features/whatsapp/router'
import { zemanticAiRouter } from '@/features/blocks/integrations/zemanticAi/api/router'
import { queuesRouter } from '@/features/blocks/logic/queue/api/router'
import { forgeRouter } from '@/features/forge/api/router'
import { googleSheetsRouter } from '@/features/blocks/integrations/googleSheets/api/router'
import { telemetryRouter } from '@/features/telemetry/api/router'

export const internalRouter = router({
  getAppVersionProcedure,
  generateUploadUrl,
  whatsAppInternal: internalWhatsAppRouter,
  openAI: openAIRouter,
  zemanticAI: zemanticAiRouter,
  queueEnvia: queuesRouter,
  forge: forgeRouter,
  sheets: googleSheetsRouter,
  telemetry: telemetryRouter,
})

export type InternalRouter = typeof internalRouter
