import { observer, useLocalObservable } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { useStore } from 'store';
import { TextField } from '@material-ui/core';
import RumSdk from 'rum-sdk-browser';

export default observer(() => {
  const { snackbarStore } = useStore();
  const state = useLocalObservable(() => ({
    trx: '',
  }));

  const parse = async () => {
    try {
      let trx: any;
      try {
        trx = JSON.parse(state.trx);
      } catch (err) {
        console.log(err);
        snackbarStore.show({
          message: 'Invalid json',
          type: 'error',
        });
        return;
      }
      const result = RumSdk.utils.verifyTrx(trx);
      if (result) {
        snackbarStore.show({
          message: 'Valid',
        });
      } else {
        snackbarStore.show({
          message: 'Invalid',
          type: 'error',
        });
      }
    } catch (err) {
      console.log(err);
      snackbarStore.show({
        message: 'Invalid',
        type: 'error',
      });
    }
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="mt-8 rounded-12 border border-white/30 py-6 px-8 w-[600px] mx-auto">
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Trx Validator</div>
        <div className="pt-8 px-10">
          <TextField
            className="w-full"
            placeholder={`Trx`}
            size="small"
            multiline
            minRows={10}
            maxRows={10}
            value={state.trx}
            autoFocus
            onChange={(e) => { state.trx = e.target.value.trim() }}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && state.trx) {
                parse();
              }
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-6 pb-8 flex justify-center items-start">
          <Button onClick={parse} disabled={!state.trx}>Verify</Button>
        </div>
      </div>
    </Fade>
  )
})