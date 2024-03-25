import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import CommentFrom from "../comment-from";
import { Link } from "react-router-dom";

function CommentsList(props) {
  const cn = bem("CommentsList");

  return (
    <div className={cn()}>
      <p className={cn("title")}>{`${props.t("comments.title")} (${props.count})`}</p>
      <div className="list">
        {props.list && props.list.map((item) => (
          <div key={item._id} className="">
            {props.renderItem(item)}
          </div>
        ))}
        {/* <CommentFrom /> */}
      </div>
    </div>
  );
}

export default memo(CommentsList);
