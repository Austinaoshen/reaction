import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Icon, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { Link } from "umi";
import Chart from "../components/chart";
import { query2 } from "../data/mock-data";
import { useIntl } from "umi";
export default function Page2({ isMobile }) {
  const intl = useIntl();
  return (
    <ScrollOverPack id="page2" className="content-wrapper page">
      <QueueAnim
        className="text-wrapper left-text"
        key="text"
        duration={450}
        type="bottom"
        leaveReverse
      >
        <h2 key="h2">
          {intl.formatMessage({
            id: "Page2_title",
          })}
        </h2>
        <p key="p" style={{ maxWidth: 260 }}>
          {intl.formatMessage({
            id: "Page2_description",
          })}
        </p>
        <div key="button">
          <Link to="/GibbsABC">
            <Button type="primary" size="large">
              {intl.formatMessage({
                id: "try",
              })}
              <Icon type="right" />
            </Button>
          </Link>
        </div>
      </QueueAnim>
      <TweenOne
        key="image"
        className="image-wrapper"
        animation={{ x: 0, opacity: 1, ease: "easeOutQuad" }}
        style={{ transform: "translateX(100px)", opacity: 0 }}
      >
        <div className="image2">
          <Chart name="query2" {...query2}></Chart>
        </div>
      </TweenOne>
    </ScrollOverPack>
  );
}
Page2.propTypes = {
  isMobile: PropTypes.bool,
};
