import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyTab',
  props: {
    onClose: {
      type: Function,
      required: true
    },
    tab: {
      type: Object,
      required: true
    }
  },
  
  setup(props) {
    // Tab closing handler with event prevention
    const handleCloseTab = (e, tabId) => {
      e.stopPropagation()
      props.onClose(tabId)
    }

    return {
      handleCloseTab
    }
  },

  render() {
    return (
      <div class="tab">
        {this.tab.title}
        <button 
          class="close-tab-btn"
          onClick={(e) => this.handleCloseTab(e, this.tab.id)}
        >
          <span>×</span>
        </button>
      </div>
    )
  }
})
