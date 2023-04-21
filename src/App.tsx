import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Index from './pages';
import WalletGenerator from './pages/WalletGenerator';
import SeedDecoder from './pages/SeedDecoder';
import TokenDecoder from './pages/TokenDecoder';
import TrxValidator from './pages/TrxValidator';
import Base64Decoder from './pages/Base64Decoder';
import TrxBrowser from './pages/TrxBrowser';
import TrxSearcher from './pages/TrxSearcher';
import TrxSender from './pages/TrxSender';

import SnackBar from 'components/SnackBar';
import ConfirmDialog from './components/ConfirmDialog';
import PageLoadingModal from './components/PageLoadingModal';

import { StoreProvider } from './store';

const AppRouter = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="w-screen min-h-screen bg-[#181818] pb-8">
          <div className="hidden md:block">
            <Header />
            <Sidebar />
          </div>
          <Route path="/" exact component={Index} />
          <Route path="/wallet-generator" component={WalletGenerator} />
          <Route path="/seed-decoder" component={SeedDecoder} />
          <Route path="/token-decoder" component={TokenDecoder} />
          <Route path="/trx-validator" component={TrxValidator} />
          <Route path="/trx-browser" component={TrxBrowser} />
          <Route path="/base64-decoder" component={Base64Decoder} />
          <Route path="/trx-search" component={TrxSearcher} />
          <Route path="/trx-sender" component={TrxSender} />
          <SnackBar />
          <ConfirmDialog />
          <PageLoadingModal />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default AppRouter;
