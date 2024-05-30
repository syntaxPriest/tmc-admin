import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setToken } from './api/instance';
import { useCookies } from 'react-cookie';
import LoginPage from './pages/auth/login';
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
import DashboardSingleProperty from './components/dashboard/single';
import DashboardSavedProperties from './components/dashboard/saved';
import DashboardWallet from './components/dashboard/wallet';
import DashboardProfile from './components/dashboard/settings';
import ContactSupport from './pages/landing/support';
import { PreventAuthRoute, PrivateLoginRoute, PrivateVerify } from './protectedRoute';
import { useCurrentUser } from './store/user/useCurrentUser';
import { User } from './store/user/reducer';
import IdleTimerContainer from './components/reusable/idleTimeContainer';
import Members from './components/dashboard/members';
import Events from './components/dashboard/events';
import Bookings from './components/dashboard/bookings';
import Orders from './components/dashboard/orders';
import Inventories from './components/dashboard/inventories';
import Transactions from './components/dashboard/transactions';
import Admins from './components/dashboard/admins';
import Messaging from './components/dashboard/messaging';
import MemberProfile from './components/dashboard/membersComps/single';
import CreateEvent from './components/dashboard/eventComps/create';

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
        <Route path='/verify-email' element={<PrivateVerify isInVerifyLobby={true} />}>
          <Route path='/verify-email' element={<VerifyPage />} />
        </Route>
        <Route path='/reset-password' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/reset-password' element={<ResetPasswordPage />} />
        </Route>
        <Route path='/create-password' element={<PreventAuthRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/create-password' element={<CreatePasswordPage />} />
        </Route>

        {/* Dashboard Routes */}
          <Route path='/dashboard' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard' element={<DashboardIndexPage />} />
          </Route>

          <Route path='/dashboard/members' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/members' element={<Members />} />
          </Route>

          <Route path='/dashboard/member/:id' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/member/:id' element={<MemberProfile />} />
          </Route>

          <Route path='/dashboard/events' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/events' element={<Events />} />
          </Route>

          <Route path='/dashboard/events/create' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/events/create' element={<CreateEvent />} />
          </Route>

          <Route path='/dashboard/bookings' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/bookings' element={<Bookings />} />
          </Route>

          <Route path='/dashboard/orders' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/orders' element={<Orders />} />
          </Route>

          <Route path='/dashboard/inventories' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/inventories' element={<Inventories />} />
          </Route>

          <Route path='/dashboard/transactions' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/transactions' element={<Transactions />} />
          </Route>

          <Route path='/dashboard/admins' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/admins' element={<Admins />} />
          </Route>

          <Route path='/dashboard/messaging' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/messaging' element={<Messaging />} />
          </Route>

          <Route path='/dashboard/settings' element={<PrivateLoginRoute isAuthenticated={isAuthenticated} isInVerifyLobby={false} />} >
            <Route path='/dashboard/settings' element={<DashboardProfile />} />
          </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
