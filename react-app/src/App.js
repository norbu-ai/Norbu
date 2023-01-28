import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginFormModal/LoginForm";
import SignUpForm from "./components/auth/SignupFormModal/SignUpForm";
import NavBar from "./components/Navigation/NavBar";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import ProductsBrowser from "./components/Product/BrowseProducts";
import CreateProduct from "./components/Product/CreateProducts";
import ProductDetails from "./components/Product/ProductDetails";

import Footer from "./components/Navigation/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <ProductsBrowser />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/products/:productId" exact={true}>
          <ProductDetails />
        </Route>
        <Route path="/new-product" exact={true}>
          <CreateProduct />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
