import { useState, useEffect, useCallback } from 'react';
import { nanoid } from '@reduxjs/toolkit'
import { Routes, Route, useNavigate } from "react-router-dom";
import { useGetRestaurantsQuery } from '../../api/apiSlice';

import './App.scss';

import AuthPage from '../../pages/AuthPage/AuthPage';
import AddRestaurantPage from '../../pages/AddRestaurantPage/AddRestaurantPage';
import RestaurantPage from '../../pages/RestaurantPage/RestaurantPage';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [user, setUser] = useState(localStorage.getItem('user') || "");

  let navigate = useNavigate();

  const {
    data: restaurants = [],
    isLoading,
    isSuccess,
    isFetching
  } = useGetRestaurantsQuery("");

  const navigation = useCallback(() => {
    if (isLoading || isFetching) return;
    if (isSuccess && token.length > 3 && user.length > 1 && restaurants[0]) {
      navigate("/restaurants/" + restaurants[0].id, { replace: true });
    } else if (isSuccess && token.length > 3 && user.length > 1) {
      navigate("/add", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isSuccess, restaurants, token, user])

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
    setToken(localStorage.getItem("token") || "");
  }, [])

  useEffect(() => {
    navigation();
  }, [user])

  const onAddUser = (props: string) => {
    localStorage.setItem("token", nanoid());
    localStorage.setItem("user", props);
    setToken(localStorage.getItem("token") || "");
    setUser(props);
    navigation();
  }

  const onRemoveUser = (): void => {
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigation();
  }

  return (

    <div className="App">
      <Routes>

        <Route
          path="/"
          element={
            <AuthPage onAddUser={onAddUser} />
          }
        />

        <Route
          path="/add"
          element={
            <AddRestaurantPage />
          }
        />

        <Route
          path="/restaurants/:id"
          element={
            <RestaurantPage onRemoveUser={onRemoveUser}
              user={user} />
          }
        />
      </Routes>
    </div>

  );
}

export default App;
