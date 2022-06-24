import NotificationsIcon from '@mui/icons-material/Notifications';
import style from '../styles/Notification.module.scss';

const Notification = ({ message, display }) => {
  return (
    <div className={style.main} style={display}>
      <div className={style.box}>
        <div className={style.inner}>
          <NotificationsIcon className={style.icon} /> {message}
        </div>
      </div>
    </div>
  );
};

export default Notification;
