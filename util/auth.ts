import type { User } from '@clerk/nextjs/api'
import { prisma } from './db'
import { auth } from '@clerk/nextjs'

export const getUserFromClerkID = async (select = { id: true }) => {
    try {
      const { userId } = auth()
      console.log('userId:', userId) 
  
      const user = await prisma.user.findUnique({
        where: {
          clerkId: userId as string,
        },
        select,
      })
  
      if (user) {
        console.log('User found:', user)
        return user
      } else {
        console.log('No user found with this clerkId')
        return null
      }
    } catch (error) {
      console.error('Error getting user:', error)
      throw error
    }
  }

export const syncNewUser = async (clerkUser: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  })

  if (!existingUser) {
    const email = clerkUser.emailAddresses[0].emailAddress
    // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        account: {
          create: {
            // stripeCustomerId: customerId,
            // stripeSubscriptionId: subscriptionId,
          },
        },
      },
    })
  }
}