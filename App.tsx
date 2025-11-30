
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { ArticleLandingPage } from './components/ArticleLandingPage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { SearchPage } from './components/SearchPage';
import { MiniCart } from './components/MiniCart';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { AccountDashboard } from './components/AccountDashboard';
import { WishlistPage } from './components/WishlistPage';
import { AccountDetailsPage } from './components/AccountDetailsPage';
import { EmailPreferencesPage } from './components/EmailPreferencesPage';
import { WorkshopPage } from './components/WorkshopPage';
import { TeaPartyPage } from './components/TeaPartyPage';
import { OnlineCoursePage } from './components/OnlineCoursePage';
import { AdminAddProductPage } from './components/AdminAddProductPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CATEGORY_DETAILS } from './constants';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    // Normalize hash: remove '#' and any query params if they exist
    const hash = route.replace('#', '');
    const cleanPath = hash.split('?')[0];
    
    // 0. Search Page (Check before other exact matches)
    if (cleanPath === 'search') {
        return <SearchPage />;
    }

    // 1. Cart Page
    if (cleanPath === 'gio-hang') {
        return <CartPage />;
    }

    // 2. Auth & Account Pages
    if (cleanPath === 'login') {
        return <LoginPage />;
    }
    
    if (cleanPath === 'register' || cleanPath === 'dang-ky') {
        return <RegisterPage />;
    }

    // Admin page - check early to avoid conflicts
    if (cleanPath === 'admin-add-product') {
        return <AdminAddProductPage />;
    }

    if (cleanPath === 'account' || cleanPath === 'tai-khoan') {
        return <AccountDashboard />;
    }

    if (cleanPath === 'wishlist') {
        return <WishlistPage />;
    }

    if (cleanPath === 'account-details') {
        return <AccountDetailsPage />;
    }

    if (cleanPath === 'email-preferences') {
        return <EmailPreferencesPage />;
    }

    // 3. Specific Services Pages
    if (cleanPath === 'workshop') {
        return <WorkshopPage />;
    }

    if (cleanPath === 'tiec-tra-service') {
        return <TeaPartyPage />;
    }

    if (cleanPath === 'khoa-hoc-online') {
        return <OnlineCoursePage />;
    }

    // 4. Product Detail Page (Check prefix first)
    if (cleanPath.startsWith('product/')) {
        const productId = cleanPath.split('product/')[1];
        return <ProductDetailPage productId={productId} />;
    }

    // 5. Article Detail Page (Check prefix first)
    if (cleanPath.startsWith('article/')) {
        const articleId = cleanPath.split('article/')[1];
        return <ArticleDetailPage articleId={articleId} />;
    }

    // 6. Blog Landing Pages
    if (cleanPath === 'cach-pha-tra' || cleanPath === 'chuyen-tra') {
        return <ArticleLandingPage categoryId={cleanPath} />;
    }

    // 7. Product Categories
    if (cleanPath in CATEGORY_DETAILS) {
      return <CategoryPage categoryId={cleanPath} />;
    }
    
    // 8. Static Pages
    if (cleanPath === 've-chung-toi' || cleanPath === 'gioi-thieu') {
        return <AboutPage />;
    }

    if (cleanPath === 'lien-he') {
        return <ContactPage />;
    }

    if (cleanPath === 'blog') {
        return <div className="pt-32 text-center min-h-[50vh]"><h1 className="text-3xl font-light">Trang này đang được xây dựng</h1></div>;
    }

    // 9. Default to Home
    return <HomePage />;
  };

  return (
    <AuthProvider>
      <CartProvider>
          <div className="min-h-screen bg-white font-sans text-stone-900 antialiased selection:bg-orange-200 selection:text-orange-900">
          <Header />
          <MiniCart />
          <main>
              {renderContent()}
          </main>
          <Footer />
          </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
