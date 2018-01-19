import Ember from 'ember'
const {Component, run} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import layout from './template'

export default Component.extend(PropTypeMixin, {
  layout,
  classNames: ['file-explorer-panel'],
  classNameBindings: ['isCollapsed:explorer-collapsed'],
  hook: 'file-explorer',
  propTypes: {
    fileTree: PropTypes.array,
    isCollapsed: PropTypes.bool
  },

  getDefaultProps () {
    return {
      isCollapsed: true
    }
  },

  didInsertElement () {
    this._clickHandler = () => {
      run.schedule('actions', () => {
        this.set('isCollapsed', !this.get('isCollapsed'))
      })
    }

    this.$('.explorer-tab').on('click', this._clickHandler)
  },

  willDestroyElement () {
    this.$('.explorer-tab').off('click', this._clickHandler)
  },

  actions: {
    onFileClick (filePath) {
      this.sendAction('onFileClick', filePath)
    }
  }
})
