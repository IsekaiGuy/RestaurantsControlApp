import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    textAlign: "center",
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    openToggle: boolean;
    onChangeStatus(status: string): void;
}

const ChangeStatusModal = (props: Props) => {
    const statuses = ["new", "cooking", "assembling", "done"];

    return (
        <div>
            <Modal
                open={props.openToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ pb: 3 }}>
                        Сменить статус заказа
                    </Typography>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                        {statuses.map(item => {
                            return (<Button key={item} onClick={() => props.onChangeStatus(item)} variant="contained" style={{ marginBottom: 12 }}>
                                {item}
                            </Button>)
                        })}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ChangeStatusModal;