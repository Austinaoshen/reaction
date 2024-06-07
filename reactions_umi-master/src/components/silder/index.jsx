import React, { useState } from "react";
import { Slider, InputNumber, Row, Col, Card } from "antd";
import "./index.less";
import { useIntl } from "umi";

// 定义一个选择条
class IntegerStep extends React.Component {
  state = {
    inputValue: this.props.value || 0,
  };

  onChange = (value, id) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      inputValue: value,
    });
    this.props.onSilderChange(value, id);
  };

  render() {
    const { inputValue } = this.state;
    const { name, id, max } = this.props;
    const handleChange = (value) => this.onChange(value, id);
    return (
      <div className="silder-item">
        <Row gutter={8} justify="center" align="center">
          <Col span={2} style={{ lineHeight: "30px" }}>
            {name}
          </Col>
          <Col span={18}>
            <Slider
              min={0}
              max={max}
              onChange={handleChange}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={0}
              max={max}
              value={inputValue}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// 返回组件, onSelect是从上层传递过来的方法，供组件调用
export default ({ onSelect }) => {
  const intl = useIntl();
  // 定义状态
  const [silderItems, setSilderItems] = useState({
    carbon: { name: "C", id: "carbon", max: 9, value: 0 },
    hydrogen: { name: "H", id: "hydrogen", max: 20, value: 0 },
    oxygen: { name: "O", id: "oxygen", max: 5, value: 0 },
    nitrogen: { name: "N", id: "nitrogen", max: 7, value: 0 },
    fluorine: { name: "F", id: "fluorine", max: 6, value: 0 },
  });
  const onSilderChange = (value, id) => {
    silderItems[id].value = value;
    onSelect && onSelect(silderItems);
  };
  return (
    <Card
      title={intl.formatMessage({
        id: "slider_title",
      })}
      bordered={true}
      style={{ width: "100%", marginTop: "32px" }}
    >
      {Object.values(silderItems).map((item) => (
        <IntegerStep {...item} key={item.id} onSilderChange={onSilderChange} />
      ))}
    </Card>
  );
};
