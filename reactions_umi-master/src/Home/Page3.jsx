import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Icon, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { Link } from "umi";
import { useIntl } from "umi";

export default function Page3({ isMobile }) {
  const intl = useIntl();
  return (
    <ScrollOverPack id="page3" className="content-wrapper page">
      <TweenOne
        key="image"
        className="image3 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: "easeOutQuad" }}
        style={{ transform: "translateX(-100px)", opacity: 0 }}
      />
      <QueueAnim
        className="text-wrapper"
        key="text"
        type={isMobile ? "bottom" : "right"}
        leaveReverse
        style={{ top: "40%" }}
      >
        <h2 key="h2">
          {intl.formatMessage({
            id: "Page3_title",
          })}
        </h2>
        <p key="p" style={{ maxWidth: 280 }}>
          {intl.formatMessage({
            id: "Page3_description",
          })}
        </p>
        <div key="button">
          <Link to="/kinetic">
            <Button type="primary" size="large">
              {intl.formatMessage({
                id: "try",
              })}

              <Icon type="right" />
            </Button>
          </Link>
        </div>
      </QueueAnim>
    </ScrollOverPack>
  );
}
Page3.propTypes = {
  isMobile: PropTypes.bool,
};
