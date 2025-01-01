import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import path from "./lib/path";
import "./index.css";

import NotFound from "./pages/404";
import Public from "./pages/public";
import Admin from "./pages/Admin";
import Collections from "./pages/Admin/Collection";
import CollectionForm from "./components/collections/CollectionForm";
import CollectionDetails from "./components/collections/_id";
import { Toaster } from "react-hot-toast";
import DetailCinema from "./pages/Cinema/_id";

import DetailEvalute from "./pages/Evalute/_id";
import Information from "./pages/Infomation";
import UpdateName from "./pages/UpdateName";
import UpdateBank from "./pages/UpdatBank";
import UpdateGender from "./pages/UpdateGender";
import UpdatePassword from "./pages/UpdatePassword";

import Setting from "./pages/Setting";
import LotteryForm from "./components/lottery/LotteryForm";
import Lottery from "./pages/Admin/Lottery";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "./stores/actions/userAction";
import { useEffect, useState } from "react";
import Customers from "./pages/Admin/Customer";
import CustomerForm from "./components/customers/CustomerForm";
import UserDetails from "./components/customers/_id";
import Loader from "./components/custom ui/Loader";
import Home from "./pages/Home";
import WithDraw from "./pages/WithDraw";
import DepositalHistoryAdmin from "./pages/DepositalHistoryAdmin";
import WithDrawalHistory from "./pages/WithDrawalHistory";
import AdminDashBoard from "./pages/Admin/Home";
import LotteryDetails from "./components/lottery/_id";
import EvaluteHistory from "./pages/EvaluteHistory";
import HistoryDetails from "./pages/EvaluteHistory/_id";
import WithDrawalHistoryAdmin from "./pages/WithDrawalHistoryAdmin";
import TransformHistory from "./pages/Transform";
import HistoryDetailsAdmin from "./pages/Admin/EvaluteHistory/_id";
import EvaluteHistoryAdmin from "./pages/Admin/EvaluteHistory";
import DepositHistory from "./pages/DepositHistory";
import Belt from "./pages/Belt";
import CategoryBelt from "./pages/Admin/CategoryBelt";
import CategoryBeltForm from "./components/categoryBelt/CategoryBeltForm";
import CategoryBeltDetails from "./components/categoryBelt/_id";
import CategoryCollection from "./pages/Admin/CategoryCollection";
import CategoryCollectionForm from "./components/categoryCollection/CategoryCollectionForm";
import CategoryCollectionDetails from "./components/categoryCollection/_id";

function App() {
  const [loading, setLoading] = useState(false);
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && token) {
      setLoading(true);
      setTimeout(() => {
        dispatch(getCurrent());
        setLoading(false);
      }, 1000);
    } else {
      navigate("/sign-in");
    }
  }, [isLoggedIn, token, dispatch, navigate]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Routes>
            {currentData && currentData?.role === "admin" && (
                  <>

              <Route element={<Admin />} path={path.ADMIN}>
                {/* <Route
                  index
                  element={<AdminDashBoard />}
                  path={path.ADMINDASHBOARD}
                  /> */}

                
              </Route>
                <Route element={<Collections />} path={path.COLLECTION} />
                <Route
                  element={<CollectionForm />}
                  path={path.CREATE_COLLECTION}
                />
                <Route
                  element={<CollectionDetails />}
                  path={path.COLLECTION_DETAIL}
                />
                 <Route element={<CategoryBelt />} path={path.CATEGORY_BELT} />
                <Route
                  element={<CategoryBeltForm />}
                  path={path.CREATE_CATEGORY_BELT}
                />
                <Route
                  element={<UpdatePassword />}
                  path={path.CHANGEPASSWORD}
                />
                <Route
                  element={<CategoryBeltDetails />}
                  path={path.DETAILS_CATEGORY_BELT}
                />
                <Route element={<CategoryCollection />} path={path.CATEGORY_COLLECTION} />
                <Route
                  element={<CategoryCollectionForm />}
                  path={path.CREATE_CATEGORY_COLLECTION}
                />
                <Route
                  element={<CategoryCollectionDetails />}
                  path={path.DETAILS_CATEGORY_COLLECTION}
                />
                <Route element={<Customers />} path={path.CUSTOMER} />
                <Route element={<CustomerForm />} path={path.CREATE_CUSTOMER} />
                <Route element={<UserDetails />} path={path.CUSTOMER_DETAIL} />
                <Route element={<LotteryForm />} path={path.CREATE_LOTTERY} />

                <Route
                  element={<EvaluteHistoryAdmin />}
                  path={path.HISTORYEVALUTEADMIN}
                />
                <Route
                  element={<Belt />}
                  path={path.BELT}
                />
                <Route
                  element={<HistoryDetailsAdmin />}
                  path={path.HISTORYDETAILSEVALUTEADMIN}
                />
                <Route
                  element={<WithDrawalHistoryAdmin />}
                  path={path.HISTORYWITHDRAWADMIN}
                />
                <Route
                  element={<TransformHistory />}
                  path={path.HISTORYTRANSFORMADMIN}
                />
                <Route
                  element={<LotteryDetails />}
                  path={path.LOTTERY_DETAIL}
                />
                <Route
                  element={<DepositalHistoryAdmin />}
                  path={path.DEPOSITALHISTORYADMIN}
                />
                <Route element={<Lottery />} path={path.LOTTERY} />
              </>
            )}
            {currentData && currentData?.role !== "admin" && (
              <Route element={<Public />} path={path.PUBLIC}>
                <Route element={<Home />} path={path.HOME} />
                <Route element={<Information />} path={path.INFORMATION} />
                <Route element={<WithDraw />} path={path.WITHDRAW} />
               
                <Route
                  element={<WithDrawalHistory />}
                  path={path.HISTORYWITHDRAW}
                />
                <Route
                  element={<EvaluteHistory />}
                  path={path.HISTORYEVALUTE}
                />
                <Route
                  element={<DepositHistory />}
                  path={path.HISTORYDEPOSIT}
                />
                 
                <Route
                  element={<HistoryDetails />}
                  path={path.HISTORYDETAILSEVALUTE}
                />
                <Route element={<UpdateName />} path={path.NAME} />
                <Route element={<UpdateBank />} path={path.BANK} />
                <Route element={<UpdateGender />} path={path.GENDER} />
                <Route
                  element={<UpdatePassword />}
                  path={path.CHANGEPASSWORD}
                />

                <Route element={<Setting />} path={path.SETTING} />
                <Route element={<DetailCinema />} path={path.CINEMA_DETAIL} />
                {/* <Route element={<UserForm />} path={path.EDIT_USER} /> */}
                <Route element={<DetailEvalute />} path={path.LOTERY} />
              </Route>
            )}
            <Route element={<Auth />} path={path.LOGIN} />
            <Route element={<NotFound />} path="*" />
          </Routes>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Define default options
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 5000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
