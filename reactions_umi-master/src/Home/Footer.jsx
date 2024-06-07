import React from "react";
import { Row, Col } from "antd";

function Footer() {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>
          <span style={{ marginRight: 12 }}>
            <a href="http://beian.miit.gov.cn">京ICP备2022014392号</a>
          </span>
          <span style={{ marginRight: 12 }}>Copyright © SXICC</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
