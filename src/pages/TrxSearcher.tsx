import { observer, useLocalObservable } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { TextField } from '@material-ui/core';
import { TrxApi } from 'apis';
import { useStore } from 'store';

export default observer(() => {
  const { snackbarStore, confirmDialogStore } = useStore();
  const state = useLocalObservable(() => ({
    seed: '',
    trxId: '',
  }));

  const getTrx = async () => {
    (async () => {
      try {
        const trx = await TrxApi.get({
          seed: encodeURIComponent(state.seed),
          trxId: state.trxId,
        });
        if (Object.keys(trx || {}).length === 0) {
          snackbarStore.show({
            message: 'Not found',
            type: 'error',
          });
          return;
        }
        confirmDialogStore.show({
          content: `
            <div class="-mt-3 justify-center bg-gray-100 dark:bg-black dark:bg-opacity-70 rounded-0 pt-3 px-4 md:px-6 pb-3 leading-7 tracking-wide text-left overflow-auto text-12">
              <pre>${JSON.stringify(trx, null, 2)}</pre>
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
          message: 'something wrong',
          type: 'error',
        });
      }
    })();
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="mt-8 rounded-12 border border-white/30 py-6 px-8 w-[600px] mx-auto">
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Trx Searcher</div>
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
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-2 px-10">
          <TextField
            className="w-full"
            placeholder={`Trx Id`}
            size="small"
            value={state.trxId}
            onChange={(e) => { state.trxId = e.target.value.trim() }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && state.trxId) {
                getTrx();
              }
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-6 pb-8 flex justify-center items-start">
          <Button onClick={getTrx} disabled={!state.seed || !state.trxId}>Search</Button>
        </div>
      </div>
    </Fade>
  )
})