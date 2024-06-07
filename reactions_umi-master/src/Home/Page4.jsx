import React from "react";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import QueueAnim from "rc-queue-anim";
import { useIntl } from "umi";
export default function Page4() {
  const intl = useIntl();
  return (
    <ScrollOverPack id="page4" className="content-wrapper page">
      <QueueAnim
        className="text-wrapper-bottom"
        key="text"
        leaveReverse
        type="bottom"
      >
        <h2 key="h2">
          {intl.formatMessage({
            id: "Page4_title",
          })}
        </h2>
        <p key="p">
          {intl.formatMessage({
            id: "Page4_description",
          })}
        </p>
      </QueueAnim>
      <TweenOne
        key="image"
        className="image4 bottom-wrapper"
        animation={{
          y: 0,
          opacity: 1,
          duration: 550,
          delay: 150,
          ease: "easeOutQuad",
        }}
        style={{ transform: "translateY(50px)", opacity: 0 }}
      />
    </ScrollOverPack>
  );
}
