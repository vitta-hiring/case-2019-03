import DataTable from "../../../components/DataTable";
import { ColumnProps } from "antd/lib/table";
import { Popconfirm, Button, Form, Input, Icon, Tag, Modal } from "antd";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { AppState } from "../../../store/ducks/rootReducer";
import {
  PrescriptionTypes,
  PrescriptionState,
  Prescription
} from "../../../store/ducks/prescriptions/types";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { MedicineTypes } from "../../../store/ducks/medicines/types";
import TableTransfer from "../../../components/TableTransfer";
import TextArea from "antd/lib/input/TextArea";
import { withAuthSync } from "../../../utils/auth";

const MEDICINE_FETCH_PAGINATION = {
  pagination: { current: 1, pageSize: 15 }
};

const PRESCRIPTION_FETCH_PAGINATION = {
  pagination: { current: 1, pageSize: 5 }
};

type Props<T> = {
  state: T;
  columns: ColumnProps<any>[];
  onTableChange: () => void;
  onHandleDelete: () => void;
  onHandleCreate: () => void;
  onHandleUpdate: () => void;
  form: WrappedFormUtils;
};

const PrescriptionPage = ({ form, ...props }: Props<PrescriptionState>) => {
  const dispatch = useDispatch();

  const prescriptionStore = useSelector(
    (state: AppState) => state.prescription,
    shallowEqual
  );
  const medicineStore = useSelector(
    (state: AppState) => state.medicine,
    shallowEqual
  );
  const [targetKeys, setTargetKeys] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { getFieldDecorator } = form;
  let searchInput;

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  };

  const getColumnSearchProps = (dataIndex, store = "prescriptionStore") => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Procurar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            store === "prescriptionStore"
              ? handleSearch(selectedKeys, confirm, dataIndex)
              : onTableTransferSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            store === "prescriptionStore"
              ? handleSearch(selectedKeys, confirm, dataIndex)
              : onTableTransferSearch(selectedKeys, confirm, dataIndex)
          }
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Procurar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Limpar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      store === "medicineStore" ? (
        medicineStore.search.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[medicineStore.search.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        )
      ) : prescriptionStore.search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[prescriptionStore.search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const columns: ColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      ...getColumnSearchProps("id")
    },
    {
      title: "Descrição",
      dataIndex: "description",
      ...getColumnSearchProps("description")
    },
    {
      title: "Remédios",
      dataIndex: "medicines",
      key: "medicines",
      render: medicines =>
        medicines ? (
          <span>
            {medicines.map(medicine => {
              return (
                <Tag color="cyan" key={medicine.id}>
                  {medicine.id + " - " + medicine.nome.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ) : null
    },
    {
      title: "Ações",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Certeza que quer deletar?"
          onConfirm={() => {
            handleDelete(record);
          }}
        >
          <Icon type="delete" />
        </Popconfirm>
      )
    }
  ];

  const medicinesTableTransferLeftColumns = [
    {
      dataIndex: "id",
      title: "ID",
      ...getColumnSearchProps("id", "medicineStore")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      ...getColumnSearchProps("nome", "medicineStore")
    }
  ];

  const medicinesTableTransferRightColumns = [
    {
      dataIndex: "id",
      title: "ID",
      key: "rightId",
      ...getColumnSearchProps("id", "medicineStore")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      key: "rightNome",
      ...getColumnSearchProps("nome", "medicineStore")
    }
  ];

  useEffect(() => {
    if (
      prescriptionStore.action ===
        PrescriptionTypes.PRESCRIPTION_DELETE_SUCCESS ||
      prescriptionStore.action === PrescriptionTypes.PRESCRIPTION_CREATE_SUCCESS
    ) {
      setModalVisible(false);
      dispatch({
        type: PrescriptionTypes.PRESCRIPTION_FETCH,
        payload: {
          ...PRESCRIPTION_FETCH_PAGINATION,
          search: { searchText: "" }
        }
      });
    }
  }, [prescriptionStore.action]);

  useEffect(() => {
    if (medicineStore.action === MedicineTypes.MEDICINE_INTERACTION_SUCCESS) {
      Modal.confirm({
        title: `Alerta de interação medicamentosa, tem certeza de que quer adicionar?`,
        content: (
          <div>
            <span>
              Os remédios a seguir possuem interações medicamentosas entre si:{" "}
            </span>
            <ul>
              {medicineStore.medicineInteractions.interactions.map(
                interaction => (
                  <li> Remédio: {interaction.medicineName} </li>
                )
              )}
            </ul>
          </div>
        ),
        okText: "Sim",
        okType: "danger",
        cancelText: "Não",
        onOk() {
          setTargetKeys(medicineStore.medicineInteractions.ids);
        }
      });
    }
  }, [medicineStore.action]);

  useEffect(() => {
    dispatch({
      type: PrescriptionTypes.PRESCRIPTION_FETCH,
      payload: { ...PRESCRIPTION_FETCH_PAGINATION, search: { searchText: "" } }
    });
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        ...MEDICINE_FETCH_PAGINATION,
        search: { searchText: "" }
      }
    });
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    } else {
      dispatch({
        type: MedicineTypes.MEDICINE_FETCH,
        payload: {
          ...MEDICINE_FETCH_PAGINATION,
          search: { searchText: "" }
        }
      });
      setTargetKeys([]);
    }
  }, [isModalVisible]);

  const onChange = (pagination, filters, sorter, extra) => {
    dispatch({
      type: PrescriptionTypes.PRESCRIPTION_FETCH,
      payload: {
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize
        },
        search: { searchText: "" }
      }
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        ...MEDICINE_FETCH_PAGINATION,
        search: { searchText: selectedKeys[0], searchedColumn: dataIndex }
      }
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        ...MEDICINE_FETCH_PAGINATION,
        search: { searchText: "" }
      }
    });
  };

  const handleDelete = (medicine: Prescription) => {
    dispatch({
      type: PrescriptionTypes.PRESCRIPTION_DELETE,
      payload: {
        selectedRecord: medicine
      }
    });
  };

  const handleCreate = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: PrescriptionTypes.PRESCRIPTION_CREATE,
          payload: {
            selectedRecord: {
              ...values,
              medicines: [...targetKeys]
            }
          }
        });
      }
    });
  };

  const handleUpdate = () => {};

  const onFarmaco1Search = val => {
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        ...MEDICINE_FETCH_PAGINATION,
        search: { searchText: val, searchedColumn: "nome" }
      }
    });
  };

  const onTableTransferSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        ...MEDICINE_FETCH_PAGINATION,
        search: { searchText: selectedKeys[0], searchedColumn: dataIndex }
      }
    });
  };

  const onTableTransferChange = nextTargetKeys => {
    dispatch({
      type: MedicineTypes.MEDICINE_INTERACTION_FETCH,
      payload: {
        search: {
          searchText: { nextTargetKeys, targetKeys }
        }
      }
    });
  };

  return (
    <DataTable
      columns={columns}
      dataSource={prescriptionStore.data.items}
      onTableChange={onChange}
      onHandleCreate={handleCreate}
      onHandleUpdate={handleUpdate}
      state={prescriptionStore}
      isModalVisible={isModalVisible}
      onSetModalVisible={setModalVisible}
      rowKey={record => record.id}
      key="Prescription"
      modalWidth="70vw"
    >
      <Form {...formItemLayout} onSubmit={handleCreate}>
        <Form.Item label="Descrição:">
          {getFieldDecorator("description", {
            rules: [
              {
                min: 3,
                message: "Campo com no mínimo 3 caracteres."
              },
              {
                required: true,
                message: "Campo obrigatório."
              }
            ]
          })(<TextArea rows={4} />)}
        </Form.Item>

        <TableTransfer
          dataSource={medicineStore.data.items}
          targetKeys={targetKeys}
          showSearch={false}
          onChange={onTableTransferChange}
          leftColumns={medicinesTableTransferLeftColumns}
          rightColumns={medicinesTableTransferRightColumns}
          rowKey={record => record.id}
        />
      </Form>
    </DataTable>
  );
};

export default withAuthSync(Form.create()(PrescriptionPage));
