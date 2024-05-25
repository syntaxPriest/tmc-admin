import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setToken } from './api/instance';
import { useCookies } from 'react-cookie';
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/signup';
import VerifyPage from './pages/auth/verify';
import ResetPasswordPage from './pages/auth/resetPassword';
import CreatePasswordPage from './components/auth/resetPassword/createPassword';
import LandingPageIndex from './pages/landing';
import SearchIndexPage from './pages/search';
import SearchSinglePage from './pages/search/searchSinglePage';
import BlockSection from './components/search/blockSection';
import SelectPlan from './components/search/select-plan';
import CalculatorPage from './pages/search/calculatorPage';
import PaymentAccInfoPage from './pages/search/paymentAccPage';
import ContributionSuccess from './components/search/contributionSuccess';
import DashboardIndexPage from './pages/dashboard';
import DashboardProperty from './components/dashboard/property';
import DashboardSingleProperty from './components/dashboard/single';
import DashboardSavedProperties from './components/dashboard/saved';
import DashboardWallet from './components/dashboard/wallet';
import DashboardProfile from './components/dashboard/profile';
import ContactSupport from './pages/landing/support';
import { PreventAuthRoute, PrivateLoginRoute, PrivateVerify } from './protectedRoute';
import { useCurrentUser } from './store/user/useCurrentUser';
import { User } from './store/user/reducer';
import IdleTimerContainer from './components/reusable/idleTimeContainer';

function App() {

  const currentUser: User | null = useCurrentUser().user;
  const [cookie] = useCookies(["userToken"]);
  // const isAuthenticated = cookie?.userToken
  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    setIsAuthenticated(cookie.userToken);
    setToken(cookie?.userToken ? cookie?.userToken : undefined, currentUser ? `${currentUser?.id.toString()}` : undefined);
  }, [cookie?.userToken]);

  return (
    <>
    <IdleTimerContainer />
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path='/login' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route path='/sign-up' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/sign-up' element={<SignupPage />} />
        </Route>
        <Route path='/verify-email' element={<PrivateVerify isInVerifyLobby={true} />}>
          <Route path='/verify-email' element={<VerifyPage />} />
        </Route>
        <Route path='/reset-password' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/reset-password' element={<ResetPasswordPage />} />
        </Route>
        <Route path='/create-password' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/create-password' element={<CreatePasswordPage />} />
        </Route>

        {/* Search Routes */}
        <Route path='/' element={<LandingPageIndex />} />
        <Route path='/search' element={<SearchIndexPage />} />
        <Route path='/contact-support' element={<ContactSupport />} />
        <Route path='/property/:id' element={<SearchSinglePage />} />

        <Route path='/select-plan' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />}>
          <Route path='/select-plan' element={<SelectPlan />} />
        </Route>

        <Route path='/select-unit' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
          <Route path='/select-unit' element={<BlockSection />} />
        </Route>

        <Route path='/contribution-calculator' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
          <Route path='/contribution-calculator' element={<CalculatorPage />} />
        </Route>

        <Route path='/send-payment' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
          <Route path='/send-payment' element={<PaymentAccInfoPage />} />
        </Route>

        <Route path='/contribution-response' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
          <Route path='/contribution-response' element={<ContributionSuccess />} />
        </Route>


        {/* Dashboard Routes */}
          <Route path='/dashboard' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard' element={<DashboardIndexPage />} />
          </Route>

          <Route path='/dashboard/properties' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/properties' element={<DashboardProperty />} />
          </Route>

          <Route path='/dashboard/property/:name' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/property/:name' element={<DashboardSingleProperty />} />
          </Route>

          <Route path='/dashboard/saved' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/saved' element={<DashboardSavedProperties />} />
          </Route>

          <Route path='/dashboard/wallet' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/wallet' element={<DashboardWallet />} />
          </Route>

          <Route path='/dashboard/profile' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/profile' element={<DashboardProfile />} />
          </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
