import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

// Начальное состояние
export const initialState = {
  data: [],
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...state, data: [], waiting: true};

    case "comments/load-success":
      action.payload.data.items = treeToList(listToTree(action.payload.data.items)[0].children, (item, level) => ({...item, level}));
      return {...state, data: [...action.payload.data.items, {_id: "form", level: 0, cancel: false}], count: action.payload.data.count, waiting: false};

    case "comments/add-form":{
      state.data = state.data.filter((item) => item._id !== 'form')
      state.data ? state.data.splice(state.data.findIndex((el) => el._id === action.payload.id) + 1, 0, { _id: 'form', level: action.payload.level + 1, cancel: true}) :
      console.log(state);
      return {...state,  data: [...state.data],  waiting: false, currentItem: action.payload.id};} //@todo текст ошибки сохранять?

    case "comments/cancel-form": {
      state.data = state.data.filter((item) => item._id !== 'form')
      return {...state, data: [...state.data, {_id: "form", level: 0, cancel: false}]};
    }

    case "comments/load-error":
      return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
