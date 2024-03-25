
// Начальное состояние
export const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/send-start":
      return {...state, data: {}, waiting: true};

    case "comment/send-success":
      //action.payload.data.items = treeToList(listToTree(action.payload.data.items)[0].children, (item, level) => ({...item, level}));
      state.data = state.data.filter((item) => item._id !== 'form');
      state.data ? state.data.splice(state.data.findIndex((el) => el._id === action.payload.parent._id) + 1, 0, { ...action.payload, level: action.payload.level + 1}) : { ...action.payload, level: 0}//insert new item
      return {...state, data: [...state.data, {_id: "form", level: 0, cancel: false}]};

    case "comment/send-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
