import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import NavBar from "../../components/NavBar/NavBar";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import RestaurantTable from "../../components/RestaurantTable/RestaurantTable";

interface Props {
  user: string,
  onRemoveUser(): void
}

const RestaurantPage = (props: Props) => {
  const [restrId, setRestrId] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/", { replace: true });
  }, []);

  const { id } = useParams();

  useEffect(() => {
    setRestrId(Number(id));
  }, [id]);

  return (
    <>
      <NavBar onRemoveUser={props.onRemoveUser} user={props.user} />
      <Box sx={{ display: "flex" }}>
        <RestaurantList setRestrId={setRestrId} restrId={restrId} />
        <RestaurantTable restrId={restrId} />
      </Box>
    </>
  );
}

export default RestaurantPage;