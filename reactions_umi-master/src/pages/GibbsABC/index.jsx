import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Row, Col, Pagination } from "antd";
import { useIntl } from "umi";
import "./index.less";
const { Content, Footer } = Layout;
import Header from "../../Home/Header";
import DocumentTitle from "react-document-title";

// 业务组件
import Silder from "../../components/silder";
import Chart from "../../components/chart";
import ImgSelector from "../../components/img_selector";

// 数据集合
import Qm9HashDict from "../../data/qm9_hash_dict.js";
import Qm9G from "../../data/qm9_G.js";
//import Qm9U from "../../data/qm9_U.js";
import Qm9MolHash from "../../data/qm9_mol_hash.js";
import Qm9RctDict from "../../data/qm9_rct_dict.js";

let max_reaction_cnt = 5;
let cur_mol_id = 0;
// 页面组件，写法上是组件，其实是个页面
export default () => {
  const intl = useIntl();

  // react hooks相关逻辑方法
  const [chartData, setChartData] = useState({ link: [], nodes: [] });
  const [imgs, setImgs] = useState([]);
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
    let node = [];
    if (Qm9HashDict[mol_hash]) {
      for (var i = 0; i < Qm9HashDict[mol_hash].length; i++) {
        node.push(Qm9HashDict[mol_hash][i]);
      }
      node.sort(function (i, j) {
        return Qm9G[i] - Qm9G[j];
      });
    }
    // drawChart(node)
    setCount(node.length);
    updateImgs(node);
  };

  const updateImgs = (node) => {
    setImgs(node);
    if (node.length) {
      cur_mol_id = node[0];
      drawChart(node[0]);
    } else {
      setChartData({ link: [], nodes: [] });
      setCount(0);
    }
  };

  const getReactionListById = (mol_id, offset = 0) => {
    const mol_hash = Qm9MolHash[mol_id];
    console.log(mol_id, mol_hash);
    const rct_lst = Qm9RctDict[mol_hash];
    // replace molecular hash with its id
    var ret = new Array();
    let total = 0;
    for (var i = 0; i < rct_lst.length; i++) {
      for (var j = 0; j < Qm9HashDict[rct_lst[i][0]].length; j++) {
        if (
          ret.length < max_reaction_cnt &&
          total + Qm9HashDict[rct_lst[i][1]].length >= offset &&
          total < offset + max_reaction_cnt
        ) {
          for (var k = 0; k < Qm9HashDict[rct_lst[i][1]].length; k++) {
            var tmp = new Array();
            console.log(Qm9HashDict[rct_lst[i][0]][j]);
            tmp.push(Qm9HashDict[rct_lst[i][0]][j]);
            console.log(Qm9HashDict[rct_lst[i][1]][k]);
            tmp.push(Qm9HashDict[rct_lst[i][1]][k]);
            ret.push(tmp);
          }
        }
        total += Qm9HashDict[rct_lst[i][1]].length;
      }
    }
    setCount(total);
    return ret;
  };

  // 获取chart的数据，传递给chart组件，画图
  const drawChart = (key_mol_id, offset = 0) => {
    const rctn_lst = getReactionListById(key_mol_id, offset);
    const nodes = [];
    nodes.push({
      symbol: "image:// http://localhost:3000/pictures" + key_mol_id + ".png",
      value: "G: " + Qm9G[key_mol_id] + " eV",
    });
    const link = [];
    for (var i = 0; i < Math.min(rctn_lst.length, max_reaction_cnt); i++) {
      nodes.push({
        symbol: "image:// http://localhost:3000/pictures" + rctn_lst[i][0] + ".png",
        value: "G: " + Qm9G[rctn_lst[i][0]] + " eV",
      });
      nodes.push({
        symbol: "image:// http://localhost:3000/pictures" + rctn_lst[i][1] + ".png",
        value: "G: " + Qm9G[rctn_lst[i][1]] + " eV",
      });
      nodes.push({
        // name: "reaction" + i,
        symbolSize: [20, 20],
      });
      // link
      if (
        Qm9MolHash[rctn_lst[i][0]] + Qm9MolHash[rctn_lst[i][1]] ==
        Qm9MolHash[key_mol_id]
      ) {
        link.push({
          source: nodes.length - 2,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: nodes.length - 3,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: nodes.length - 1,
          target: 0,
          lineStyle: { curveness: 0.2, width: 5 },
        });
        nodes[nodes.length - 1]["value"] =
          "ΔG = " +
          (Qm9G[key_mol_id] - Qm9G[rctn_lst[i][0]] - Qm9G[rctn_lst[i][1]]) +
          " eV";
      } else if (
        Qm9MolHash[rctn_lst[i][0]] - Qm9MolHash[rctn_lst[i][1]] ==
        Qm9MolHash[key_mol_id]
      ) {
        link.push({
          source: nodes.length - 2,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: 0,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: nodes.length - 1,
          target: nodes.length - 3,
          lineStyle: { curveness: 0.2, width: 5 },
        });
        nodes[nodes.length - 1]["value"] =
          "ΔG = " +
          (-1 * Qm9G[key_mol_id] +
            Qm9G[rctn_lst[i][0]] -
            Qm9G[rctn_lst[i][1]]) +
          " eV";
      } else {
        link.push({
          source: nodes.length - 3,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: 0,
          target: nodes.length - 1,
          lineStyle: { curveness: 0.2, width: 2 },
        });
        link.push({
          source: nodes.length - 1,
          target: nodes.length - 2,
          lineStyle: { curveness: 0.2, width: 5 },
        });
        nodes[nodes.length - 1]["value"] =
          "ΔG = " +
          (-1 * Qm9G[key_mol_id] -
            Qm9G[rctn_lst[i][0]] +
            Qm9G[rctn_lst[i][1]]) +
          " eV";
      }
    }
    console.log("nodes", nodes);
    console.log("link", link);
    setChartData({ link, nodes });
  };

  const handleImgClick = (id) => {
    console.log("draw", id);
    cur_mol_id = id;
    drawChart(id);
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
    console.log(page, pageSize, page * pageSize);
    drawChart(cur_mol_id, (page - 1) * pageSize);
  };

  const handleSizeChange = (current, size) => {
    console.log(current, size, current * size);
    max_reaction_cnt = size;
    drawChart(cur_mol_id, (current - 1) * size);
  };

  // 返回组件相关, 页面主体
  return (
    <Layout className="layout">
      <Header defaultSelectedKey="GibbsABC"></Header>
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
          <ImgSelector
            imgs={imgs}
            onSelect={handleImgClick}
            title={intl.formatMessage({
              id: "image_picker",
            })}
          />
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
                layout="force"
                roam={true}
              ></Chart>
              {count > max_reaction_cnt ? (
                <div className="pagination-wrapper">
                  <Pagination
                    total={count}
                    itemRender={itemRender}
                    onChange={handlePageChange}
                    onShowSizeChange={handleSizeChange}
                    pageSize={max_reaction_cnt}
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SXICC © 2022 Created by BISTU
      </Footer>
      <DocumentTitle
        title={intl.formatMessage({
          id: "btn_2",
        })}
        key="title"
      />
    </Layout>
  );
};
