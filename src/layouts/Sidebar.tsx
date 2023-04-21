import { Link } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

export default () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Fade in={true} timeout={350}>
      <Link to="/">
        <div className="w-12 h-12 rounded-12 absolute left-[50%] top-[96px] ml-[-390px] flex items-center justify-center text-white/40 border border-white/20 cursor-pointer">
          <BiChevronLeft className="text-[32px]" />
        </div>
      </Link>
    </Fade>
  )
}