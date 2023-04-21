import { observer, useLocalObservable } from 'mobx-react-lite';
import Fade from '@material-ui/core/Fade';
import Button from 'components/Button';
import { TextField } from '@material-ui/core';
import listContents from './listContents';

export default observer(() => {
  const state = useLocalObservable(() => ({
    seed: '',
  }));

  const list = async () => {
    listContents(state.seed);
  }

  return (
    <Fade in={true} timeout={350}>
      <div className="mt-8 rounded-12 border border-white/30 py-6 px-8 w-[600px] mx-auto">
        <div className="text-orange-400/80 font-bold text-24 text-center tracking-wider">Trx Browser</div>
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
                list();
              }
            }}
            margin="dense"
            variant="outlined"
          />
        </div>
        <div className="pt-6 pb-8 flex justify-center items-start">
          <Button onClick={list} disabled={!state.seed}>List latest trxs</Button>
        </div>
      </div>
    </Fade>
  )
})