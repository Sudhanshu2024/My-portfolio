import useSWR from 'swr'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  image: string | null
  link: string | null
  github: string | null
  techStack: string[]
  publishedAt: string | null
  createdAt: string
}

const fetcher = async (url: string): Promise<Project> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch project')
  }
  return res.json()
}

export function useProject(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<Project>(
    slug ? `/api/projects/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // Dedupe requests within 10 seconds
      keepPreviousData: true,
    }
  )

  return {
    project: data,
    isLoading,
    isError: error,
    mutate,
  }
}

