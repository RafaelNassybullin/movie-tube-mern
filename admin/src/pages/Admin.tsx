import AdminAuth from "pages/AdminAuth";
import DataCrudTable from "pages/DataCrudTable";
import {useSelector} from "react-redux";
import {isAuthReselect} from "store/selector/authSelector";

const Admin = () => {

  const isAuth = useSelector(isAuthReselect)

  return (
    <>
      {isAuth
        ? <DataCrudTable/>
        : <AdminAuth/>
      }
    </>
  )
}

export default Admin
