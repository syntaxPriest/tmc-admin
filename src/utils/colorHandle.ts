export function handleBg(state: string) {
    if (state){
      if (
        state.toLowerCase()  === 'successful'.toLowerCase() ||
        state.toLowerCase()  === 'success'.toLowerCase() ||
        state.toLowerCase()  === 'active'.toLowerCase() || 
        state.toLowerCase()  === 'Complete'.toLowerCase() || 
        state.toLowerCase()  === 'Completed'.toLowerCase() ||
        state.toLowerCase() === 'Open' ||
        state.toLowerCase() === 'Open tickets'
      ) {
        return '#E8FBD8';
      } else if (
        state.toLowerCase() === 'pending'.toLowerCase() ||
        state.toLowerCase() === 'Archived'.toLowerCase() ||
        state.toLowerCase() === 'On-going'.toLowerCase()
        ) {
        return '#F0F3F6';
      } else if (
        state.toLowerCase() === 'failed'.toLowerCase() ||
        state.toLowerCase() === 'Closed ticket'||
        state.toLowerCase() === 'Closed'
      ) {
        return '#FFEAEA';
      }
    }
  }
  
  export function handleColor(state: string) {
    if (state){
      if (
          state.toLowerCase()  === 'successful'.toLowerCase() ||
          state.toLowerCase()  === 'success'.toLowerCase() ||
          state.toLowerCase()  === 'active'.toLowerCase() || 
          state.toLowerCase()  === 'Complete'.toLowerCase() || 
          state.toLowerCase()  === 'Completed'.toLowerCase() ||
          state.toLowerCase()  === 'Open' ||
          state.toLowerCase()  === 'Open tickets'
      ) {
        return '#03A213';
      } else if (
          state.toLowerCase()  === 'pending'.toLowerCase() ||
          state.toLowerCase() === 'Archived'.toLowerCase() ||
          state.toLowerCase() === 'On-going'.toLowerCase()
          ) {
        return '#8796AD';
      } else if (
        state.toLowerCase()  === 'failed'.toLowerCase() ||
        state.toLowerCase()  === 'Closed ticket' ||
        state.toLowerCase()  === 'Closed'
      ) {
        return '#F2000B';
      }
    }
  }
  