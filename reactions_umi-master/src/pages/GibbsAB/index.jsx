import React, { useState } from "react";
import { Layout, Row, Col, Pagination } from "antd";
import { useIntl } from "umi";
import "./index.less";
const { Content, Footer } = Layout;
import Header from "../../Home/Header";
import DocumentTitle from "react-document-title";

// 业务组件
import Silder from "../../components/silder";
import Chart from "../../components/chart";

// 数据集合
import Qm9HashDict from "../../data/qm9_hash_dict.js";
import Qm9G from "../../data/qm9_G.js";

let max_node_cnt = 10;
let node = [];
// 页面组件，写法上是组件，其实是个页面
export default () => {
  const intl = useIntl();

  // react hooks相关逻辑方法
  const [chartData, setChartData] = useState({ link: [], nodes: [] });
  const [count, setCount] = useState(0);
  // 选择silder后的回调
  const handleSelect = (selector) => {
    const { carbon, oxygen, nitrogen, fluorine, hydrogen } = selector;
    const mol_hash =
      carbon.value * 1000000 +
      oxygen.value * 100000 +
      nitrogen.value * 10000 +
      fluorine.value * 1000 +
      hydrogen.value * 1;
    console.log(mol_hash);
    node = [];
    if (Qm9HashDict[mol_hash]) {
      for (var i = 0; i < Qm9HashDict[mol_hash].length; i++) {
        node.push(Qm9HashDict[mol_hash][i]);
      }
      console.log('node',node)
      node.sort(function (i, j) {
        return Qm9G[i] - Qm9G[j];
      });
    }
    console.log('node',node)
    setCount(node.length);
    drawChart(node);
  };

  // 分页组件
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handlePageChange = (page, pageSize) => {
    console.log('page, pageSize, page * pageSize, node.length',page, pageSize, page * pageSize, node.length);
    drawChart(node, (page - 1) * pageSize);
  };

  const handleSizeChange = (current, size) => {
    console.log('current, size, current * size',current, size, current * size);
    max_node_cnt = size;
    drawChart(node, (current - 1) * size);
  };

  // 获取chart的数据，传递给chart组件，画图
  const drawChart = (node, offset = 0) => {
    let mol_lst = node;
    const nodes = [];
    const link = [];
    offset = offset % mol_lst.length;
    offset = Math.min(offset, mol_lst.length - max_node_cnt);
    offset = Math.max(offset, 0);
    for (
      var i = offset;
      i < Math.min(mol_lst.length, offset + max_node_cnt);
      i++
    ) {
      nodes.push({
        symbol: "image:// http://localhost:3000/pictures" + mol_lst[i] + ".png",
        //value: "G: " + Qm9G[mol_lst[i]] + " eV",
        value: "U: " + "-280.244" + " eV"+"\n"+"H: " + "-231.972" + " eV"+"\n"+"G: " + Qm9G[mol_lst[i]] + " eV"+"\n"+"Cv: " + "-232.003" + " eV",
      });
      if (i > offset) {
        var bigger = i;
        var smaller = i - 1;
        var diff = Qm9G[mol_lst[smaller]] - Qm9G[mol_lst[bigger]];
        link.push({
          source: bigger - offset,
          target: smaller - offset,
          value: "ΔG: " + diff + " eV",
          lineStyle: { curveness: 0.2, width: 5 },
        });
      }
    }
    console.log('link, nodes',link, nodes);
    setChartData({ link, nodes });
  };

  // 返回组件相关, 页面主体
  return (
    <Layout className="layout">
      <Header defaultSelectedKey="GibbsAB"></Header>
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
          {/* 布局相关 */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Silder onSelect={handleSelect.bind(this)}></Silder>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <Chart
                title={intl.formatMessage({
                  id: "chart_title",
                })}
                link={chartData.link}
                nodes={chartData.nodes}
                layout="circular"
                roam={true}
              ></Chart>
              {count > max_node_cnt ? (
                <div className="pagination-wrapper">
                  <Pagination
                    total={count}
                    itemRender={itemRender}
                    onChange={handlePageChange}
                    onShowSizeChange={handleSizeChange}
                    pageSize={max_node_cnt}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SXICC © 2022 Created by
      </Footer>
      <DocumentTitle
        title={intl.formatMessage({
          id: "btn_1",
        })}
        key="title"
      />
    </Layout>
  );
};
