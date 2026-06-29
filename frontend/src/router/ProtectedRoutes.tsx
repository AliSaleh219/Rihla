import { Navigate } from "react-router-dom";
import { useUser } from "../component/useUser";
// ── Loading Spinner ──
const LoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/>
    </div>
);

// ── يوزر مسجل بس ──
export const UserRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, authChecked } = useUser();

    if (loading || !authChecked) return <LoadingScreen />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <>{children}</>;
};
// ── أدمن بس ──
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    
    if (loading) return <LoadingScreen/>;
    if (!user) return <Navigate to="/login"/>;
    if (!user.roles.includes("ROLE_ADMIN")) return <Navigate to="/"/>;
    
    return <>{children}</>;
};

// ── منظم بس ──
export const OrganizerRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    
    if (loading) return <LoadingScreen/>;
    if (!user) return <Navigate to="/login"/>;
    if (!user.roles.includes("ROLE_ORGANIZER") && !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/"/>;
    }
    
    return <>{children}</>;
};

// ── Guest بس (ما يشوف login وهو مسجل) ──
export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useUser();
    
    if (loading) return <LoadingScreen/>;
    
    if (user) {
        if (user.roles.includes("ROLE_ADMIN")) return <Navigate to="/admin/dashboard"/>;
        if (user.roles.includes("ROLE_ORGANIZER")) return <Navigate to="/organizer/dashboard"/>;
        return <Navigate to="/"/>;
    }
    
    return <>{children}</>;
};