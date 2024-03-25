export default {
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
