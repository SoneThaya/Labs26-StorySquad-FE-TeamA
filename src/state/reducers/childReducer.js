import {
  UPDATE_CHILD_INFO,
  CLEAR_CHILD_INFO,
  READING_COMPLETED,
  WRITING_COMPLETED,
  DRAWING_COMPLETED,
} from '../actions';

const initialState = {
  student_id: '',
  username: '',
  records: {},
  settings: {
    game_mode: 'singleplayer',
    multiplayer_current_chapter: 1,
    singleplayer_current_chapter: 1,
    reading_complete: false,
    writing_complete: false,
    drawing_complete: false,
    displayDashboardWelcomeModal: true,
  },
};

export const childReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case SOME_CASE_HERE:
    //   return {
    //     ...state,
    //     addItem: true,
    //   }

    case UPDATE_CHILD_INFO:
      return {
        ...state,
        student_id: payload.student_id,
        username: payload.username,
        records: payload.records,
        // settings: {
        //   game_mode: 'singleplayer',
        //   multiplayer_current_chapter: 1,
        //   singleplayer_current_chapter: 1,
        //   reading_complete: false,
        //   writing_complete: false,
        //   drawing_complete: false,
        // },
      };

    case CLEAR_CHILD_INFO:
      return {
        ...state,
        student_id: '',
        username: '',
        records: {},
        settings: {
          game_mode: 'singleplayer',
          multiplayer_current_chapter: 1,
          singleplayer_current_chapter: 1,
          reading_complete: false,
          writing_complete: false,
          drawing_complete: false,
        },
      };

    case READING_COMPLETED:
      return {
        ...state,
        settings: { ...state.settings, reading_complete: true },
      };

    case WRITING_COMPLETED:
      return {
        ...state,
        settings: { ...state.settings, writing_complete: true },
      };

    case DRAWING_COMPLETED:
      return {
        ...state,
        settings: { ...state.settings, drawing_complete: true },
      };

    default:
      return state;
  }
};
