import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const getRankingRouter: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get subscriber ranking position',
        tags: ['referral'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                score: z.number().min(0).nullable(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking()
      return {
        ranking: rankingWithScore,
      }
    }
  )
}
