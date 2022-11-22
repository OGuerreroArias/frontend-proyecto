import { Box } from "@chakra-ui/react";
import { AuthContext } from "lib/@core/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const { user, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return user ? (children as React.ReactElement) : <Navigate to={redirectTo} />;
};

export default RequireAuth;
