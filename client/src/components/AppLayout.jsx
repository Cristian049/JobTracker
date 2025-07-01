import MainCont from "./MainCont";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
function AppLayout({
  isDark,
  setIsDark,
  isJobLoading,
  errorMessage,
  setIsLoggedIn,
}) {
  const getIsMobile = () => window.innerWidth <= 768;

  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !getIsMobile());

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    }
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container">
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} />
      <MainCont>
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          showToggleBtn={isMobile}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Content>
          {isJobLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorMessage message={errorMessage} />
          ) : (
            <Outlet />
          )}
        </Content>
      </MainCont>
    </div>
  );
}

export default AppLayout;
