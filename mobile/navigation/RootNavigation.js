import React from "react";
import { NonAuthenticated, Authenticated } from "./MainNavigation";
import { useSelector } from "react-redux";

const RootNavigation = () => {
    const user = useSelector(state => state.persist.user);
    return (
        user.isLoggedIn ? <Authenticated /> : <NonAuthenticated />
    );
}

export default RootNavigation;