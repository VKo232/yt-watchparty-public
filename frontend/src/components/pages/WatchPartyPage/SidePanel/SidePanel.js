import './SidePanel.scss';
import React, { useEffect, useState } from "react";
import PlaylistPanel from './PlaylistPanel/PlaylistPanel';
import UsersPanel from './UsersPanel/UsersPanel';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import GroupIcon from '@mui/icons-material/Group';

const PLAYLIST_TYPE = 0;
const USERS_TYPE = 1;

export default function SidePanel({playlistData, usersData}) {
    const [panelType, setPanelType] = useState(-1);
    const sidePanel = document.getElementById('sidePanel');
    const openPlaylistBtn = document.getElementById("openPlaylistBtn");
    const openUsersBtn = document.getElementById("openUsersBtn");
    const [closeIcon, setCloseIcon] = useState(null);
    const [theme, setTheme] = useState('');

    const closePanel = () => {
        setPanelType(-1);
        sidePanel.style.width = 0;
        setCloseIcon(null);
    }
    
    const openPanel = (type) => {
        setPanelType(type);
        sidePanel.style.width = "19%";

    }

    useEffect(() => {
        document.onclick = (e) => {
            if (panelType === PLAYLIST_TYPE) {
                if ((!sidePanel.contains(e.target) && !openPlaylistBtn.contains(e.target))
                    || (closeIcon!==null && closeIcon.contains(e.target))) {
                    closePanel();
                }
            } 
            else if (panelType === USERS_TYPE) {
                if (!sidePanel.contains(e.target) && !openUsersBtn.contains(e.target)
                    || (closeIcon!==null && closeIcon.contains(e.target))) {
                    closePanel();
                }
            }
        }
    }, [closeIcon])

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setTheme(localStorage.getItem('theme'));
        }
        document.addEventListener('themeChange', () => {
            setTheme(localStorage.getItem('theme'));
        });
    }, []);
    
    return (
        <div className={theme === 'dark' ? 'side-panel-col-dark' : 'side-panel-col'}>
            <PlaylistPlayIcon id='openPlaylistBtn' className='playlist-icon' onClick={()=>openPanel(PLAYLIST_TYPE)} />
            <GroupIcon id='openUsersBtn' className="users-icon" onClick={()=>openPanel(USERS_TYPE)} />
            <div id="sidePanel" className={theme === 'dark' ? "side-panel-dark" : "side-panel"}>
                {panelType !== -1 && panelType === PLAYLIST_TYPE &&
                    <PlaylistPanel playlistData={playlistData} setCloseIcon={setCloseIcon} />
                }
                {panelType !== -1 && panelType === USERS_TYPE &&
                    <UsersPanel usersData={usersData} setCloseIcon={setCloseIcon} />
                }
            </div>
        </div>
    )
}