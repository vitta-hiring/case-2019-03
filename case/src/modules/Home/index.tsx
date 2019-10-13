import React, { useState } from 'react';
import { MedicalRecords } from '../MedicalRecords';
import { TabNavigate } from '../../components/Tabs';
import { ListOfMedicalRecords } from '../../components/ListOfMedicalRecords';

export const Home = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [data, setData] = useState();
  const toggle = (e: any) => {
    const element = e.currentTarget.id;
    if (activeTab !== element) {
      setActiveTab(element);
      setData(localStorage.getItem('#prescription'));
    }
  };
  return (
    <TabNavigate
      componentsTabOne={<MedicalRecords />}
      componentsTabTwo={<ListOfMedicalRecords data={data} />}
      activeTab={activeTab}
      toggle={toggle}
    />
  );
};
