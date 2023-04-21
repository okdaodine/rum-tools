import { observer } from 'mobx-react-lite';
import { isMobile } from 'utils/env';
import { AiOutlineGithub, AiOutlineSync, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronRight, BiWallet, BiRocket } from 'react-icons/bi';
import { RiSeedlingLine, RiListUnordered } from 'react-icons/ri';
import { MdOutlineGeneratingTokens } from 'react-icons/md';
import { TbShieldCheck } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';

export default observer(() => {

  if (isMobile) {
    return (
      <div className="pt-[40vh] text-center text-white/40">
        This app is not available on mobile.
      </div>
    )
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="w-[1000px] mx-auto text-white/80 tracking-wide">
        <div className="grid grid-cols-3 gap-7 mt-10">
          <Link to="/wallet-generator">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <BiWallet className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Wallet Generator</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Click to create an ETH wallet.
                </div>
              </div>
            </div>
          </Link>
          <Link to="/seed-decoder">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <RiSeedlingLine className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Seed Decoder</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Decode seed url to raw text.
                </div>
              </div>
            </div>
          </Link>
          <Link to="/token-decoder">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <MdOutlineGeneratingTokens className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Token Decoder</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Decode JWT to raw text.
                </div>
              </div>
            </div>
          </Link>
          <Link to="/trx-validator">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <TbShieldCheck className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Trx Validator</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Verify a trx.
                </div>
              </div>
            </div>
          </Link>
          <Link to="/trx-browser">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <RiListUnordered className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Trx Browser</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  List latest trxs from a group.
                </div>
              </div>
            </div>
          </Link>
          <Link to="/trx-searcher">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <AiOutlineSearch className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Trx Searcher</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Search a trx from a group
                </div>
              </div>
            </div>
          </Link>
          <Link to="/trx-sender">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <BiRocket className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Trx Sender</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Submit a trx to a group
                </div>
              </div>
            </div>
          </Link>
          <Link to="/base64-decoder">
            <div className="py-4 px-5 flex border border-white/20 rounded-10 cursor-pointer">
              <AiOutlineSync className="w-[30px] h-[30px] text-orange-400/80 mr-4" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-16 tracking-wider">Base64 Decoder</div>
                  <BiChevronRight className="text-[24px] opacity-60" />
                </div>
                <div className="mt-2 opacity-50">
                  Decode base64 to raw text.
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div
          className='fixed bottom-10 right-10 w-10 h-10 mx-auto rounded-full hidden md:flex items-center justify-center cursor-pointer border dark:border-white dark:md:border-opacity-10 dark:border-opacity-[0.05] border-gray-c4'
          onClick={() => {
            window.open('https://github.com/okdaodine/rum-tools');
          }}
        >
          <AiOutlineGithub className="text-20 dark:text-white dark:text-opacity-80 text-gray-af" />
        </div>
      </div>
    </Fade>
  )
});
