import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import { useGetRestaurantsQuery } from '../../api/apiSlice';

interface Props {
  setRestrId(restrId: number): void;
  restrId: number;
}

const RestaurantList = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    setSelectedIndex(props.restrId);
  }, [props.restrId])

  const {
    data: restaurants = []
  } = useGetRestaurantsQuery("");

  const handleListItemClick = (
    id: number,
    index: number,
  ) => {
    setSelectedIndex(index);
    props.setRestrId(id);
  };

  const getList = () => {
    if (restaurants) {
      return restaurants.map((item, index) => {
        return (<Link to={`/restaurants/${index}`} key={item.id} style={{ textDecoration: "none", color: "black" }}>
          <ListItemButton
            sx={{ textAlign: "center" }}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(item.id, index)}
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
          <Divider />
        </Link>)
      })
    }
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 300, minWidth: 200, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="secondary mailbox folder" sx={{ padding: 0 }}>
        {getList()}
      </List>
    </Box>
  );
}

export default RestaurantList;