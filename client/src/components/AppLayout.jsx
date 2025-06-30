import MainCont from "./MainCont";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
function AppLayout({ isDark, setIsDark, isJobLoading, errorMessage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 768;
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen((mobile) => (mobile ? false : true));
    }

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
