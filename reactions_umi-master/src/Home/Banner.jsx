import React from "react";
import PropTypes from "prop-types";
import ScrollElement from "rc-scroll-anim/lib/ScrollElement";
import GitHubButton from "react-github-button";
import { Icon } from "antd";
import QueueAnim from "rc-queue-anim";
import { Link } from "umi";
import { useIntl } from "umi";

function typeFunc(a) {
  if (a.key === "line") {
    return "right";
  } else if (a.key === "button") {
    return "bottom";
  }
  return "left";
}

export default function Banner({ onEnterChange }) {
  const intl = useIntl();

  return (
    <section className="page banner-wrapper">
      <ScrollElement
        className="page"
        id="banner"
        onChange={({ mode }) => onEnterChange(mode)}
        playScale={0.9}
      >
        <QueueAnim
          className="banner-text-wrapper"
          type={typeFunc}
          delay={300}
          key="banner"
        >
          <h2 key="h2">
            VISUALIZE <p>REACTION</p>
          </h2>
          <p key="content">{intl.formatMessage({ id: "title_desc" })}</p>
          <span className="line" key="line" />
          <div key="button1" className="start-button clearfix">
            <Link to="/GibbsAB">{intl.formatMessage({ id: "btn_1" })}</Link>
            <Link to="/GibbsABC">{intl.formatMessage({ id: "btn_2" })}</Link>
            {/*<Link to="/kinetic">{intl.formatMessage({ id: "btn_3" })}</Link>*/}
          </div>
        </QueueAnim>
        <Icon type="down" className="down" />
      </ScrollElement>
    </section>
  );
}
Banner.propTypes = {
  onEnterChange: PropTypes.func,
};
