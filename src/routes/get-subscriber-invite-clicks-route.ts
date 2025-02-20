import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invite clicks ranking',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              count: z.number().min(0),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params
        const { count } = await getSubscriberInviteClicks({ subscriberId })
        return { count }
      }
    )
  }
