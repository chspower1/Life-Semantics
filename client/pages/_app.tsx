import Layout from "@/components/Layout";
import GlobalStyled from "@/styles/GlobalStyled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/styles/font/style.css";
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
      },
      mutations: {
        onSuccess() {
          queryClient.invalidateQueries(["reservationList"]);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyled />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
