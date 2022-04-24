import { Box, CircularProgress } from "@mui/material";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import React, { FC, useEffect } from "react";
import Dashboard from "Components/Dashboard";
import Login from "Components/Login";
import Store, { useStoreState } from "Stores";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";
const theme = createTheme();

const App = () => {
  useEffect(() => {
    return () => {
      Store.persist.flush();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={Store}>
        <HomePage />
      </StoreProvider>
    </ThemeProvider>
  );
};

export default App;

const HomePage: FC = () => {
  const isRehydrated = useStoreRehydrated();

  const { userId } = useStoreState(({ AppStore: { userId } }) => ({ userId }));
  if (!isRehydrated) {
    return (
      <Box display="flex" justifyContent="center" width="100%">
        <CircularProgress size={100} />
      </Box>
    );
  }
  return <>{userId ? <Dashboard /> : <Login />}</>;
};

// const useDelayedHydration = () => {
//   const [hydrated, setHydrated] = useState(false);
//   const hydratedActual = useStoreRehydrated();
//   useEffect(() => {
//     setTimeout(() => {
//       setHydrated(hydratedActual);
//     }, 5000);
//   }, [hydratedActual]);

//   return hydrated;
// };
