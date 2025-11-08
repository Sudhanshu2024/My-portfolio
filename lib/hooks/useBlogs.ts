import useSWR from 'swr'

interface Blog {
  id: string
  title: string
  slug: string
  summary: string
  thumbnail: string | null
  createdAt: string
}

const fetcher = async (url: string): Promise<Blog[]> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch blogs')
  }
  return res.json()
}

export function useBlogs(limit?: number) {
  const { data, error, isLoading, mutate } = useSWR<Blog[]>(
    '/api/blogs',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      refreshInterval: 0, // Disable auto-refresh
      keepPreviousData: true, // Keep previous data while loading
    }
  )

  const blogs = data ? (limit ? data.slice(0, limit) : data) : []

  return {
    blogs,
    isLoading,
    isError: error,
    mutate,
  }
}

