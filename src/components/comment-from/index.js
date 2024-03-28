import { forwardRef, memo, useCallback, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import useTranslate from "../../hooks/use-translate";
import Field from "../../components/field";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Textarea from "../textarea";
import SideLayout from "../side-layout";

const CommentForm = forwardRef((props, ref) => {
  const { t } = useTranslate();
  const cn = bem("CommentForm");

  const [text, setText] = useState("");

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value) => {
      setText(value);
    }, []), //  ///////////// TODODDDODODO! potenshially mojno vinesti state eshe wishe

    // Отправка данных формы для авторизации
    onSubmit: useCallback(
      (e, text, level, list, article, currItem, profile) => {
        e.preventDefault();
        props.onSubmit(text, level, list, article, currItem, profile);
      },
      [text]
    ),
  };

  return (
    <form
    className={cn()}
      style={{ marginLeft: 30 * (props.level > 10 ? 10 : props.level ) + "px" }}
      onSubmit={(e) => callbacks.onSubmit(e, {text}, props.level, props.list, props.article, props.currItem, props.profile.profile)}
      ref={ref}
    >
      <h2 className={cn("title")}>{t("add.comment.title")}</h2>
      <Textarea
        name="message"
        value={text}
        onChange={callbacks.onChange}
        placeholder={t("add.comment.placeholder")}
      />
      {!props.cancel ? (
        <button className={cn("button")} type="submit">
          {t("add.comment.button")}
        </button>
      ) : (
        <SideLayout>
          <button className={cn("button")} type="submit">
            {t("add.comment.button")}
          </button>
          <button onClick={props.onCancel} type='button' className={cn("button")}>{t("cancel.comment.button")}</button>
        </SideLayout>
      )}
    </form>
  );
})

export default memo(CommentForm);
