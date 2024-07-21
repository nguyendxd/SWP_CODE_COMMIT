import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from '.';
import ProtectedRoute from '../components/protectedroute';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';
import SignUp from '../pages/Register';
import Diamonds from '../pages/diamonds';
import DashboardPage from '../pages/dashboardPage';
import OrderPage from '../components/dashboard/dashboardContent/OrderPage';
import FbPage from '../components/dashboard/dashboardContent/FeedbackPage';
import AccountPage from '../components/dashboard/dashboardContent/AccountManage';
import ProductPage from '../components/dashboard/dashboardContent/ProductManage';
import RevenuePage from '../components/dashboard/dashboardContent/RevenuePage';
import EngagementRingsPage from '../pages/engagementRingsPage';
import ShoppingCartPage from '../pages/shoppingCartPage';
import DiamondDetailPage from '../pages/diamondDetailPage';
import UserInfoPage from '../components/userInfoContent/Pages/userInfoPage';
import StaffSite from '../components/staffsite/StaffSite';
import History from '../components/staffsite/History';
import CheckOutPage from '../components/pageContent/checkoutContent';
import CheckoutCompletePage from '../pages/checkoutCompletePage';
import WishListPage from '../pages/wishListPage';
import HoSo from '../components/userInfoContent/Pages/hoSoNguoiDung';
import DiamondPage from '../pages/diamondPage';
import NecklacePage from '../pages/necklacePage';
import DiamondEducation from '../pages/diamondEducation';
import RingSizePage from '../components/education/page/ringSizePage';
import MetalEduPage from '../components/education/page/metalEduPage';
import FourCsPage from '../components/education/page/4CsPage';
import CutPage from '../components/education/page/cutPage';
import ColorPage from '../components/education/page/colorPage';
import ClarityPage from '../components/education/page/clarityPage';
import CaratPage from '../components/education/page/caratPage';
import ViewEventPage from '../components/event/ViewEventPage';
import EventPage from '../components/dashboard/dashboardContent/EventPage';
import MoldManage from '../components/dashboard/dashboardContent/MoldManage';
import DiamondPricePage from '../pages/diamondPricePage';
import WarrantyPolicy from '../pages/warrantyPolicyPage';
import PrivacyPolicy from '../pages/privacyPolicy';
import CertificateManage from '../components/dashboard/dashboardContent/CertificateManage';
import WarrantyManage from '../components/dashboard/dashboardContent/WarrantyManage';
// import RoundCutPage from '../components/diamondShape/page/roundPage';
import PasswordReset from '../pages/resetPass/passwordResetPage';
import NewPassword from '../pages/resetPass/enterPassPage';
import WeddingRingsPage from '../pages/weddingRingsPage';
import ShowAllProductsPage from '../pages/showAllProductPage';

export default function AppRoute() {
  return (
    <Routes>
      <Route path={routes.detail} element={<DiamondDetailPage />} />
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<SignUp />} />
      <Route path={routes.diamondList} element={<Diamonds />} />
      <Route path={routes.engagementRings} element={<EngagementRingsPage />} />
      <Route path={routes.shoppingCart} element={<ShoppingCartPage />} />
      <Route path="/diamondDetail" element={<DiamondDetailPage />} />
      <Route path={routes.userInfo} element={<UserInfoPage />} />
      <Route path={routes.staffsite} element={<StaffSite />} />
      <Route path={routes.checkout} element={<CheckOutPage />} />
      <Route path={routes.checkoutcomplete} element={<CheckoutCompletePage />} />
      <Route path={routes.wishList} element={<WishListPage />} />
      <Route path={routes.diamond} element={<DiamondPage />} />
      <Route path={routes.necklace} element={<NecklacePage />} />
      <Route path={routes.ringSize} element={<RingSizePage />} />
      <Route path={routes.metalEdu} element={<MetalEduPage />} />
      <Route path={routes.fourCs} element={<FourCsPage />} />
      <Route path={routes.cut} element={<CutPage />} />
      <Route path={routes.color} element={<ColorPage />} />
      <Route path={routes.clarity} element={<ClarityPage />} />
      <Route path={routes.carat} element={<CaratPage />} />
      <Route path={routes.EventPage} element={<EventPage />} />
      <Route path={routes.ViewEventPage + "/:id"} element={<ViewEventPage />} />
      <Route path={routes.MoldManage} element={<MoldManage />} />
      <Route path={routes.diamondPrice} element={<DiamondPricePage />} />
      <Route path={routes.warrantyPolicy} element={<WarrantyPolicy />} />
      <Route path={routes.privacyPolicy} element={<PrivacyPolicy />} />
      <Route path={routes.certificateManage} element={<CertificateManage />} />
      <Route path={routes.warrantyManage} element={<WarrantyManage />} />
      <Route path={routes.resetPassword} element={<PasswordReset />} />
      <Route path={routes.newPassword} element={<NewPassword />} />
      <Route path={routes.weddingRings} element={<WeddingRingsPage />} />
      <Route path={routes.allProducts} element={<ShowAllProductsPage />} />
      {/* <Route path={routes.HoSo} element={<HoSo/>} /> */}
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[1, 2, 3]} />}>
        <Route path={routes.dashboard} element={<DashboardPage />} />
        <Route path={routes.orderPage} element={<OrderPage />} />
        <Route path={routes.feedbackPage} element={<FbPage />} />
        <Route path={routes.productPage} element={<ProductPage />} />
        <Route path={routes.revenuePage} element={<RevenuePage />} />
        <Route path={routes.staffsite} element={<StaffSite />} />
        <Route path={routes.MoldManage} element={<MoldManage />} />
        <Route path={routes.certificateManage} element={<CertificateManage />} />
        <Route path={routes.warrantyManage} element={<WarrantyManage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[1]} />}>
        <Route path={routes.accountPage} element={<AccountPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[1, 2]} />}>
        <Route path={routes.EventPage} element={<EventPage />} />
        <Route path={routes.ViewEventPage + "/:id"} element={<ViewEventPage />} />
      </Route>

      <Route path="*" element={<Navigate to={routes.homePage} />} />
    </Routes>
  );
}
