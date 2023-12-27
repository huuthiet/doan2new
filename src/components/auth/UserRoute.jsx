import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export default function UserRoute() {
    const { currentUser } = useSelector(state => state.user)

    if (currentUser && currentUser.role === 'user') {
        return <Outlet />;
    } else {
        // Nếu người dùng không đủ quyền, trả về trang thông báo
        return <Navigate to="/" state={{ message: "Bạn không đủ quyền để truy cập chức năng này!" }} />;
    }
}
