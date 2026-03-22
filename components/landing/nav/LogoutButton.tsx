'use client';
const LogoutButton = () => {
    const handleLogout = async () => {
        await fetch('/api/logout');
        window.location.href = '/';
    };

    return (
        <button 
            onClick={handleLogout}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
            LogOut
        </button>
    );
};

export default LogoutButton;