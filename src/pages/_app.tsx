
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { MenuContextProvider } from '@/hooks/useMenuContext';
import { Meta } from '@/layout/Meta';

import { LoadingContextProvider } from '../hooks/useLoadingContext';
import { PopupContextProvider } from '../hooks/usePopupContext';
import Layout from '../layout/Layout';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const { token } = query;
//   console.log('req', req);
//   console.log('token', token);
//   const result = {};
//   return {
//     props: {
//       user: result,
//     },
//   };
// };

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// @ts-ignore
const MyApp = ({ Component, pageProps, session }: AppProps) => (
    <RecoilRoot>
      <LoadingContextProvider>
        <PopupContextProvider>
          <MenuContextProvider>
            <Layout>
              <Head>
                <Meta
                  title={'任務派發'}
                  description={
                    '想找人幫忙? 想賺點外快? 所有臨時任務都可以在這裡找到!'
                  }
                />
              </Head>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </MenuContextProvider>
        </PopupContextProvider>
      </LoadingContextProvider>
    </RecoilRoot>
);

export default MyApp;
