import { userAtom } from '$/atoms/user';
import { BasicHeader } from '$/components/BasicHeader/BasicHeader';
import { Auth } from '@supabase/auth-ui-react';
import { useAtom } from 'jotai';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthLoader } from 'src/components/AuthLoader';
import 'src/styles/globals.css';
import { gaPageview } from 'src/utils/gtag';
import { supabase } from 'src/utils/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAtom(userAtom);
  const SafeHydrate = dynamic(() => import('../components/SafeHydrate'), { ssr: false });
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) gaPageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <SafeHydrate>
        <BasicHeader user={user} />
        <Component {...pageProps} />
      </SafeHydrate>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <AuthLoader />
      </Auth.UserContextProvider>
    </>
  );
}

export default MyApp;
