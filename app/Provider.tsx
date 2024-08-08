"use client"
import Loader from '@/components/Loader'
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions'
import {LiveblocksProvider, ClientSideSuspense} from '@liveblocks/react'
import { ReactNode } from 'react'
const Provider = ({children}: {children: ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" resolveUsers={async ({userIds})=>{
      const users = await getClerkUsers({userIds});
      return users;
    }}
    resolveMentionSuggestions={async ({text,roomId})=>{
      const roomuers = await getDocumentUsers({
        roomId,
        currentUser: clerkUser?.emailAddresses[0].emailAddresses!,
        text
      })
    }}
    >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider