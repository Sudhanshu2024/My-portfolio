import useSWR from 'swr'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  techStack: string[]
  createdAt: string
}

const fetcher = async (url: string): Promise<Project[]> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch projects')
  }
  return res.json()
}

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR<Project[]>(
    '/api/projects',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      refreshInterval: 0, // Disable auto-refresh
      keepPreviousData: true, // Keep previous data while loading
    }
  )

  return {
    projects: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

