import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { StoreProvider } from 'store';
import Loading from 'components/Loading';
import { useStore } from 'store';
import Modal from 'components/Modal';
import RumSdk, { IDecryptedContent } from 'rum-sdk-browser';

interface IModalProps {
  seed: string
  rs: (result: boolean) => void
}

const Main = observer((props: IModalProps) => {
  const { snackbarStore } = useStore();
  const state = useLocalObservable(() => ({
    contents: [] as IDecryptedContent[],
    loading: true,
    open: false,
  }));

  React.useEffect(() => {
    setTimeout(() => {
      state.open = true;
    });
  }, []);
  
  React.useEffect(() => {
    (async () => {
      try {
        const { groupId } = RumSdk.cache.Group.add(props.seed);
        const contents = await RumSdk.chain.Content.list({
          groupId,
          count: 10,
          reverse: true
        });
        state.contents = (contents || []) as IDecryptedContent[];
      } catch (err) {
        console.log(err);
        snackbarStore.show({
          message: 'something wrong',
          type: 'error',
        });
      }
      state.loading = false;
    })();
  }, []);

  const handleClose = (result: any) => {
    state.open = false;
    props.rs(result);
  };

  return (
    <Modal open={state.open} onClose={() => handleClose(false)}>
      <div className="h-[90vh] overflow-y-auto  p-8 px-5 md:px-10 box-border">
        <div className="w-full md:w-[540px]">
          {state.loading && (
            <div className="py-56">
              <Loading />
            </div>
          )}
          {!state.loading && (
            <>
              <div className="text-18 font-bold text-center pb-10 leading-none">Last 10 trxs</div>
              <div className="-mt-3 justify-center bg-gray-100 dark:bg-black dark:bg-opacity-70 rounded-0 pt-3 px-4 md:px-6 pb-3 leading-7 tracking-wide text-left overflow-auto text-12">
                <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(state.contents, null, 2) }} />
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
});

export default async (seed: string) => new Promise((rs) => {
  const div = document.createElement('div');
  document.body.append(div);
  const unmount = () => {
    unmountComponentAtNode(div);
    div.remove();
  };
  render(
    (
      <StoreProvider>
        <Main
          seed={seed}
          rs={(result: any) => {
            rs(result);
            setTimeout(unmount, 500);
          }}
        />
      </StoreProvider>
    ),
    div,
  );
});