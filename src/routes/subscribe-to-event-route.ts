import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to an event',
        tags: ['subscription'],
        body: z.object({
          email: z.string().email(),
          name: z.string().min(2).max(100),
          referrerId: z.string().uuid().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, name, referrerId } = request.body
      const { subscriberId } = await subscribeToEvent({
        email,
        name,
        referrerId,
      })
      return reply.status(201).send({ subscriberId })
    }
  )
}
