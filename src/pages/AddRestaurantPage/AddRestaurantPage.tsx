import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useGetRestaurantsQuery, useAddRestaurantMutation } from '../../api/apiSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const AddRestaurantPage = () => {
  const [addRestaurant] = useAddRestaurantMutation();

  const restaurantsStatus = useGetRestaurantsQuery("");
  const {
    data: restaurants = [],
  } = useGetRestaurantsQuery("");
  let navigate = useNavigate();

  if (!localStorage.getItem("token")) navigate("/", { replace: true });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("text");

    if (restaurants) {
      let id = restaurants.filter(item => item.name === name);
      console.log(id)
      if (id.length !== 0) navigate(`/restaurants/${id[0].id}`, { replace: true });
      else {
        addRestaurant({ name: name })
          .then(() => restaurantsStatus.refetch())
          .then(() => navigate(`/restaurants/${restaurants.length}`, { replace: true }))
          .catch((err) => console.log(err));
      };

    } else {
      addRestaurant({ name: name })
        .then(() => restaurantsStatus.refetch())
        .then(() => navigate("/restaurants/0", { replace: true }))
        .catch((err) => console.log(err));

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            name="text"
            label="Название"
            type="text"
            id="text"
            autoFocus
          />
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default AddRestaurantPage;