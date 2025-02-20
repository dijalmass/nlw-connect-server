import { redis } from '../redis/client'

interface SubscriberInviteClicks {
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: SubscriberInviteClicks) {
  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
