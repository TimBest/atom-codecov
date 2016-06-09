'use babel';

import AtomCodecovView from './atom-codecov-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCodecovView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCodecovView = new AtomCodecovView(state.atomCodecovViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCodecovView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-codecov:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCodecovView.destroy();
  },

  serialize() {
    return {
      atomCodecovViewState: this.atomCodecovView.serialize()
    };
  },

  toggle() {
    console.log('AtomCodecov was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
