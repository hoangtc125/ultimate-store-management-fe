import styles from './index.module.scss'
import classNames from 'classnames/bind'
import { BackTop } from 'antd'
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import * as ROLE from '../../../constants/role'
import { isRole } from '../../../utils/check';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

const cx = classNames.bind(styles)
const USMBody = ({ Component }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={cx('wrapper')}>
            {Component}
            <>
                <BackTop 
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "100px",
                    }}
                />
                {isRole([ROLE.ADMIN, ROLE.STAFF]) && <>
                    <Backdrop open={open} />
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        sx={{ position: 'fixed', bottom: "80px", right: "0px" }}
                        icon={<SpeedDialIcon />}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                    >
                        {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={handleClose}
                        />
                        ))}
                    </SpeedDial>
                </>}
            </>
        </div>
    )
}

export default USMBody