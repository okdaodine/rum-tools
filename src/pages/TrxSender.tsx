import { observer, useLocalObservable } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { TextField } from '@material-ui/core';
import { TrxApi } from 'apis';
import { useStore } from 'store';
import rumSDK from 'rum-sdk-browser';

export default observer(() => {
  const { snackbarStore, confirmDialogStore } = useStore();
  const state = useLocalObservable(() => ({
    seed: '',
    data: '',
    privateKey: '',
    loading: false
  }));

  const submit = async () => {
    (async () => {
      let json: any;
      try {
        json = JSON.parse(state.data);
      } catch (err) {
        console.log(err);
        snackbarStore.show({
          message: 'Invalid json',
          type: 'error',
        });
        return;
      }
      if (state.loading) {
        return;
      }
      state.loading = true;
      try {
        const group = rumSDK.utils.seedUrlToGroup(state.seed);
        const payload = await rumSDK.utils.signTrx({
          groupId: group.groupId,
          data: json,
          aesKey: group.cipherKey,
          privateKey: state.privateKey,
        });
        console.log(`[]:`, { payload });
        const res = await TrxApi.send(payload, { seed: state.seed });
        confirmDialogStore.show({
          content: `Done. Trx id 👇 <br /><span class="text-12 opacity-60 whitespace-nowrap">${res.trx_id}</span>`,
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
      state.loading = false;
    })();
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="mt-8 rounded-12 border border-white/30 py-6 px-8 w-[600px] mx-auto">
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Trx Sender</div>
        <div className="pt-8 px-10">
          <TextField
            className="w-full"
            placeholder={`Seed`}
            size="small"
            multiline
            minRows={10}
            maxRows={10}
            value={state.seed}
            onChange={(e) => { state.seed = e.target.value.trim() }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-2 px-10">
          <TextField
            className="w-full"
            placeholder={`Trx data. For example { "foo": "bar" }`}
            size="small"
            multiline
            minRows={6}
            maxRows={6}
            value={state.data}
            onChange={(e) => { state.data = e.target.value.trim() }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-2 px-10">
          <TextField
            className="w-full"
            placeholder={`Private Key`}
            size="small"
            value={state.privateKey}
            onChange={(e) => { state.privateKey = e.target.value.trim() }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && state.privateKey) {
                submit();
              }
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-6 pb-8 flex justify-center items-start">
          <Button onClick={submit} disabled={!state.seed || !state.data} isDoing={state.loading}>Submit</Button>
        </div>
      </div>
    </Fade>
  )
})