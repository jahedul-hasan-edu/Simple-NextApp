import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
const Home = () => {
  return (
    <>
      <ProtectedRoutes />
    </>
  );
};
export default Home;
