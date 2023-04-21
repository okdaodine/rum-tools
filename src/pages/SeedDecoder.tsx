import { observer, useLocalObservable } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { useStore } from 'store';
import { TextField } from '@material-ui/core';
import rumSDK from 'rum-sdk-browser';

export default observer(() => {
  const { snackbarStore, confirmDialogStore } = useStore();
  const state = useLocalObservable(() => ({
    seed: '',
  }));

  const decode = async () => {
    try {
      const seedJSON = rumSDK.utils.restoreSeedFromUrl(state.seed);
      confirmDialogStore.show({
        content: `
          <div class="-mt-3 justify-center bg-gray-100 dark:bg-black dark:bg-opacity-70 rounded-0 pt-3 px-4 md:px-6 pb-3 leading-7 tracking-wide text-left overflow-auto text-12">
            <pre>${JSON.stringify(seedJSON, null, 2)}</pre>
          </div>`,
        contentClassName: 'md:max-w-[640px]',
        cancelDisabled: true,
        ok: () => {
          confirmDialogStore.hide();
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
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Seed Parser</div>
        <div className="pt-8 px-10">
          <TextField
            className="w-full"
            placeholder={`Seed`}
            size="small"
            multiline
            minRows={10}
            maxRows={10}
            value={state.seed}
            autoFocus
            onChange={(e) => { state.seed = e.target.value.trim() }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && state.seed) {
                decode();
              }
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-6 pb-8 flex justify-center items-start">
          <Button onClick={decode} disabled={!state.seed}>Decode</Button>
        </div>
      </div>
    </Fade>
  )
})