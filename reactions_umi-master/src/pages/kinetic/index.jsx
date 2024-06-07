import React, { useState } from "react";
import { useIntl } from "umi";
import DocumentTitle from "react-document-title";
import { Layout, Row, Col, Pagination } from "antd";
import "./index.less";
const { Content, Footer } = Layout;
import Header from "../../Home/Header";

// 业务组件

import VideoSelector from "../../components/video_selector";

// 数据集合
const videIds = [
  "1350K_1.0bar",
  "1350K_3.0bar",
  "1500K_1.0bar",
  "1700K_1.0bar",
  "2000K_1.0bar",
  "2200K_1.0bar",
  "2500K_1.0bar",
  "3000K_1.0bar",
  "1350K_2.0bar",
  "1350K_5.0bar",
  "1500K_2.0bar",
  "1700K_2.0bar",
  "2000K_2.0bar",
  "2200K_2.0bar",
  "2500K_2.0bar",
  "3000K_2.0bar",
];

// 页面组件，写法上是组件，其实是个页面
export default () => {
  // react hooks相关逻辑方法
  const intl = useIntl();
  const [imgs, setImgs] = useState(videIds);
  const [videoSrc, setVideo] = useState("1000");

  const handleImgClick = (id) => {
    console.log(id);
    setVideo(id);
  };

  // 返回组件相关, 页面主体
  return (
    <Layout className="layout">
      <Header defaultSelectedKey="kinetic"></Header>
      <Content
        style={{
          padding: "0 50px",
          flex: 1,
          height: "100%",
          marginTop: "80px",
        }}
      >
        {/* 主体部分 */}
        <div className="site-layout-content">
          {/* 比query1多一个图片滑动选择 */}
          <VideoSelector
            imgs={imgs}
            onSelect={handleImgClick}
            title={intl.formatMessage({
              id: "video_picker",
            })}
          />
          {/* 布局相关 */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <div className="video-wrapper">
                <video
                  id="rmg_video"
                  src={`http://8.130.53.206:8088/${videoSrc}.mp4`}
                  controls="controls"
                ></video>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SXICC © 2022 Created by
      </Footer>
      <DocumentTitle
        title={intl.formatMessage({
          id: "btn_3",
        })}
        key="title"
      />
    </Layout>
  );
};
