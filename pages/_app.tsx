import type { AppProps } from "next/app";

import "../sass/theme.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
