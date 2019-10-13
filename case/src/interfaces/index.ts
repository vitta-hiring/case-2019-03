export interface FormProps {
  onSubmit: any;
  onChangeMedic: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePattient: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMedicine: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  hasPrescription: boolean;
}

export interface MedicineProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DataProps {
  namePatient: string;
  nameMedic: string;
  selectMedicine: string[];
}
export interface MedicalRecordsDetailsProps {
  data: DataProps;
  modal: boolean;
  toggle: any;
}
export interface TabNavigateProps {
  componentsTabOne: any;
  componentsTabTwo: any;
  activeTab: string;
  toggle: any;
}
