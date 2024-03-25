export default {
  /**
   * Загрузка комментариев к товару
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментов и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // комменты загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  addForm: (level, id) =>
    // Добавление формы в список после коммента

    {
      return {
        type: "comments/add-form",
        payload: { level, id },
      };
    },

  cancelForm: () =>
    // Сброс текущих комментов и установка признака ожидания загрузки
    //dispatch({ type: "comments/send-start" });

    {
      return {
        type: "comments/cancel-form",
        payload: {},
      };
    },
    submit: (newCommentData, level, list, article, currItem) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментов и установка признака ожидания загрузки
      dispatch({ type: "comment/send-start" });
      let parent = {}
      console.log(article);
      if(currItem !== article._id && currItem !== undefined) {parent = { _id: list[list.findIndex((el) => el._id === currItem)]._id, _type: 'comment' }}
      if(currItem === undefined) {parent = {_id: article._id, _type: article._type}}
      try {
        const res = await services.api.request(
          {
            url: `/api/v1/comments`,
          },
          "POST",
          { body: JSON.stringify({ text: newCommentData.text, parent: parent }) }
        );
        // комменты загружены успешно
        dispatch({
          type: "comment/send-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comment/send-error" });
      }
    };
  },
};
//"comments/cancel-form"
