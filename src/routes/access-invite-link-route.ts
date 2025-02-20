import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import env from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access an invite link and redirects users to the event page',
        tags: ['referral'],
        params: z.object({
          subscriberId: z.string().uuid(),
        }),
        response: {
          302: z.object({
            location: z.string().url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params
      await accessInviteLink({ subscriberId })
      const redirectURL = new URL(env.WEB_URL)
      redirectURL.searchParams.set('referrer', subscriberId)
      return reply.redirect(redirectURL.toString(), 302)
    }
  )
}
