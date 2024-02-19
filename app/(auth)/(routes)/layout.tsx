

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex justify-center items-center h-full bg-gradient-to-r from-indigo-700">
        {children}
    </div>
}

export default AuthLayout;