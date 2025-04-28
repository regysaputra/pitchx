import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import React from 'react'
import StartupCard, { StartupTypeCard } from "./StartupCard"

export default async function UserStartups({ id }: { id: string }) {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

  return (
    <>
      {
        // @ts-expect-error: Undetectable type error
        startups.length > 0 ? startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        )) : (
          <p className="no-result">No posts yet</p>
        )
      }
    </>
  )
}