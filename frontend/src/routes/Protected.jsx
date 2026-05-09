import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const {isLoggedIn,isLoading} = useSelector((store)=>store.user);
 // loading by default to prevent children from rendering

  /// waiting for state to update from api
  if (isLoading) {
    return (
      <div className="h-screen w-screen text-2xl text-black uppercase flex items-center justify-center">
        <span className="animate-bounce">Loading...</span>
      </div>
    );
  }
  /// checking state
  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace={true} />;
  }

  ///rendering children if user is logged In
  return <div>{children}</div>;
};

export default Protected;
