import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Icon, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { Link } from "umi";
import Chart from "../components/chart";
import { query1 } from "../data/mock-data";
import { useIntl } from "umi";
export default function Page1({ isMobile }) {
  const intl = useIntl();
  return (
    <ScrollOverPack id="page1" className="content-wrapper page">
      <TweenOne
        key="image"
        className="image-wrapper"
        animation={{ x: 0, opacity: 1, ease: "easeOutQuad" }}
        style={{ transform: "translateX(-100px)", opacity: 0 }}
      >
        <div className="image1">
          <Chart name="query1" {...query1}></Chart>
        </div>
      </TweenOne>
      <QueueAnim
        type={isMobile ? "bottom" : "right"}
        className="text-wrapper"
        key="text"
        leaveReverse
      >
        <h2 key="h2">
          {intl.formatMessage({
            id: "Page1_title",
          })}
        </h2>
        <p key="p" style={{ maxWidth: 310 }}>
          {intl.formatMessage({
            id: "Page1_description",
          })}
        </p>
        <div key="button">
          <Link to="/GibbsAB">
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
Page1.propTypes = {
  isMobile: PropTypes.bool,
};
