import useSWR from 'swr'

interface Blog {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  thumbnail: string | null
  image: string | null
  publishedAt: string | null
  createdAt: string
}

const fetcher = async (url: string): Promise<Blog> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch blog')
  }
  return res.json()
}

export function useBlog(slug: string) {
  const { data, error, isLoading, mutate } = useSWR<Blog>(
    slug ? `/api/blogs/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // Dedupe requests within 10 seconds
      keepPreviousData: true,
    }
  )

  return {
    blog: data,
    isLoading,
    isError: error,
    mutate,
  }
}

