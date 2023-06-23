//import react
import React, { lazy, Suspense } from 'react';

//import react router dom
import { Routes, Route } from "react-router-dom";

//import loader component
const Loader = lazy(() => import('../components/Loader.jsx'));

//import view Login
const Login = lazy(() => import('../views/Auth/Login.jsx'));

//import private routes
import PrivateRoutes from "./privateRoutes";

//import view dashboard
const Dashboard = lazy(() => import('../views/Dashboard/Index.jsx'));

// import view permissions index
const PermissionsIndex = lazy(() => import('../views/Permissions/Index.jsx'));

// import view roles index
const RolesIndex = lazy(() => import('../views/Roles/Index.jsx'));

export default function RoutesIndex() {

    return (
        <Routes>

            {/* route "/" */}
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                }
            />

            {/* private route "/dashboard" */}
            <Route
                path="/dashboard"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <Dashboard />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

            {/** private route "/permissions" */}
            <Route
                path="/permissions"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <PermissionsIndex />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

            {/** private route "/roles" */}
            <Route
                path="/roles"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <RolesIndex />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

        </Routes>
    )
}