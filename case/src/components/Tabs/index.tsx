import React from 'react';
import cx from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { TabNavigateProps } from '../../interfaces';

export const TabNavigate = ({
  componentsTabOne,
  componentsTabTwo,
  activeTab,
  toggle,
}: TabNavigateProps) => {
  const tabOne = cx({ active: activeTab === '1' });
  const tabTwo = cx({ active: activeTab === '2' });
  return (
    <div>
      <Nav tabs={true}>
        <NavItem>
          <NavLink id="1" className={tabOne} onClick={toggle}>
            Prescrição médica
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink id="2" className={tabTwo} onClick={toggle}>
            Lista de prescrições
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col>{componentsTabOne}</Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col>{componentsTabTwo}</Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};
