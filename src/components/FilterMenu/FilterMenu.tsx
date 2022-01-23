import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import CheckIcon from '@mui/icons-material/Check';

interface Prop {
    onFilterChange(): void
}

const FilterMenu = ({ onFilterChange }: Prop) => {
    const [open, setOpen] = React.useState(false);
    const [openType, setOpenType] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filterByType, setFilterByType] = React.useState<"delivery" | "hall" | "">("");
    const [filterByStatus, setFilterByStatus] = React.useState<"new" | "cooking" | "assembling" | "done" | "">("");

    React.useEffect(() => {
        const type = localStorage.getItem("type");
        if (type === "delivery" || type === "hall") setFilterByType(type);

        const status = localStorage.getItem("status");
        if (status === "new" || status === "cooking" || status === "assembling" || status === "done") setFilterByStatus(status);
    }, [])

    const close = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.id === "type") {
            setOpenType(!openType);
            setOpen(!open);
        };
        if (e.currentTarget.id === "status") {
            setOpenStatus(!openStatus);
            setOpen(!open);
        };
    };

    const onChangeFilterByType = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.innerText === "delivery") {
            if (!filterByType || filterByType === "hall") {
                setFilterByType("delivery");
                localStorage.setItem("type", "delivery");
            }
            else {
                setFilterByType("");
                localStorage.setItem("type", "");
            }
        }
        if (e.currentTarget.innerText === "hall") {
            if (!filterByType || filterByType === "delivery") {
                setFilterByType("hall");
                localStorage.setItem("type", "hall");
            }
            else {
                setFilterByType("");
                localStorage.setItem("type", "");
            }
        }
        setOpenType(false);
        setAnchorEl(null);
        onFilterChange();
    };

    const onChangeFilterByStatus = (e: React.MouseEvent<HTMLElement>) => {

        if (e.currentTarget.innerText === "new") {
            if (!filterByStatus || filterByStatus !== "new") {
                setFilterByStatus("new");
                localStorage.setItem("status", "new");
            }
            else {
                setFilterByStatus("");
                localStorage.setItem("status", "");
            }
        }
        if (e.currentTarget.innerText === "cooking") {
            if (!filterByStatus || filterByStatus !== "cooking") {
                setFilterByStatus("cooking");
                localStorage.setItem("status", "cooking");
            }
            else {
                setFilterByStatus("");
                localStorage.setItem("status", "");
            }
        }
        if (e.currentTarget.innerText === "assembling") {
            if (!filterByStatus || filterByStatus !== "assembling") {
                setFilterByStatus("assembling");
                localStorage.setItem("status", "assembling");
            }
            else {
                setFilterByStatus("");
                localStorage.setItem("status", "");
            }
        }
        if (e.currentTarget.innerText === "done") {
            if (!filterByStatus || filterByStatus !== "done") {
                setFilterByStatus("done");
                localStorage.setItem("status", "done");
            }
            else {
                setFilterByStatus("");
                localStorage.setItem("status", "");
            }
        }
        setOpenStatus(false);
        setAnchorEl(null);
        onFilterChange();
    };

    return (
        <>
            <Tooltip title="Фильтр">
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpen}
                    sx={{
                        position: "fixed", bottom: 10, right: 25, backgroundColor: "#1976d2", color: "white",
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: "navy"
                        }
                    }}
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={close}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ mb: 5 }}
            >
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mb: openType || openStatus ? 15 : 0 }}
                    component="nav"
                >
                    <ListItemButton id="type" onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}>
                        <ListItemText primary="Фильтровать по типу" />
                        {openType ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItemButton id="status" onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}>
                        <ListItemText primary="Фильтровать по статусу" />
                        {openStatus ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openType} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByType(event)}>
                                delivery {filterByType === "delivery" ? <CheckIcon /> : null}
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByType(event)}>
                                hall {filterByType === "hall" ? <CheckIcon /> : null}
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={openStatus} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByStatus(event)}>
                                new {filterByStatus === "new" ? <CheckIcon /> : null}
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByStatus(event)}>
                                cooking {filterByStatus === "cooking" ? <CheckIcon /> : null}
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByStatus(event)}>
                                assembling {filterByStatus === "assembling" ? <CheckIcon /> : null}
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={(event: React.MouseEvent<HTMLElement>) => onChangeFilterByStatus(event)}>
                                done {filterByStatus === "done" ? <CheckIcon /> : null}
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Menu>
        </>

    );
}

export default FilterMenu;