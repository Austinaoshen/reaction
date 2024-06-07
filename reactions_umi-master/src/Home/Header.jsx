import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Menu, Row, Col, Icon, Button, Popover, Badge } from "antd";
import { Link } from "umi";
import { MenuOutlined } from "@ant-design/icons";
import { enquireScreen } from "enquire-js";
import { injectIntl, setLocale, getLocale } from "umi";
import logoURL from "./static/logo.svg";

// import webpack from 'webpack'
//
// const webpack = require('webpack');
const searchEngine = "Google";
let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

export default injectIntl(
  class Header extends React.Component {
    static propTypes = {
      isFirstScreen: PropTypes.bool,
    };
    state = {
      menuVisible: false,
      isMobile,
    };
    onMenuVisibleChange = (visible) => {
      this.setState({
        menuVisible: visible,
      });
    };
    handleShowMenu = () => {
      this.setState({
        menuVisible: true,
      });
    };

    handleHideMenu = () => {
      this.setState({
        menuVisible: false,
      });
    };

    handleSelectFilter = (value, option) => {
      this.handleHideMenu();
      const optionValue = option.props["data-label"];
      return (
        optionValue === searchEngine ||
        optionValue.indexOf(value.toLowerCase()) > -1
      );
    };

    componentDidMount() {
      enquireScreen((b) => {
        this.setState({
          isMobile: !!b,
        });
      });
    }

    // 设置语言
    setLocales() {
      const currentLanguage = getLocale();
      const toggleLanguage = currentLanguage === "en-US" ? "zh-CN" : "en-US";
      setLocale(toggleLanguage, false);
    }

    render() {
      const { isFirstScreen, defaultSelectedKey = "home" } = this.props;
      const { menuVisible, isMobile } = this.state;
      const menuMode = isMobile ? "inline" : "horizontal";
      const headerClassName = classNames({
        clearfix: true,
        "home-nav-white": !isFirstScreen,
      });
      const menu = [
        <Button
          className="header-lang-button"
          ghost
          size="small"
          key="lang"
          onClick={this.setLocales}
        >
          {this.props.intl.formatMessage({
            id: "language",
          })}
        </Button>,
        <Menu
          mode={menuMode}
          defaultSelectedKeys={[defaultSelectedKey]}
          id="nav"
          key="nav"
        >
          <Menu.Item key="home">
            <Link to="/">{this.props.intl.formatMessage({ id: "home" })}</Link>
          </Menu.Item>
          <Menu.Item key="GibbsAB">
            <Link to="/GibbsAB">
              {this.props.intl.formatMessage({ id: "btn_1" })}
            </Link>
          </Menu.Item>
          <Menu.Item key="GibbsABC">
            <Link to="/GibbsABC">
              {this.props.intl.formatMessage({ id: "btn_2" })}
            </Link>
          </Menu.Item>
          <Menu.Item key="kinetic">
            <Link to="/kinetic">
              {this.props.intl.formatMessage({ id: "btn_3" })}
            </Link>
          </Menu.Item>
        </Menu>,
      ];

      return (
        <header id="header" className={headerClassName}>
          {menuMode === "inline" ? (
            <Popover
              overlayClassName="popover-menu"
              placement="bottomRight"
              content={menu}
              trigger="click"
              visible={menuVisible}
              arrowPointAtCenter
              onVisibleChange={this.onMenuVisibleChange}
            >
              <MenuOutlined
                className="nav-phone-icon"
                style={{
                  fontSize: "18px",
                  color: !isFirstScreen ? "#777" : "#08c",
                }}
                onClick={this.handleShowMenu}
              />
            </Popover>
          ) : null}

          <Row>
            <Col lg={6} md={8} sm={24} xs={24}>
                <a id="logo">
                    <img alt="logo" src={logoURL}/>
                    <span>Reaction.Center</span>
                </a>
            </Col>
              <Col lg={18} md={16} sm={0} xs={0}>
              {menuMode === "horizontal" ? menu : null}
            </Col>
          </Row>
        </header>
      );
    }
  }
);
