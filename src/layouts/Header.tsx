import { Link } from 'react-router-dom';

export default () => (
  <Link to="/">
    <div className="w-screen mx-auto text-white/80">
      <div className="text-white/80 flex justify-center opacity-70 items-center border-b border-white/20 py-4">
        <img src="/logo.png" alt="logo" className="w-[32px] h-[32px] rounded-full mr-5" />
        <div className="text-[24px] font-extrabold text-orange-400 text-center leading-tight tracking-widest">
          A collection of tools for Quorum developers.
        </div>
      </div>
    </div>
  </Link>
)