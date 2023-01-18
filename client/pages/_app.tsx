import Layout from "@/components/Layout";
import GlobalStyled from "@/styles/GlobalStyled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
      },
      mutations: {
        retry: false,
        cacheTime: 1000 * 60 * 5,
        onError(error: any) {},
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyled />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
