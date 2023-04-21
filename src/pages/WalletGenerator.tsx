import { observer } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { useStore } from 'store';
import { ethers } from 'ethers';
import copy from 'copy-to-clipboard';
import sleep from 'utils/sleep';

export default observer(() => {
  const { snackbarStore, confirmDialogStore } = useStore();

  const createWallet = async () => {
    try {
      const wallet = ethers.Wallet.createRandom();
      confirmDialogStore.show({
        content: `Private Key<div class="text-12 opacity-70 mt-2 leading-5">${wallet.privateKey}</div>`,
        okText: 'Copy',
        ok: async () => {
          copy(wallet.privateKey);
          confirmDialogStore.hide();
          await sleep(300);
          snackbarStore.show({
            message: 'copied'
          });
        },
      });
    } catch (err) {
      console.log(err);
      snackbarStore.show({
        message: 'Something wrong',
        type: 'error',
      });
    }
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="mt-8 rounded-12 border border-white/30 py-6 px-8 w-[600px] mx-auto">
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Create Wallet</div>
        <div className="py-10 flex justify-center items-start">
          <Button onClick={createWallet}>Click to create</Button>
        </div>
      </div>
    </Fade>
  )
})