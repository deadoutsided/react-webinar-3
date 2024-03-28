import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

const UnathorizedComment = forwardRef((props, ref) => {
  const cn = bem("UnathorizedComment");

  return (
    <div style={{ marginLeft: 30 * props.level + "px" }} className={cn()} ref={ref}>
      <p className={cn("text")}>
        <Link className={cn("link")} to={props.link} state={props.state}>
          {props.t("comment.unauthorized.link")}
        </Link>
        {props.t("comment.unauthorized.text")}
        <span className={cn("cancel")} onClick={props.onCancel}>
          {props.t("cancel.comment.button")}
        </span>
      </p>
    </div>
  );
})

UnathorizedComment.propTypes = {
  link: PropTypes.string.isRequired,
  level: PropTypes.number,
};

UnathorizedComment.defaultProps = { link: "/", level: 0 };

export default memo(UnathorizedComment);
